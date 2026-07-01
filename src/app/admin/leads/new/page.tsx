import { createLeadAction } from "@/lib/leads/actions";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export const metadata = { title: "New Lead" };

const INPUT_CLASSES =
  "w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400";

export default function NewLeadPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <AdminPageHeader
        title="New lead"
        description="Manually add a lead that didn't originate from the website — a referral, a government contact, or a relationship sourced offline."
        actions={
          <AdminButton href="/admin/leads" variant="ghost" size="md">
            Back to leads
          </AdminButton>
        }
      />

      <AdminCard>
        <form action={createLeadAction} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Full name *</span>
              <input className={INPUT_CLASSES} name="fullName" required type="text" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Email *</span>
              <input className={INPUT_CLASSES} name="email" required type="email" />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Company name</span>
              <input className={INPUT_CLASSES} name="companyName" type="text" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Phone</span>
              <input className={INPUT_CLASSES} name="phone" type="tel" />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Website</span>
              <input className={INPUT_CLASSES} name="website" type="text" />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Source</span>
              <select className={INPUT_CLASSES} defaultValue="manual" name="source">
                <option value="manual">Manual</option>
                <option value="referral">Referral</option>
                <option value="government">Government</option>
                <option value="partner">Partner</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Priority</span>
              <select className={INPUT_CLASSES} defaultValue="normal" name="priority">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm text-zinc-400">Services interested in</span>
              <input className={INPUT_CLASSES} name="servicesInterested" placeholder="Comma-separated" type="text" />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm text-zinc-400">Project description</span>
            <textarea className={INPUT_CLASSES} name="projectDescription" rows={4} />
          </label>

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
            <AdminButton href="/admin/leads" variant="ghost" size="md">
              Cancel
            </AdminButton>
            <AdminButton type="submit" variant="primary" size="md">
              Create lead
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}
