import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { CrmContact } from "@/types/crm";

export type StoredContact = EntityRecord & CrmContact;

class ContactRepository extends BaseRepository<StoredContact> {
  constructor() {
    super(COLLECTION_PATHS.contact, "contact");
  }

  protected buildSearchKeywords(e: StoredContact): string[] {
    return [
      e.firstName,
      e.lastName,
      e.email ?? "",
      e.title ?? "",
      e.role ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByOrganization(organizationId: string): Promise<StoredContact[]> {
    const result = await this.findAll({
      filters: [{ field: "organizationId", operator: "eq", value: organizationId }],
      perPage: 200,
    });
    return result.items;
  }

  async getStats(): Promise<{
    total: number;
    decisionMakers: number;
    champions: number;
    followUpsDue: number;
  }> {
    const all = await this.listAll();
    const active = all.filter((c) => !c.deleted && !c.archived);
    const today = new Date().toISOString().slice(0, 10);
    return {
      total: active.length,
      decisionMakers: active.filter((c) => c.decisionAuthority).length,
      champions: active.filter((c) => c.role === "champion").length,
      followUpsDue: active.filter(
        (c) => c.lastContactedAt && c.lastContactedAt < today,
      ).length,
    };
  }
}

export const contactRepository = new ContactRepository();
