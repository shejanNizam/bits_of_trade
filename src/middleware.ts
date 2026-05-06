import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/how-it-works",
  "/discipline-system",
  "/learning-hub",
  "/pricing",
  "/faqs",
];

const ALWAYS_PUBLIC_ROUTES = ["/discipline-test", "/onboarding/discipline-test"];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];
const AUTHENTICATED_HOME = "/user-dashboard";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;
  const isAuthenticated = Boolean(token);

  const isAlwaysPublicRoute = ALWAYS_PUBLIC_ROUTES.includes(pathname);
  const isPublicRoute =
    isAlwaysPublicRoute || PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAlwaysPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthenticated && (isPublicRoute || isAuthRoute)) {
    return NextResponse.redirect(new URL(AUTHENTICATED_HOME, request.url));
  }

  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
};
