import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAdminSession } from "@/lib/auth/session";

// Simple in-memory rate limiter
// In production, replace with Upstash Redis or Vercel KV
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getRateLimitEntry(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    return { count: 0, resetAt: now + WINDOW_MS };
  }
  return entry;
}

/**
 * POST /api/admin/auth
 * Authenticates with admin password. Issues httpOnly JWT session cookie.
 * Rate limited: 5 attempts / 15 minutes / IP.
 */
export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Check rate limit
  const entry = getRateLimitEntry(ip);
  if (entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password required." }, { status: 400 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH;
    if (!hash) {
      console.error("ADMIN_PASSWORD_HASH not configured.");
      return NextResponse.json({ error: "Server error." }, { status: 500 });
    }

    const valid = await bcrypt.compare(password, hash);

    if (!valid) {
      // Increment attempt count
      attempts.set(ip, { count: entry.count + 1, resetAt: entry.resetAt });
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    // Auth success — issue session cookie
    attempts.delete(ip); // reset rate limit on success
    await createAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/admin/auth]", error);
    return NextResponse.json({ error: "Authentication failed." }, { status: 500 });
  }
}
