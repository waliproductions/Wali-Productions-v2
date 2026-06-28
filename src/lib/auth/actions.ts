"use server";

import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import { getSession } from "@/lib/auth/session";

export type LoginState = { error: string } | null;

function timingSafeCompare(a: string, b: string): boolean {
  const aBuf = new TextEncoder().encode(a);
  const bBuf = new TextEncoder().encode(b);
  if (aBuf.length !== bBuf.length) return false;
  let diff = 0;
  for (let i = 0; i < aBuf.length; i++) {
    diff |= aBuf[i] ^ bBuf[i];
  }
  return diff === 0;
}

function sanitizeRedirect(from: unknown): string {
  if (
    typeof from === "string" &&
    from.startsWith("/admin") &&
    !from.startsWith("//")
  ) {
    return from;
  }
  return "/admin";
}

// Valid bcrypt hash of "__timing_dummy__" — used to ensure bcryptjs always
// runs a full hash comparison regardless of whether ADMIN_PASSWORD_HASH is set.
const TIMING_DUMMY_HASH =
  "$2b$12$.JDjfSocnl3toOmpqVLhSOBT1RZxyAtSIpS9u5ZANsejEEy3c/yKO";

export async function loginAction(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return { error: "Invalid input." };
  }

  const expectedUsername = process.env.ADMIN_USERNAME?.trim();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!expectedUsername || !passwordHash) {
    console.error(
      "[auth] ADMIN_USERNAME or ADMIN_PASSWORD_HASH is not configured."
    );
    // Still run a full bcryptjs comparison to maintain consistent timing
    await bcryptjs.compare(password, TIMING_DUMMY_HASH);
    return { error: "Authentication is not configured. Contact the administrator." };
  }

  // Always run bcryptjs.compare() first to prevent timing attacks —
  // do not short-circuit on username mismatch before this completes.
  const passwordMatch = await bcryptjs.compare(password, passwordHash);
  const usernameMatch = timingSafeCompare(
    username.trim(),
    expectedUsername.trim()
  );

  if (!usernameMatch || !passwordMatch) {
    return { error: "Invalid username or password." };
  }

  const session = await getSession();
  session.username = username.trim();
  session.role = "admin";
  session.isLoggedIn = true;
  await session.save();

  const from = sanitizeRedirect(formData.get("from"));
  redirect(from);
}

export async function logoutAction(_formData: FormData): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}
