import { NextRequest, NextResponse } from "next/server";
import { unsealData } from "iron-session";
import type { SessionData } from "@/lib/auth/session";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);

  try {
    const secret = process.env.SESSION_SECRET?.trim();
    if (!secret || secret.length < 32) {
      return NextResponse.redirect(loginUrl);
    }

    const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!cookieValue) {
      return NextResponse.redirect(loginUrl);
    }

    const session = await unsealData<SessionData>(cookieValue, {
      password: secret,
    });

    if (!session.isLoggedIn) {
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
