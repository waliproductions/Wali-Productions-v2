import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionOptions } from "iron-session";

export interface SessionData {
  username?: string;
  role?: "admin";
  isLoggedIn?: boolean;
}

export const SESSION_COOKIE_NAME = "__admin_session";
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days in seconds

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length < 32) {
    throw new Error(
      "[auth] SESSION_SECRET must be set and at least 32 characters. " +
        "Generate one with: openssl rand -base64 32"
    );
  }
  return secret.trim();
}

export function getSessionOptions(): SessionOptions {
  return {
    cookieName: SESSION_COOKIE_NAME,
    password: getSessionSecret(),
    ttl: SESSION_TTL,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, getSessionOptions());
}
