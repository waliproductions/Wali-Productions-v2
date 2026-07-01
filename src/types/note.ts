/**
 * Generic internal note — polymorphic association via entityType/entityId,
 * matching the pattern used by Activity and Document. Reusable across any
 * entity (Lead today; Organization, Project, etc. later) without a new
 * table per domain.
 */

import type { EntityType } from "@/lib/store/types";

export type Note = {
  id: string;
  entityType: EntityType;
  entityId: string;
  body: string;
  author: string;
  pinned?: boolean;
  createdAt: string;
  updatedAt: string;
};
