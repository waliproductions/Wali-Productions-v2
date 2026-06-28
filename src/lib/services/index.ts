/**
 * Service layer foundation.
 *
 * Services are the boundary between UI and data. They define the contract
 * for each domain operation independently of the data store. This separation
 * enables future REST/GraphQL API wrapping, unit testing with mock services,
 * and database migration without touching UI components.
 *
 * Pattern:
 *   1. Define the interface (this layer)
 *   2. Implement with in-memory/config data (Phase 1 — no database)
 *   3. Replace with a real data store (Phase 2 — Postgres, Supabase, etc.)
 *   4. Optionally expose via API route (Phase 3)
 *
 * All service methods return ServiceResult<T> to allow typed error handling
 * without thrown exceptions crossing module boundaries.
 */

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code?: string };

export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type SortOrder = "asc" | "desc";

export type SortParams<T extends string = string> = {
  field: T;
  order: SortOrder;
};

export type FilterOperator =
  | "eq"
  | "neq"
  | "contains"
  | "starts-with"
  | "in"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "between";

export type FilterParam = {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean | string[];
};

export type QueryParams<SortField extends string = string> = {
  pagination?: PaginationParams;
  sort?: SortParams<SortField>;
  filters?: FilterParam[];
  search?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export function ok<T>(data: T): ServiceResult<T> {
  return { ok: true, data };
}

export function err(error: string, code?: string): ServiceResult<never> {
  return { ok: false, error, code };
}
