import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { cfHandle: true },
  });

  if (user?.cfHandle) {
    await redis.del(`cf:${user.cfHandle}`);
  }

  return NextResponse.json({ success: true });
}
