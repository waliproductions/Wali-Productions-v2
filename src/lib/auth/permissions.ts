import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import type { SessionData } from "@/lib/auth/session";

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.isLoggedIn && session.username);
}

export async function hasRole(
  role: NonNullable<SessionData["role"]>
): Promise<boolean> {
  const session = await getSession();
  return Boolean(session.isLoggedIn && session.role === role);
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.username || session.role !== "admin") {
    redirect("/login");
  }
  return session;
}

/**
 * Admin guard for API route handlers. Unlike requireAdmin(), this never
 * calls redirect() — a redirect response makes no sense for a fetch()
 * caller. Returns the session on success, or null when unauthenticated so
 * the caller can respond with 401 JSON.
 */
export async function requireAdminApi(): Promise<SessionData | null> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.username || session.role !== "admin") {
    return null;
  }
  return session;
}
