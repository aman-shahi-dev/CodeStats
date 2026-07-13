import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;
  const isOnDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname === "/login";
  const isHomePage = pathname === "/";

  if (isOnDashboard && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if ((isHomePage || isAuthPage) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
