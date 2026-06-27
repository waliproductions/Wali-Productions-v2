import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In · Wali Productions Admin",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams?: Promise<{ from?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  // If already authenticated, skip the login page
  try {
    const { getSession } = await import("@/lib/auth/session");
    const session = await getSession();
    if (session.isLoggedIn) {
      redirect("/admin");
    }
  } catch {
    // SESSION_SECRET not configured — still render the login form
  }

  const params = searchParams ? await searchParams : {};
  const from =
    typeof params.from === "string" && params.from.startsWith("/admin")
      ? params.from
      : "/admin";

  return <LoginForm from={from} />;
}
