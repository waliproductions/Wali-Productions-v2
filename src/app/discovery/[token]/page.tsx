import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { questionnaireResponseRepository } from "@/lib/repositories/questionnaire-response.repository";
import { leadRepository } from "@/lib/repositories/lead.repository";
import { QUESTIONNAIRE_SECTIONS } from "@/config/questionnaire";
import { DiscoveryWizard } from "@/components/discovery/DiscoveryWizard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discovery Questionnaire",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function DiscoveryPage({ params }: PageProps) {
  const { token } = await params;

  if (!token || token.length < 16) notFound();

  const response = await questionnaireResponseRepository.findByToken(token);
  if (!response) notFound();

  const lead = await leadRepository.findById(response.leadId);

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-navy-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <DiscoveryWizard
          token={token}
          sections={QUESTIONNAIRE_SECTIONS}
          initialAnswers={response.answers}
          initialStatus={response.status}
          leadName={lead?.fullName ?? null}
          companyName={lead?.companyName ?? null}
        />
      </div>
    </main>
  );
}
