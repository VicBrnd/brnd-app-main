import { NextRequest, NextResponse } from "next/server";

import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;
  // Routes d'authentification (sign-in, sign-up)
  const isAuthRoute = pathname === "/sign-in" || pathname === "/sign-up";
  // Routes protégées
  const isProtectedRoute = pathname.startsWith("/dashboard");
  // Utilisateur connecté qui essaie d'accéder aux pages d'auth → rediriger vers dashboard
  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // Utilisateur non connecté qui essaie d'accéder aux pages protégées → rediriger vers sign-in
  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/sign-in", "/sign-up"],
};
