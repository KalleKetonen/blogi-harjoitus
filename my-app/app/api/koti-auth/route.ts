import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");

  const correctPassword = process.env.KOTI_PASSWORD;

  if (!correctPassword || password !== correctPassword) {
    return NextResponse.redirect(new URL("/koti/login?error=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/koti", request.url));
  response.cookies.set("koti_auth", correctPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 päivää
  });

  return response;
}
