import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type VehicleType =
  | "gwac" | "mac" | "bpa" | "idiq" | "fss" | "seaport" | "sbir" | "other";
export type VehicleStatus =
  | "target" | "in-pursuit" | "on-ramp-open" | "awarded" | "expired" | "ineligible";
export type VehicleSetAside =
  | "none" | "small-business" | "8a" | "sdvosb" | "wosb" | "hubzone" | "multiple";

export type StoredContractVehicle = EntityRecord & {
  name: string;
  acronym?: string;
  type: VehicleType;
  status: VehicleStatus;
  ownerAgencyId?: string;
  ownerAgencyName?: string;
  setAside: VehicleSetAside;
  ceilingValue?: number;
  periodOfPerformance?: string;
  onRampDate?: string;
  expirationDate?: string;
  solicitationNumber?: string;
  contractNumber?: string;
  naicsCodes?: string[];
  pscCodes?: string[];
  description?: string;
  eligibilityNotes?: string;
  teamingPartnerIds?: string[];
  primeOrSub?: "prime" | "sub" | "either";
  notes?: string;
  tags?: string[];
};

class ContractVehicleRepository extends BaseRepository<StoredContractVehicle> {
  constructor() {
    super(COLLECTION_PATHS.contractVehicle, "contractVehicle");
  }

  protected buildSearchKeywords(e: StoredContractVehicle): string[] {
    return [
      e.name,
      e.acronym ?? "",
      e.type,
      e.status,
      e.setAside,
      e.ownerAgencyName ?? "",
      ...(e.naicsCodes ?? []),
      ...(e.pscCodes ?? []),
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async getStats(): Promise<{
    total: number;
    awarded: number;
    inPursuit: number;
    onRampOpen: number;
    byType: Partial<Record<VehicleType, number>>;
    totalCeiling: number;
  }> {
    const all = await this.listAll();
    const live = all.filter((v) => !v.deleted && !v.archived);
    const byType: Partial<Record<VehicleType, number>> = {};
    for (const v of live) {
      byType[v.type] = (byType[v.type] ?? 0) + 1;
    }
    return {
      total: live.length,
      awarded: live.filter((v) => v.status === "awarded").length,
      inPursuit: live.filter((v) => v.status === "in-pursuit").length,
      onRampOpen: live.filter((v) => v.status === "on-ramp-open").length,
      byType,
      totalCeiling: live.reduce((s, v) => s + (v.ceilingValue ?? 0), 0),
    };
  }
}

export const contractVehicleRepository = new ContractVehicleRepository();
