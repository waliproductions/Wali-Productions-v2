import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: {
    default: "Admin · Wali Productions",
    template: "%s · Admin · Wali Productions",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let username: string | undefined;
  try {
    const session = await getSession();
    username = session.username;
  } catch {
    // SESSION_SECRET not configured — render shell without username
  }
  return <AdminShell username={username}>{children}</AdminShell>;
}
