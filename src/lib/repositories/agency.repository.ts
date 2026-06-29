import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type AgencyTier = "cabinet" | "independent" | "cfo-act" | "sub-agency" | "office" | "other";
export type AgencyRelationshipStatus = "target" | "researching" | "active-pursuit" | "awarded" | "inactive";

export type AgencyContact = {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export type StoredAgency = EntityRecord & {
  name: string;
  acronym?: string;
  tier: AgencyTier;
  relationship: AgencyRelationshipStatus;
  parentAgencyId?: string;
  parentAgencyName?: string;
  website?: string;
  sam_uei?: string;
  naicsFocus?: string[];
  pscFocus?: string[];
  annualITBudget?: number;
  fiscalYearEnd?: string;
  missionSummary?: string;
  acquisitionOffice?: string;
  contractingOfficerName?: string;
  contacts?: AgencyContact[];
  opportunityIds?: string[];
  contractIds?: string[];
  vehicleIds?: string[];
  notes?: string;
  tags?: string[];
};

class AgencyRepository extends BaseRepository<StoredAgency> {
  constructor() {
    super(COLLECTION_PATHS.agency, "agency");
  }

  protected buildSearchKeywords(e: StoredAgency): string[] {
    return [
      e.name,
      e.acronym ?? "",
      e.tier,
      e.relationship,
      e.parentAgencyName ?? "",
      e.acquisitionOffice ?? "",
      ...(e.naicsFocus ?? []),
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    targets: number;
    awarded: number;
    byTier: Partial<Record<AgencyTier, number>>;
    byRelationship: Partial<Record<AgencyRelationshipStatus, number>>;
  }> {
    const all = await this.listAll();
    const live = all.filter((a) => !a.deleted && !a.archived);
    const byTier: Partial<Record<AgencyTier, number>> = {};
    const byRelationship: Partial<Record<AgencyRelationshipStatus, number>> = {};
    for (const a of live) {
      byTier[a.tier] = (byTier[a.tier] ?? 0) + 1;
      byRelationship[a.relationship] = (byRelationship[a.relationship] ?? 0) + 1;
    }
    return {
      total: live.length,
      active: live.filter((a) => a.relationship === "active-pursuit" || a.relationship === "awarded").length,
      targets: live.filter((a) => a.relationship === "target").length,
      awarded: live.filter((a) => a.relationship === "awarded").length,
      byTier,
      byRelationship,
    };
  }
}

export const agencyRepository = new AgencyRepository();
