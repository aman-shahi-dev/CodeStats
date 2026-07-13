import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { validateCfHandle } from "@/lib/codeforces";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"), // Stricter for mutations/settings
  analytics: true,
});

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(`ratelimit_handles_${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { cfHandle: true, lcHandle: true, acHandle: true, ccHandle: true },
  });

  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(`ratelimit_handles_post_${ip}`);
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { cfHandle, lcHandle, acHandle, ccHandle } = body;

  if (cfHandle) {
    const isValid = await validateCfHandle(cfHandle);
    if (!isValid) {
      return NextResponse.json(
        { error: "Codeforces handle not found. Please check and try again." },
        { status: 400 }
      );
    }
  }

  const updated = await db.user.update({
    where: { id: session.user.id },
    data: {
      cfHandle: cfHandle || null,
      lcHandle: lcHandle || null,
      acHandle: acHandle || null,
      ccHandle: ccHandle || null,
    },
    select: { cfHandle: true, lcHandle: true, acHandle: true, ccHandle: true },
  });

  return NextResponse.json({ success: true, data: updated });
}
