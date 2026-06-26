import { NextResponse } from "next/server";
import { contactSubmissionsToCsv } from "@/lib/admin/contact-export";
import { getContactDashboardSubmissions } from "@/lib/admin/contact-dashboard";

export const dynamic = "force-dynamic";

export async function GET() {
  const submissions = await getContactDashboardSubmissions();
  const csv = contactSubmissionsToCsv(submissions);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="wali-productions-contact-submissions.csv"',
    },
  });
}
