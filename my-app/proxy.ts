import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Kirjautumissivu ja auth-reitti saavat aina läpi — muuten tulisi redirect-loop
  if (
    pathname.startsWith("/koti/login") ||
    pathname.startsWith("/api/koti-auth")
  ) {
    return NextResponse.next();
  }

  const password = process.env.KOTI_PASSWORD;
  const cookie = request.cookies.get("koti_auth");

  // Jos salasanaa ei ole asetettu tai cookie täsmää → päästä läpi
  if (!password || cookie?.value === password) {
    return NextResponse.next();
  }

  // Ohjaa kirjautumissivulle
  return NextResponse.redirect(new URL("/koti/login", request.url));
}

export const config = {
  // Suojataan /koti ja kaikki sen alireitit
  matcher: ["/koti/:path*"],
};
