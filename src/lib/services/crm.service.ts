/**
 * CRM service interface.
 *
 * Defines the contract for all CRM operations. Future implementations
 * may use Postgres, Supabase, a CRM API (HubSpot, Salesforce), or
 * Microsoft Dynamics, all behind this same interface.
 */

import type {
  Organization,
  CrmContact,
  Meeting,
  CommunicationRecord,
  SalesPipelineEntry,
  SalesPipelineStage,
  CrmActivity,
} from "@/types/crm";
import type {
  ServiceResult,
  QueryParams,
  PaginatedResult,
} from "./index";

export type OrganizationSortField = "name" | "status" | "lastActivityAt" | "createdAt" | "relationshipScore";
export type ContactSortField = "lastName" | "organizationId" | "lastContactedAt" | "createdAt";
export type PipelineSortField = "stage" | "estimatedValue" | "expectedCloseDate" | "createdAt";

export interface ICrmService {
  // Organizations
  listOrganizations(params?: QueryParams<OrganizationSortField>): Promise<ServiceResult<PaginatedResult<Organization>>>;
  getOrganization(id: string): Promise<ServiceResult<Organization>>;
  createOrganization(data: Omit<Organization, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<Organization>>;
  updateOrganization(id: string, data: Partial<Organization>): Promise<ServiceResult<Organization>>;
  deleteOrganization(id: string): Promise<ServiceResult<void>>;

  // Contacts
  listContacts(params?: QueryParams<ContactSortField>): Promise<ServiceResult<PaginatedResult<CrmContact>>>;
  getContact(id: string): Promise<ServiceResult<CrmContact>>;
  listContactsByOrganization(organizationId: string): Promise<ServiceResult<CrmContact[]>>;
  createContact(data: Omit<CrmContact, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<CrmContact>>;
  updateContact(id: string, data: Partial<CrmContact>): Promise<ServiceResult<CrmContact>>;
  deleteContact(id: string): Promise<ServiceResult<void>>;

  // Meetings
  listMeetings(params?: QueryParams): Promise<ServiceResult<PaginatedResult<Meeting>>>;
  getMeeting(id: string): Promise<ServiceResult<Meeting>>;
  createMeeting(data: Omit<Meeting, "id" | "createdAt" | "updatedAt">): Promise<ServiceResult<Meeting>>;
  updateMeeting(id: string, data: Partial<Meeting>): Promise<ServiceResult<Meeting>>;

  // Communications
  listCommunications(organizationId: string): Promise<ServiceResult<CommunicationRecord[]>>;
  createCommunication(data: Omit<CommunicationRecord, "id" | "createdAt">): Promise<ServiceResult<CommunicationRecord>>;

  // Pipeline
  listPipelineEntries(params?: QueryParams<PipelineSortField>): Promise<ServiceResult<PaginatedResult<SalesPipelineEntry>>>;
  getPipelineEntry(id: string): Promise<ServiceResult<SalesPipelineEntry>>;
  updatePipelineStage(id: string, stage: SalesPipelineStage): Promise<ServiceResult<SalesPipelineEntry>>;

  // Activity feed
  listActivities(organizationId: string, limit?: number): Promise<ServiceResult<CrmActivity[]>>;

  // Summary stats
  getStats(): Promise<ServiceResult<{
    totalOrganizations: number;
    activeClients: number;
    prospects: number;
    openPipelineValue: number;
    meetingsThisMonth: number;
    followUpsDue: number;
  }>>;
}
