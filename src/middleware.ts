import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/discipline-test",
  "/how-it-works",
  "/discipline-system",
  "/learning-hub",
  "/pricing",
  "/faqs",
];
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];
const AUTHENTICATED_HOME = "/user-dashboard";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("auth-token")?.value;
  const isAuthenticated = Boolean(token);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Authenticated user trying to access public (/) or auth routes (login/signup) → dashboard
  if (isAuthenticated && (isPublicRoute || isAuthRoute)) {
    return NextResponse.redirect(new URL(AUTHENTICATED_HOME, request.url));
  }

  // Unauthenticated user trying to access private routes → home
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
