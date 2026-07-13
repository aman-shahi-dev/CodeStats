import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import {
  getCfUserInfo,
  getCfRatingHistory,
  getCfSubmissions,
} from "@/lib/codeforces";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(`ratelimit_${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { cfHandle: true },
  });

  if (!user?.cfHandle) {
    return NextResponse.json(
      { error: "No Codeforces handle saved. Go to Settings to add one." },
      { status: 404 }
    );
  }

  const handle = user.cfHandle;
  const cacheKey = `cf:${handle}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json({ ...cached as object, cached: true });
  }

  const [info, ratingHistory, submissions] = await Promise.all([
    getCfUserInfo(handle),
    getCfRatingHistory(handle),
    getCfSubmissions(handle, 1000), // Increased from 50 to 1000
  ]);

  if (!info) {
    return NextResponse.json(
      { error: "Failed to fetch Codeforces data." },
      { status: 502 }
    );
  }

  const recentSubmissions = submissions
    .map((s: any) => ({
      id: s.id,
      problem: `${s.problem.contestId}${s.problem.index} - ${s.problem.name}`,
      contestId: s.problem.contestId,
      index: s.problem.index,
      verdict: s.verdict,
      language: s.programmingLanguage,
      time: s.timeConsumedMillis,
      memory: s.memoryConsumedBytes,
      createdAt: s.creationTimeSeconds,
      rating: s.problem.rating, // Added rating
      tags: s.problem.tags || [], // Added tags
    }));

  const ratingChartData = ratingHistory.map((r: any) => ({
    contest: r.contestName, // Full name
    rating: r.newRating,
    oldRating: r.oldRating, // Added oldRating
    rank: r.rank, // Added rank
    date: new Date(r.ratingUpdateTimeSeconds * 1000).toLocaleDateString(
      "en-US",
      { month: "short", year: "2-digit" }
    ),
    timestamp: r.ratingUpdateTimeSeconds, // For sorting if needed
  }));

  const solvedSet = new Set(
    submissions
      .filter((s: any) => s.verdict === "OK")
      .map((s: any) => `${s.problem.contestId}-${s.problem.index}`)
  );

  const result = {
    handle,
    rating: info.rating || 0,
    maxRating: info.maxRating || 0,
    rank: info.rank || "unrated",
    maxRank: info.maxRank || "unrated",
    avatar: info.titlePhoto,
    country: info.country,
    organization: info.organization,
    contribution: info.contribution,
    friendOfCount: info.friendOfCount,
    solvedCount: solvedSet.size,
    ratingHistory: ratingChartData,
    recentSubmissions,
  };

  await redis.set(cacheKey, result, { ex: 120 });

  return NextResponse.json(result);
}
