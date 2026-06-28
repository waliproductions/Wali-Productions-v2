/**
 * Government contracting data model — types for capability statements,
 * certifications, past performance, and procurement data.
 *
 * All identifiers (UEI, CAGE, NAICS, PSC) must be verified before use
 * in official documents or proposals. Records marked authorized=false
 * must never be displayed in public-facing or proposal contexts.
 */

export type CertificationStatus = "pending" | "in-preparation" | "active" | "expired";

export type ContractVehicleType = "gwac" | "mac" | "idiq" | "bpa" | "fss" | "other";

export type ClearanceLevel =
  | "none"
  | "public-trust"
  | "confidential"
  | "secret"
  | "top-secret"
  | "ts-sci";

export type NaicsCode = {
  code: string;
  title: string;
  description?: string;
  /** Primary NAICS code for this entity. */
  primary?: boolean;
  /** Whether this code has been confirmed for use in official documents. */
  status: "confirmed" | "pending" | "retired";
};

export type PscCode = {
  code: string;
  title: string;
  description?: string;
  primary?: boolean;
};

export type Certification = {
  id: string;
  name: string;
  /** Issuing authority (e.g. "SBA", "DVA", "SAM.gov"). */
  issuingAuthority: string;
  status: CertificationStatus;
  referenceNumber?: string;
  issuedAt?: string;
  expiresAt?: string;
};

export type ContractVehicle = {
  id: string;
  name: string;
  type: ContractVehicleType;
  agency?: string;
  contractNumber?: string;
  status: "active" | "pending" | "expired";
  expiresAt?: string;
  description?: string;
};

/**
 * Past performance record. The `authorized` flag must be explicitly set to
 * true before a record may be included in proposals or public documents.
 * Records sourced from client engagements require client authorization.
 */
export type PastPerformanceRecord = {
  id: string;
  title: string;
  agency?: string;
  /** Prime or subcontractor. */
  contractingRole?: "prime" | "subcontractor";
  contractNumber?: string;
  contractType?: "firm-fixed-price" | "cost-plus" | "time-and-materials" | "other";
  naicsCodes?: string[];
  pscCodes?: string[];
  startDate?: string;
  endDate?: string;
  totalValue?: number;
  currency?: string;
  description?: string;
  outcomes?: string[];
  technologiesUsed?: string[];
  /** Contracting Officer or client POC name. */
  pocName?: string;
  pocPhone?: string;
  pocEmail?: string;
  /** Must be true before including in any proposal or public document. */
  authorized: boolean;
};

export type TeamQualification = {
  id: string;
  name: string;
  role: string;
  clearanceLevel?: ClearanceLevel;
  certifications?: string[];
  yearsExperience?: number;
  educationLevel?: string;
  resumeFileUrl?: string;
};

export type CapabilityStatementSnapshot = {
  version: string;
  createdAt: string;
  coreCompetencies: string[];
  differentiators: string[];
  naicsCodes: NaicsCode[];
  certifications: Certification[];
  contractVehicles: ContractVehicle[];
  /** IDs of PastPerformanceRecord entries authorized=true for this snapshot. */
  pastPerformanceIds: string[];
  teamQualifications?: TeamQualification[];
};
