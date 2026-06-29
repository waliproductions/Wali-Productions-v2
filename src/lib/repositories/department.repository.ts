import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type DepartmentStatus = "active" | "inactive" | "archived";

export type StoredDepartment = EntityRecord & {
  name: string;
  code?: string;
  description?: string;
  status: DepartmentStatus;
  parentDepartmentId?: string;
  headUserId?: string;
  headName?: string;
  location?: string;
  costCenter?: string;
  headcount?: number;
  budgetCode?: string;
  tags?: string[];
};

class DepartmentRepository extends BaseRepository<StoredDepartment> {
  constructor() {
    super(COLLECTION_PATHS.department, "department");
  }

  protected buildSearchKeywords(e: StoredDepartment): string[] {
    return [
      e.name,
      e.code ?? "",
      e.description ?? "",
      e.location ?? "",
      e.headName ?? "",
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    totalHeadcount: number;
  }> {
    const all = await this.listAll();
    const live = all.filter((d) => !d.deleted && !d.archived);
    return {
      total: live.length,
      active: live.filter((d) => d.status === "active").length,
      totalHeadcount: live.reduce((s, d) => s + (d.headcount ?? 0), 0),
    };
  }
}

export const departmentRepository = new DepartmentRepository();
