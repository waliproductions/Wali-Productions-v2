/**
 * Client data model — supports commercial, enterprise, and government clients.
 *
 * All fields are optional by design to support progressive data collection.
 * Government-specific fields (UEI, CAGE, NAICS) are present but only populated
 * for government clients. Client records are never published publicly.
 */

export type ClientStatus = "prospect" | "active" | "on-hold" | "inactive" | "churned";

export type ClientType =
  | "commercial"
  | "enterprise"
  | "government-federal"
  | "government-state"
  | "government-local"
  | "nonprofit"
  | "individual";

export type ContactRole = "primary" | "billing" | "technical" | "executive" | "legal";

export type ClientContact = {
  id: string;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  role: ContactRole;
  /** Whether this contact receives billing communications. */
  receivesBilling?: boolean;
};

export type Client = {
  id: string;
  /** Display name (may differ from legal name). */
  name: string;
  legalName?: string;
  type: ClientType;
  status: ClientStatus;
  /** Primary industry vertical. */
  industry?: string;
  website?: string;
  contacts: ClientContact[];
  /** IDs of associated Project records. */
  projectIds?: string[];
  /** Internal notes — never shown to client. */
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  // Government-specific identifiers
  uei?: string;
  cageCode?: string;
  naicsCodes?: string[];
  samRegistered?: boolean;
};
