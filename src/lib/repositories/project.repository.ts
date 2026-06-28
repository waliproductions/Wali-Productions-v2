import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { Project, ProjectStatus, ProjectHealth } from "@/types/project";

export type StoredProject = EntityRecord & Project;

class ProjectRepository extends BaseRepository<StoredProject> {
  constructor() {
    super(COLLECTION_PATHS.project, "project");
  }

  protected buildSearchKeywords(e: StoredProject): string[] {
    return [
      e.title,
      e.description ?? "",
      e.status,
      e.health,
      ...(e.servicesPerformed ?? []),
      ...(e.technologies ?? []),
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByStatus(status: ProjectStatus): Promise<StoredProject[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: status }],
      perPage: 200,
    });
    return result.items;
  }

  async findByHealth(health: ProjectHealth): Promise<StoredProject[]> {
    const result = await this.findAll({
      filters: [{ field: "health", operator: "eq", value: health }],
      perPage: 200,
    });
    return result.items;
  }

  async getStats(): Promise<{
    active: number;
    atRisk: number;
    blocked: number;
    completedThisYear: number;
    openRisks: number;
    upcomingMilestones: number;
  }> {
    const all = await this.listAll();
    const live = all.filter((p) => !p.deleted && !p.archived);
    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();
    const today = new Date().toISOString();
    const twoWeeks = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    let openRisks = 0;
    let upcomingMilestones = 0;

    for (const p of live) {
      openRisks += (p.risks ?? []).filter((r) => r.status === "open").length;
      upcomingMilestones += (p.milestones ?? []).filter(
        (m) => m.status !== "completed" && m.dueDate && m.dueDate >= today && m.dueDate <= twoWeeks,
      ).length;
    }

    return {
      active: live.filter((p) => p.status === "active").length,
      atRisk: live.filter((p) => p.health === "at-risk").length,
      blocked: live.filter((p) => p.health === "blocked").length,
      completedThisYear: live.filter(
        (p) => p.status === "completed" && (p.completedDate ?? "") >= yearStart,
      ).length,
      openRisks,
      upcomingMilestones,
    };
  }
}

export const projectRepository = new ProjectRepository();
