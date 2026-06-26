import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { getContactDashboardSubmissionById } from "@/lib/admin/contact-dashboard";

export const dynamic = "force-dynamic";

type DownloadRouteProps = {
  params: Promise<{
    submissionId: string;
  }>;
};

export async function GET(_request: Request, { params }: DownloadRouteProps) {
  const { submissionId } = await params;
  const submission = await getContactDashboardSubmissionById(submissionId);

  if (!submission) {
    notFound();
  }

  return NextResponse.json(submission, {
    headers: {
      "Content-Disposition": `attachment; filename="contact-${submission.submissionId}.json"`,
    },
  });
}
