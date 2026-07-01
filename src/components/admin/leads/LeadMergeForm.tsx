"use client";

import { useState } from "react";
import { mergeLeadsAction } from "@/lib/leads/actions";

const INPUT_CLASSES =
  "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-amber-400";

export function LeadMergeForm({ currentLeadId }: { currentLeadId: string }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <form
      action={mergeLeadsAction}
      className="space-y-3"
      onSubmit={(e) => {
        if (!confirming) {
          e.preventDefault();
          setConfirming(true);
        }
      }}
    >
      <input name="keepId" type="hidden" value={currentLeadId} />
      <p className="text-xs text-zinc-500">
        Merges another lead&apos;s tags and notes into this one, then archives the duplicate. This cannot be undone.
      </p>
      <label className="space-y-1">
        <span className="text-xs text-zinc-500">Duplicate lead ID to merge in</span>
        <input className={INPUT_CLASSES} name="mergeId" placeholder="LEAD-000123" required type="text" />
      </label>
      <button
        type="submit"
        className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition-colors hover:border-red-400/50"
      >
        {confirming ? "Click again to confirm merge" : "Merge into this lead"}
      </button>
    </form>
  );
}
