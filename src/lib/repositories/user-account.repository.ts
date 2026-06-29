import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { UserRole } from "@/types/roles";

export type UserAccountType = "employee" | "contractor" | "client" | "partner" | "admin";
export type UserAccountStatus = "active" | "inactive" | "suspended" | "locked" | "pending-verification" | "archived";
export type EmploymentType = "full-time" | "part-time" | "intern";
export type ClearanceLevel = "none" | "public-trust" | "secret" | "top-secret" | "ts-sci";

export type StoredUserAccount = EntityRecord & {
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  accountType: UserAccountType;
  status: UserAccountStatus;
  roles: UserRole[];
  departmentId?: string;
  departmentName?: string;
  title?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  timezone?: string;
  // Employment details (employees)
  employmentType?: EmploymentType;
  employeeId?: string;
  managerId?: string;
  startDate?: string;
  endDate?: string;
  clearanceLevel?: ClearanceLevel;
  onboardingCompletedAt?: string;
  // Contractor details
  contractorId?: string;
  company?: string;
  contractId?: string;
  accessExpiresAt?: string;
  sponsorId?: string;
  // Client details
  organizationId?: string;
  clientProjectIds?: string[];
  // Auth
  emailVerified: boolean;
  mfaEnabled: boolean;
  lastLoginAt?: string;
  lastLoginIp?: string;
  passwordChangedAt?: string;
  invitationId?: string;
  notes?: string;
  tags?: string[];
};

class UserAccountRepository extends BaseRepository<StoredUserAccount> {
  constructor() {
    super(COLLECTION_PATHS.userAccount, "userAccount");
  }

  protected buildSearchKeywords(e: StoredUserAccount): string[] {
    return [
      e.email,
      e.displayName,
      e.firstName,
      e.lastName,
      e.title ?? "",
      e.accountType,
      e.status,
      e.departmentName ?? "",
      e.company ?? "",
      ...(e.roles ?? []),
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async findByType(accountType: UserAccountType): Promise<StoredUserAccount[]> {
    const result = await this.findAll({
      filters: [{ field: "accountType", operator: "eq", value: accountType }],
      perPage: 200,
    });
    return result.items;
  }

  async findByRole(role: UserRole): Promise<StoredUserAccount[]> {
    const all = await this.listAll();
    return all.filter((u) => !u.deleted && !u.archived && u.roles.includes(role));
  }

  async findByDepartment(departmentId: string): Promise<StoredUserAccount[]> {
    const result = await this.findAll({
      filters: [{ field: "departmentId", operator: "eq", value: departmentId }],
      perPage: 200,
    });
    return result.items;
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    employees: number;
    contractors: number;
    clients: number;
    pendingVerification: number;
    suspended: number;
    mfaEnabled: number;
    clearanceHolders: number;
    byRole: Partial<Record<UserRole, number>>;
  }> {
    const all = await this.listAll();
    const live = all.filter((u) => !u.deleted && !u.archived);
    const byRole: Partial<Record<UserRole, number>> = {};
    for (const u of live) {
      for (const r of u.roles) {
        byRole[r] = (byRole[r] ?? 0) + 1;
      }
    }
    return {
      total: live.length,
      active: live.filter((u) => u.status === "active").length,
      employees: live.filter((u) => u.accountType === "employee").length,
      contractors: live.filter((u) => u.accountType === "contractor").length,
      clients: live.filter((u) => u.accountType === "client").length,
      pendingVerification: live.filter((u) => u.status === "pending-verification").length,
      suspended: live.filter((u) => u.status === "suspended").length,
      mfaEnabled: live.filter((u) => u.mfaEnabled).length,
      clearanceHolders: live.filter((u) => u.clearanceLevel && u.clearanceLevel !== "none").length,
      byRole,
    };
  }
}

export const userAccountRepository = new UserAccountRepository();
