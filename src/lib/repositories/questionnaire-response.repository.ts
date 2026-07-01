import { BaseRepository } from "@/lib/store/base-repository";
import { COLLECTION_PATHS } from "@/lib/store/types";
import type { EntityRecord } from "@/lib/store/types";
import type { QuestionnaireResponse } from "@/types/questionnaire";

export type StoredQuestionnaireResponse = EntityRecord & QuestionnaireResponse;

class QuestionnaireResponseRepository extends BaseRepository<StoredQuestionnaireResponse> {
  constructor() {
    super(COLLECTION_PATHS.questionnaireResponse, "questionnaireResponse");
  }

  protected buildSearchKeywords(e: StoredQuestionnaireResponse): string[] {
    return [e.leadId, e.status].filter(Boolean);
  }

  async findByLead(leadId: string): Promise<StoredQuestionnaireResponse | null> {
    const result = await this.findAll({
      filters: [{ field: "leadId", operator: "eq", value: leadId }],
      perPage: 1,
    });
    return result.items[0] ?? null;
  }

  async findByToken(token: string): Promise<StoredQuestionnaireResponse | null> {
    const result = await this.findAll({
      filters: [{ field: "accessToken", operator: "eq", value: token }],
      perPage: 1,
      includeArchived: true,
    });
    return result.items[0] ?? null;
  }
}

export const questionnaireResponseRepository = new QuestionnaireResponseRepository();
