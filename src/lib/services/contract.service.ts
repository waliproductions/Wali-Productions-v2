/**
 * Contract service interface.
 *
 * Defines the contract for post-award contract lifecycle operations.
 * Covers active contracts, task orders, deliverables, invoices,
 * modifications, and performance reports.
 */

import type {
  Contract,
  ContractStatus,
  TaskOrder,
  ContractDeliverable,
  InvoiceRecord,
  InvoiceStatus,
  ContractModification,
  PerformanceReport,
} from "@/types/contract";
import type {
  ServiceResult,
  QueryParams,
  PaginatedResult,
} from "./index";

export type ContractSortField = "contractNumber" | "status" | "endDate" | "totalValue" | "createdAt";
export type InvoiceSortField = "invoiceNumber" | "status" | "issuedDate" | "dueDate" | "amount";
export type DeliverableSortField = "dueDate" | "status" | "contractId";

export interface IContractService {
  // Contracts
  listContracts(params?: QueryParams<ContractSortField>): Promise<ServiceResult<PaginatedResult<Contract>>>;
  getContract(id: string): Promise<ServiceResult<Contract>>;
  createContract(data: Omit<Contract, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<Contract>>;
  updateContract(id: string, data: Partial<Contract>): Promise<ServiceResult<Contract>>;
  updateContractStatus(id: string, status: ContractStatus): Promise<ServiceResult<Contract>>;

  // Task Orders
  listTaskOrders(contractId: string): Promise<ServiceResult<TaskOrder[]>>;
  getTaskOrder(id: string): Promise<ServiceResult<TaskOrder>>;
  createTaskOrder(data: Omit<TaskOrder, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<TaskOrder>>;
  updateTaskOrder(id: string, data: Partial<TaskOrder>): Promise<ServiceResult<TaskOrder>>;

  // Deliverables
  listDeliverables(params?: QueryParams<DeliverableSortField>): Promise<ServiceResult<PaginatedResult<ContractDeliverable>>>;
  getDeliverablesByContract(contractId: string): Promise<ServiceResult<ContractDeliverable[]>>;
  markDeliverableSubmitted(id: string, submissionUrl?: string): Promise<ServiceResult<ContractDeliverable>>;
  markDeliverableAccepted(id: string): Promise<ServiceResult<ContractDeliverable>>;

  // Invoices
  listInvoices(params?: QueryParams<InvoiceSortField>): Promise<ServiceResult<PaginatedResult<InvoiceRecord>>>;
  getInvoice(id: string): Promise<ServiceResult<InvoiceRecord>>;
  createInvoice(data: Omit<InvoiceRecord, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<InvoiceRecord>>;
  updateInvoiceStatus(id: string, status: InvoiceStatus, paidDate?: string): Promise<ServiceResult<InvoiceRecord>>;

  // Modifications
  listModifications(contractId: string): Promise<ServiceResult<ContractModification[]>>;
  createModification(data: Omit<ContractModification, "id" | "createdAt">): Promise<ServiceResult<ContractModification>>;

  // Performance
  listPerformanceReports(contractId: string): Promise<ServiceResult<PerformanceReport[]>>;
  createPerformanceReport(data: Omit<PerformanceReport, "id">): Promise<ServiceResult<PerformanceReport>>;

  // Summary stats
  getStats(): Promise<ServiceResult<{
    activeContracts: number;
    totalContractValue: number;
    pendingDeliverables: number;
    overdueDeliverables: number;
    openInvoices: number;
    openInvoiceValue: number;
    expiringThisQuarter: number;
  }>>;
}
