import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type {
  Organization,
  OrganizationStatus,
  OrganizationSector,
} from "@/types/crm";

export type StoredOrganization = EntityRecord & Organization;

class OrganizationRepository extends BaseRepository<StoredOrganization> {
  constructor() {
    super(COLLECTION_PATHS.organization, "organization");
  }

  protected buildSearchKeywords(e: StoredOrganization): string[] {
    return [
      e.name,
      e.legalName ?? "",
      e.status,
      e.sector ?? "",
      e.hqCity ?? "",
      e.hqState ?? "",
      e.website ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByStatus(status: OrganizationStatus): Promise<StoredOrganization[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: status }],
      perPage: 200,
    });
    return result.items;
  }

  async findBySector(sector: OrganizationSector): Promise<StoredOrganization[]> {
    const result = await this.findAll({
      filters: [{ field: "sector", operator: "eq", value: sector }],
      perPage: 200,
    });
    return result.items;
  }

  async getStats(): Promise<{
    total: number;
    prospects: number;
    activeClients: number;
    partners: number;
  }> {
    const all = await this.listAll();
    const active = all.filter((o) => !o.deleted && !o.archived);
    return {
      total: active.length,
      prospects: active.filter((o) => o.status === "prospect" || o.status === "qualified").length,
      activeClients: active.filter((o) => o.status === "active-client").length,
      partners: active.filter((o) => o.status === "partner").length,
    };
  }
}

export const organizationRepository = new OrganizationRepository();
