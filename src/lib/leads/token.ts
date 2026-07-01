import { randomBytes } from "node:crypto";

/** Unguessable token for public, no-login access links (e.g. discovery questionnaire). */
export function generateAccessToken(): string {
  return randomBytes(24).toString("hex");
}
