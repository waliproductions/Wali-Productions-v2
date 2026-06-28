import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard, AdminStatCard } from "@/components/admin/AdminCard";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "Integrations" };

const INTEGRATION_CATALOG = [
  {
    category: "Identity & Productivity",
    integrations: [
      { name: "Microsoft 365", description: "SharePoint storage, Teams notifications, Outlook calendar, Azure AD SSO", status: "Planned" },
      { name: "Google Workspace", description: "Google Drive storage, Gmail, Google Calendar, Google SSO", status: "Planned" },
      { name: "Okta / Auth0", description: "Enterprise SSO, SAML 2.0, OIDC identity provider", status: "Planned" },
    ],
  },
  {
    category: "Government Data",
    integrations: [
      { name: "SAM.gov", description: "Automated opportunity search, entity registration validation", status: "Planned" },
      { name: "GovWin IQ", description: "Pipeline intelligence, competitor tracking, contract awards", status: "Planned" },
      { name: "SBA Connect", description: "Small business certification status and eligibility", status: "Planned" },
      { name: "FPDS", description: "Federal procurement data for past performance research", status: "Planned" },
    ],
  },
  {
    category: "Financial",
    integrations: [
      { name: "QuickBooks Online", description: "Invoice sync, expense tracking, revenue recognition", status: "Planned" },
      { name: "Stripe", description: "Commercial client payment processing, subscription billing", status: "Planned" },
      { name: "Xero", description: "Alternative accounting platform (QuickBooks fallback)", status: "Planned" },
    ],
  },
  {
    category: "Document & E-Signature",
    integrations: [
      { name: "DocuSign", description: "Contract signing, proposal approval, NDA collection", status: "Planned" },
      { name: "Adobe Sign", description: "Alternative e-signature provider", status: "Planned" },
      { name: "PandaDoc", description: "Proposal generation and e-signature", status: "Planned" },
    ],
  },
  {
    category: "Communication",
    integrations: [
      { name: "SendGrid", description: "Transactional email delivery (notification provider)", status: "Planned" },
      { name: "Twilio", description: "SMS notifications and two-factor authentication", status: "Planned" },
      { name: "Slack", description: "Team notifications and workflow alerts", status: "Planned" },
      { name: "Microsoft Teams", description: "Team notifications via adaptive card webhooks", status: "Planned" },
    ],
  },
  {
    category: "AI Providers",
    integrations: [
      { name: "Anthropic", description: "Claude API for proposal drafting, document intelligence, chat", status: "Planned" },
      { name: "OpenAI", description: "GPT models as fallback or specialized tasks", status: "Planned" },
      { name: "Azure OpenAI", description: "FedRAMP-eligible AI for government contract work", status: "Planned" },
    ],
  },
] as const;

export default function AdminIntegrationsPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Integrations"
        description="Third-party integration management — provider-agnostic adapters for all external services."
        actions={
          <AdminButton href="/admin" variant="ghost" size="md">
            Back to dashboard
          </AdminButton>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Configured" value="0" hint="Active adapters" />
        <AdminStatCard label="Planned" value="22" hint="In integration catalog" />
        <AdminStatCard label="Healthy" value="0" hint="Last health check" />
        <AdminStatCard label="Syncs today" value="0" hint="Data sync operations" />
      </section>

      <AdminCard title="Active Integrations">
        <AdminEmptyState
          title="No integrations configured"
          description="Integrations are configured by adding provider credentials to environment variables and activating the adapter. Each adapter is health-checked independently and can be disabled without affecting other integrations."
        />
      </AdminCard>

      <AdminCard title="Architecture: Adapter Pattern" description="How integrations are kept vendor-agnostic">
        <div className="space-y-4 text-sm text-zinc-400">
          <p>
            All integrations follow the adapter pattern — the platform core never imports a vendor SDK directly.
            Concrete adapters implement a provider-agnostic interface, so swapping providers requires only a new
            adapter without changing calling code.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="font-semibold text-zinc-200">Interface Layer</p>
              <p className="mt-1 text-xs text-zinc-500">
                {`IIntegrationService defines the contract. Calling code only knows about ServiceResult<T> return types.`}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="font-semibold text-zinc-200">Adapter Layer</p>
              <p className="mt-1 text-xs text-zinc-500">
                Concrete adapters (e.g. AnthropicAdapter, DocuSignAdapter) handle vendor SDK calls and error mapping.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
              <p className="font-semibold text-zinc-200">Registry Layer</p>
              <p className="mt-1 text-xs text-zinc-500">
                Adapters are registered at startup by provider type. The registry resolves adapters on-demand without coupling modules.
              </p>
            </div>
          </div>
        </div>
      </AdminCard>

      {INTEGRATION_CATALOG.map(({ category, integrations }) => (
        <AdminCard key={category} title={category} description="Available integrations">
          <div className="divide-y divide-zinc-800">
            {integrations.map(({ name, description, status }) => (
              <div
                key={name}
                className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-200">{name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
