import { NextRequest, NextResponse } from "next/server";
import { unsealData } from "iron-session";
import type { SessionData } from "@/lib/auth/session";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";

// Cache session secret for the lifetime of the process — it never changes at runtime.
let _secret: string | null | undefined;
function getSecret(): string | null {
  if (_secret !== undefined) return _secret;
  const s = process.env.SESSION_SECRET?.trim();
  _secret = s && s.length >= 32 ? s : null;
  return _secret;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest) {
  try {
    const secret = getSecret();
    if (!secret) return redirectToLogin(request);

    const cookieValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!cookieValue) return redirectToLogin(request);

    const session = await unsealData<SessionData>(cookieValue, { password: secret });

    if (!session.isLoggedIn || session.role !== "admin") {
      return redirectToLogin(request);
    }
  } catch {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
