/**
 * Discovery Questionnaire data model.
 *
 * The question schema itself (sections/questions/options) is config-driven —
 * see src/config/questionnaire.ts — because it is content, not user data.
 * A QuestionnaireResponse stores one client's answers against that schema,
 * keyed by "sectionId.questionId", plus progress/lifecycle metadata.
 *
 * Access is via an unguessable accessToken rather than the sequential
 * entity id, so the response can be reached from an emailed link without
 * requiring the client to have an admin account.
 */

export type QuestionnaireStatus = "not-sent" | "sent" | "in-progress" | "completed";

export type QuestionnaireAnswerValue = string | string[] | boolean;

export type QuestionnaireResponse = {
  id: string;
  leadId: string;
  accessToken: string;
  status: QuestionnaireStatus;
  answers: Record<string, QuestionnaireAnswerValue>;
  sentAt?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
};
