"use client";

import { AdminButton } from "@/components/admin/AdminButton";

export function DeleteLeadButton({ action, leadName }: { action: () => Promise<void>; leadName: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete ${leadName}? This removes the lead from the pipeline. An admin can restore it later.`)) {
          e.preventDefault();
        }
      }}
    >
      <AdminButton type="submit" variant="danger" size="md">
        Delete
      </AdminButton>
    </form>
  );
}
