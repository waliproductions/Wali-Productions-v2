import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";

export type ContractType = "prime" | "subcontract" | "idiq" | "bpa" | "task-order" | "delivery-order" | "other";
export type ContractStatus = "draft" | "pending-award" | "active" | "completed" | "terminated" | "expired" | "suspended";

export type ContractDeliverable = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "pending" | "in-progress" | "submitted" | "accepted" | "overdue";
  cdrl?: string;
};

export type ContractInvoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency?: string;
  invoicedAt: string;
  dueAt?: string;
  status: "draft" | "submitted" | "approved" | "paid" | "disputed" | "cancelled";
  description?: string;
};

export type ContractModification = {
  id: string;
  modNumber: string;
  description: string;
  effectiveDate: string;
  valueChange?: number;
  type: "funding" | "scope" | "period-of-performance" | "administrative" | "other";
};

export type StoredContract = EntityRecord & {
  contractNumber: string;
  title: string;
  type: ContractType;
  status: ContractStatus;
  awardingAgency?: string;
  primeContractor?: string;
  contractingOfficer?: string;
  cotrName?: string;
  clientId?: string;
  parentContractId?: string;
  projectId?: string;
  naicsCodes?: string[];
  awardDate?: string;
  startDate?: string;
  endDate?: string;
  optionPeriods?: { label: string; start: string; end: string; exercised?: boolean }[];
  baseValue?: number;
  currentValue?: number;
  ceilingValue?: number;
  invoicedToDate?: number;
  currency?: string;
  deliverables?: ContractDeliverable[];
  invoices?: ContractInvoice[];
  modifications?: ContractModification[];
  description?: string;
  internalNotes?: string;
  tags?: string[];
};

class ContractRepository extends BaseRepository<StoredContract> {
  constructor() {
    super(COLLECTION_PATHS.contract, "contract");
  }

  protected buildSearchKeywords(e: StoredContract): string[] {
    return [
      e.contractNumber,
      e.title,
      e.type,
      e.status,
      e.awardingAgency ?? "",
      e.primeContractor ?? "",
      ...(e.naicsCodes ?? []),
      ...(e.tags ?? []),
    ].filter(Boolean);
  }

  async getActive(): Promise<StoredContract[]> {
    const result = await this.findAll({
      filters: [{ field: "status", operator: "eq", value: "active" }],
      perPage: 200,
    });
    return result.items;
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    totalBaseValue: number;
    totalCurrentValue: number;
    totalInvoiced: number;
    pendingDeliverables: number;
    overdueDeliverables: number;
    openInvoices: number;
    openInvoiceValue: number;
    expiringThisMonth: number;
  }> {
    const all = await this.listAll();
    const live = all.filter((c) => !c.deleted && !c.archived);
    const today = new Date().toISOString().slice(0, 10);
    const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10);

    let pendingDeliverables = 0;
    let overdueDeliverables = 0;
    let openInvoiceValue = 0;
    let openInvoices = 0;

    for (const c of live) {
      for (const d of c.deliverables ?? []) {
        if (d.status === "pending" || d.status === "in-progress") pendingDeliverables++;
        if (d.status === "overdue") overdueDeliverables++;
      }
      for (const inv of c.invoices ?? []) {
        if (inv.status === "submitted" || inv.status === "approved") {
          openInvoices++;
          openInvoiceValue += inv.amount;
        }
      }
    }

    return {
      total: live.length,
      active: live.filter((c) => c.status === "active").length,
      totalBaseValue: live.reduce((s, c) => s + (c.baseValue ?? 0), 0),
      totalCurrentValue: live.reduce((s, c) => s + (c.currentValue ?? 0), 0),
      totalInvoiced: live.reduce((s, c) => s + (c.invoicedToDate ?? 0), 0),
      pendingDeliverables,
      overdueDeliverables,
      openInvoices,
      openInvoiceValue,
      expiringThisMonth: live.filter(
        (c) => c.endDate && c.endDate >= today && c.endDate <= monthEnd,
      ).length,
    };
  }
}

export const contractRepository = new ContractRepository();
