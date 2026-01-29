import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/login", "/auth/google", "/auth/google/callback", "/auth/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  const sessionSecret = process.env.APP_SESSION_SECRET?.trim();

  if (!sessionSecret) {
    console.error("[Middleware] APP_SESSION_SECRET is missing");
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "missing_env");
    return NextResponse.redirect(loginUrl);
  }

  const cookieToken = request.cookies.get("em_session")?.value;

  if (!cookieToken) {
    console.log(`[Middleware] No token found for path: ${pathname}`);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(sessionSecret);
    await jwtVerify(cookieToken, secret);
    return NextResponse.next();
  } catch (error) {
    console.log(`[Middleware] Token verification failed for path: ${pathname}`, error);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
