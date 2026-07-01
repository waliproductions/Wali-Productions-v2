import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord, EntityType } from "@/lib/store/types";
import type { Note } from "@/types/note";

export type StoredNote = EntityRecord & Note;

class NoteRepository extends BaseRepository<StoredNote> {
  constructor() {
    super(COLLECTION_PATHS.note, "note");
  }

  protected buildSearchKeywords(e: StoredNote): string[] {
    return [e.body, e.author, e.entityType].filter(Boolean);
  }

  async findByEntity(entityType: EntityType, entityId: string): Promise<StoredNote[]> {
    const result = await this.findAll({
      filters: [
        { field: "entityType", operator: "eq", value: entityType },
        { field: "entityId", operator: "eq", value: entityId },
      ],
      sort: { field: "createdAt", order: "desc" },
      perPage: 200,
    });
    return result.items;
  }
}

export const noteRepository = new NoteRepository();
