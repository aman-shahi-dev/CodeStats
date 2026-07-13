import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // In Auth.js v5, the cookie name changes depending on production (Secure) and the new prefix (authjs)
  // We check for either the secure or insecure version to determine if a session exists for routing purposes
  const sessionToken = 
    req.cookies.get("authjs.session-token")?.value || 
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const pathname = req.nextUrl.pathname;
  const isOnDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login";
  const isHomePage = pathname === "/";

  if (isOnDashboard && !sessionToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if ((isHomePage || isAuthPage) && sessionToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
