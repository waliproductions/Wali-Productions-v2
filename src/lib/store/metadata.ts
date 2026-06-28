import type { EntityRecord } from "./types";

const SYSTEM_ACTOR = "system";

export function buildCreateMetadata(id: string, actor = SYSTEM_ACTOR): EntityRecord {
  const now = new Date().toISOString();
  return {
    id,
    createdAt: now,
    updatedAt: now,
    createdBy: actor,
    updatedBy: actor,
    version: 1,
    archived: false,
    deleted: false,
  };
}

export function buildUpdateMetadata(
  existing: EntityRecord,
  actor = SYSTEM_ACTOR
): Pick<EntityRecord, "updatedAt" | "updatedBy" | "version"> {
  return {
    updatedAt: new Date().toISOString(),
    updatedBy: actor,
    version: existing.version + 1,
  };
}

export function buildArchiveMetadata(
  existing: EntityRecord,
  actor = SYSTEM_ACTOR
): Pick<EntityRecord, "archived" | "updatedAt" | "updatedBy" | "version"> {
  return {
    archived: true,
    updatedAt: new Date().toISOString(),
    updatedBy: actor,
    version: existing.version + 1,
  };
}

export function buildRestoreMetadata(
  existing: EntityRecord,
  actor = SYSTEM_ACTOR
): Pick<EntityRecord, "archived" | "deleted" | "deletedAt" | "updatedAt" | "updatedBy" | "version"> {
  return {
    archived: false,
    deleted: false,
    deletedAt: undefined,
    updatedAt: new Date().toISOString(),
    updatedBy: actor,
    version: existing.version + 1,
  };
}

export function buildSoftDeleteMetadata(
  existing: EntityRecord,
  actor = SYSTEM_ACTOR
): Pick<EntityRecord, "deleted" | "deletedAt" | "updatedAt" | "updatedBy" | "version"> {
  const now = new Date().toISOString();
  return {
    deleted: true,
    deletedAt: now,
    updatedAt: now,
    updatedBy: actor,
    version: existing.version + 1,
  };
}
