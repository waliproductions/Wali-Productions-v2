import { redirect } from "next/navigation";

/**
 * /portal redirects to the dashboard — the shell layout handles nav.
 * When authentication is implemented, middleware will intercept /portal/*
 * and redirect unauthenticated users to a login page before this runs.
 */
export default function PortalIndexPage() {
  redirect("/portal/dashboard");
}
