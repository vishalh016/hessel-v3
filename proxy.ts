import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "hessel_admin_session";
const PROTECTED_PREFIX = "/admin";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set.");
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept /admin routes
  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  // /api/admin/auth is the login endpoint — always allow through
  if (pathname === "/api/admin/auth") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    // Return 404 — never reveal the admin route exists (BRD §15.2)
    return new NextResponse(null, { status: 404 });
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin") throw new Error("Not admin");
    return NextResponse.next();
  } catch {
    // Invalid / expired token — same 404 treatment
    return new NextResponse(null, { status: 404 });
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export default proxy;
