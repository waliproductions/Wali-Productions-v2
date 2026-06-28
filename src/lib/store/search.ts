/**
 * Enterprise search architecture.
 *
 * Repositories register their own keyword extractor. At query time,
 * the search engine runs the query against all registered collections
 * or a specific subset.
 *
 * Phase 1: in-memory keyword scan (no external index needed).
 * Phase 2: drop-in replacement with Postgres full-text or Meilisearch
 *           without changing repository code.
 */

import type { EntityRecord, EntityType } from "./types";

// ─── Extractor registry ───────────────────────────────────────────────────────

type KeywordExtractor<T> = (entity: T) => string[];
type EntityFetcher<T> = () => Promise<T[]>;

type CollectionEntry<T extends EntityRecord> = {
  entityType: EntityType;
  fetchAll: EntityFetcher<T>;
  extractKeywords: KeywordExtractor<T>;
};

const registry = new Map<string, CollectionEntry<EntityRecord>>();

export function registerSearchCollection<T extends EntityRecord>(
  collection: string,
  entityType: EntityType,
  fetchAll: EntityFetcher<T>,
  extractKeywords: KeywordExtractor<T>,
): void {
  registry.set(collection, {
    entityType,
    fetchAll: fetchAll as EntityFetcher<EntityRecord>,
    extractKeywords: extractKeywords as KeywordExtractor<EntityRecord>,
  });
}

// ─── Search result ────────────────────────────────────────────────────────────

export type SearchResult = {
  id: string;
  entityType: EntityType;
  collection: string;
  score: number;
  entity: EntityRecord;
};

// ─── Core search function ─────────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function score(tokens: string[], keywords: string[]): number {
  const keywordStr = keywords.join(" ").toLowerCase();
  let hits = 0;
  for (const t of tokens) {
    if (keywordStr.includes(t)) hits++;
  }
  return hits;
}

export async function globalSearch(
  query: string,
  options: {
    collections?: string[];
    limit?: number;
    includeArchived?: boolean;
    includeDeleted?: boolean;
  } = {},
): Promise<SearchResult[]> {
  const { collections, limit = 20, includeArchived = false, includeDeleted = false } = options;
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const targets = collections
    ? [...registry.entries()].filter(([k]) => collections.includes(k))
    : [...registry.entries()];

  const results: SearchResult[] = [];

  await Promise.all(
    targets.map(async ([collection, entry]) => {
      const items = await entry.fetchAll();
      for (const entity of items) {
        if (!includeDeleted && entity.deleted) continue;
        if (!includeArchived && entity.archived) continue;

        const keywords = entry.extractKeywords(entity);
        const s = score(tokens, keywords);
        if (s > 0) {
          results.push({
            id: entity.id,
            entityType: entry.entityType,
            collection,
            score: s,
            entity,
          });
        }
      }
    }),
  );

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
