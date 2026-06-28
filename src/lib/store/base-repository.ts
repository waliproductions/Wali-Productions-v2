/**
 * Abstract base repository.
 *
 * Provides all IRepository operations on top of json-store primitives.
 * Concrete repositories extend this, inject their collection name and
 * entity type, and optionally override applyFilters / buildSearchKeywords.
 */

import type { EntityRecord, IRepository, QueryOptions, PaginatedResult, EntityType } from "./types";
import {
  storeRead,
  storeWrite,
  storeDelete,
  storeList,
  storeExists,
} from "./json-store";
import { nextId } from "./ids";
import {
  buildCreateMetadata,
  buildUpdateMetadata,
  buildArchiveMetadata,
  buildRestoreMetadata,
  buildSoftDeleteMetadata,
} from "./metadata";
import { assertValid } from "./validation";
import { registerSearchCollection } from "./search";

export abstract class BaseRepository<T extends EntityRecord>
  implements IRepository<T>
{
  constructor(
    protected readonly collection: string,
    protected readonly entityType: EntityType,
  ) {
    registerSearchCollection(
      collection,
      entityType,
      () => this.listAll(),
      (e) => this.buildSearchKeywords(e),
    );
  }

  protected abstract buildSearchKeywords(entity: T): string[];

  protected matchesFilters(entity: T, options: QueryOptions): boolean {
    if (!options.includeDeleted && entity.deleted) return false;
    if (!options.includeArchived && entity.archived) return false;

    if (options.filters) {
      for (const f of options.filters) {
        const value = (entity as Record<string, unknown>)[f.field];
        switch (f.operator) {
          case "eq":
            if (value !== f.value) return false;
            break;
          case "neq":
            if (value === f.value) return false;
            break;
          case "contains":
            if (typeof value !== "string" || !value.toLowerCase().includes(String(f.value).toLowerCase())) return false;
            break;
          case "startsWith":
            if (typeof value !== "string" || !value.toLowerCase().startsWith(String(f.value).toLowerCase())) return false;
            break;
          case "in":
            if (!Array.isArray(f.value) || !f.value.includes(String(value))) return false;
            break;
          case "gt":
            if (typeof value !== "number" || value <= (f.value as number)) return false;
            break;
          case "lt":
            if (typeof value !== "number" || value >= (f.value as number)) return false;
            break;
          case "gte":
            if (typeof value !== "number" || value < (f.value as number)) return false;
            break;
          case "lte":
            if (typeof value !== "number" || value > (f.value as number)) return false;
            break;
        }
      }
    }

    return true;
  }

  protected matchesSearch(entity: T, query: string): boolean {
    if (!query) return true;
    const keywords = this.buildSearchKeywords(entity);
    const q = query.toLowerCase();
    return keywords.some((k) => k.toLowerCase().includes(q));
  }

  protected applySort(items: T[], sort?: QueryOptions["sort"]): T[] {
    if (!sort) return items;
    const { field, order } = sort;
    return [...items].sort((a, b) => {
      const av = (a as Record<string, unknown>)[field];
      const bv = (b as Record<string, unknown>)[field];
      if (av === bv) return 0;
      const cmp = av == null ? -1 : bv == null ? 1 : av < bv ? -1 : 1;
      return order === "asc" ? cmp : -cmp;
    });
  }

  async listAll(): Promise<T[]> {
    return storeList<T>(this.collection);
  }

  async findById(id: string): Promise<T | null> {
    return storeRead<T>(this.collection, id);
  }

  async findAll(options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    const all = await storeList<T>(this.collection);
    let filtered = all.filter((e) => this.matchesFilters(e, options));

    if (options.search) {
      filtered = filtered.filter((e) => this.matchesSearch(e, options.search!));
    }

    const sorted = this.applySort(filtered, options.sort);

    const page = Math.max(1, options.page ?? 1);
    const perPage = Math.min(200, Math.max(1, options.perPage ?? 50));
    const total = sorted.length;
    const totalPages = Math.ceil(total / perPage);
    const start = (page - 1) * perPage;
    const items = sorted.slice(start, start + perPage);

    return { items, total, page, perPage, totalPages };
  }

  async create(data: Omit<T, keyof EntityRecord>, actor?: string): Promise<T> {
    assertValid(this.collection, data as Partial<T>);
    const id = await nextId(this.entityType);
    const meta = buildCreateMetadata(id, actor);
    const entity = { ...meta, ...data } as unknown as T;
    await storeWrite(this.collection, entity);
    return entity;
  }

  async update(
    id: string,
    data: Partial<Omit<T, keyof EntityRecord>>,
    actor?: string,
  ): Promise<T | null> {
    const existing = await storeRead<T>(this.collection, id);
    if (!existing || existing.deleted) return null;

    assertValid(this.collection, { ...existing, ...data });
    const meta = buildUpdateMetadata(existing, actor);
    const updated = { ...existing, ...data, ...meta } as T;
    await storeWrite(this.collection, updated);
    return updated;
  }

  async archive(id: string, actor?: string): Promise<T | null> {
    const existing = await storeRead<T>(this.collection, id);
    if (!existing || existing.deleted) return null;

    const updated = { ...existing, ...buildArchiveMetadata(existing, actor) } as T;
    await storeWrite(this.collection, updated);
    return updated;
  }

  async restore(id: string, actor?: string): Promise<T | null> {
    const existing = await storeRead<T>(this.collection, id);
    if (!existing) return null;

    const updated = { ...existing, ...buildRestoreMetadata(existing, actor) } as T;
    await storeWrite(this.collection, updated);
    return updated;
  }

  async delete(id: string, actor?: string): Promise<boolean> {
    const existing = await storeRead<T>(this.collection, id);
    if (!existing) return false;

    const updated = { ...existing, ...buildSoftDeleteMetadata(existing, actor) } as T;
    await storeWrite(this.collection, updated);
    return true;
  }

  async hardDelete(id: string): Promise<boolean> {
    return storeDelete(this.collection, id);
  }

  async exists(id: string): Promise<boolean> {
    return storeExists(this.collection, id);
  }

  async count(
    options: Pick<QueryOptions, "filters" | "includeArchived" | "includeDeleted"> = {},
  ): Promise<number> {
    const all = await storeList<T>(this.collection);
    return all.filter((e) => this.matchesFilters(e, options)).length;
  }

  async search(query: string, options: QueryOptions = {}): Promise<PaginatedResult<T>> {
    return this.findAll({ ...options, search: query });
  }
}
