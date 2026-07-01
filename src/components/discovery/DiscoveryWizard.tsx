"use client";

import { useMemo, useState } from "react";
import type { QuestionnaireSection, QuestionnaireQuestion } from "@/config/questionnaire";
import type { QuestionnaireAnswerValue, QuestionnaireStatus } from "@/types/questionnaire";
import { Field } from "@/components/ui/forms/Field";
import { Input } from "@/components/ui/forms/Input";
import { Textarea } from "@/components/ui/forms/Textarea";
import { Select } from "@/components/ui/forms/Select";
import { FormFeedback } from "@/components/ui/forms/FormFeedback";
import { Button } from "@/components/ui/Button";

type DiscoveryWizardProps = {
  token: string;
  sections: QuestionnaireSection[];
  initialAnswers: Record<string, QuestionnaireAnswerValue>;
  initialStatus: QuestionnaireStatus;
  leadName: string | null;
  companyName: string | null;
};

function questionKey(sectionId: string, questionId: string): string {
  return `${sectionId}.${questionId}`;
}

function QuestionField({
  sectionId,
  question,
  value,
  onChange,
}: {
  sectionId: string;
  question: QuestionnaireQuestion;
  value: QuestionnaireAnswerValue | undefined;
  onChange: (value: QuestionnaireAnswerValue) => void;
}) {
  const id = `q-${sectionId}-${question.id}`;

  if (question.type === "text") {
    return (
      <Input
        id={id}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        required={question.required}
      />
    );
  }

  if (question.type === "textarea") {
    return (
      <Textarea
        id={id}
        rows={4}
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        required={question.required}
      />
    );
  }

  if (question.type === "select") {
    return (
      <Select
        id={id}
        options={question.options ?? []}
        placeholder="Select an option"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        required={question.required}
      />
    );
  }

  if (question.type === "radio") {
    const current = typeof value === "string" ? value : "";
    return (
      <div className="flex flex-col gap-2">
        {(question.options ?? []).map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-black/10 px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-[#F8FAFC] has-[:checked]:border-[#1E3A5F] has-[:checked]:bg-[#EEF3FA] dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/[0.03] dark:has-[:checked]:border-[#4A7DB5] dark:has-[:checked]:bg-[#4A7DB5]/10"
          >
            <input
              type="radio"
              name={id}
              value={opt.value}
              checked={current === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 accent-[#1E3A5F]"
            />
            {opt.label}
          </label>
        ))}
      </div>
    );
  }

  // multiselect
  const current = Array.isArray(value) ? value : [];
  return (
    <div className="flex flex-col gap-2">
      {(question.options ?? []).map((opt) => {
        const checked = current.includes(opt.value);
        return (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-black/10 px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-[#F8FAFC] has-[:checked]:border-[#1E3A5F] has-[:checked]:bg-[#EEF3FA] dark:border-white/10 dark:text-neutral-300 dark:hover:bg-white/[0.03] dark:has-[:checked]:border-[#4A7DB5] dark:has-[:checked]:bg-[#4A7DB5]/10"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                onChange(checked ? current.filter((v) => v !== opt.value) : [...current, opt.value])
              }
              className="h-4 w-4 rounded accent-[#1E3A5F]"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}

export function DiscoveryWizard({
  token,
  sections,
  initialAnswers,
  initialStatus,
  leadName,
  companyName,
}: DiscoveryWizardProps) {
  const [answers, setAnswers] = useState<Record<string, QuestionnaireAnswerValue>>(initialAnswers);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(initialStatus === "completed");
  const [reviewing, setReviewing] = useState(false);

  const section = sections[sectionIndex];
  const isFirst = sectionIndex === 0;
  const isLast = sectionIndex === sections.length - 1;

  const answeredCount = useMemo(() => {
    return sections.reduce((sum, s) => {
      return (
        sum +
        s.questions.filter((q) => {
          const v = answers[questionKey(s.id, q.id)];
          return v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0);
        }).length
      );
    }, 0);
  }, [answers, sections]);
  const totalQuestions = useMemo(() => sections.reduce((sum, s) => sum + s.questions.length, 0), [sections]);

  function updateAnswer(sectionId: string, questionId: string, value: QuestionnaireAnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionKey(sectionId, questionId)]: value }));
  }

  async function saveAnswers(submit: boolean): Promise<boolean> {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/discovery/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, submit }),
      });
      const result = (await response.json()) as { ok?: boolean; errors?: string[] };
      if (!response.ok || !result.ok) {
        setError(result.errors?.join(" ") ?? "Could not save your answers. Please try again.");
        return false;
      }
      return true;
    } catch {
      setError("Could not save your answers due to a connection issue. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleNext() {
    const ok = await saveAnswers(false);
    if (ok && !isLast) setSectionIndex((i) => i + 1);
  }

  function handleBack() {
    setSectionIndex((i) => Math.max(0, i - 1));
  }

  async function handleSubmit() {
    const ok = await saveAnswers(true);
    if (ok) setCompleted(true);
  }

  if (completed && !reviewing) {
    return (
      <div className="rounded-2xl border border-black/8 bg-white p-10 text-center shadow-premium dark:border-white/8 dark:bg-white/[0.03]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
          Thank you{leadName ? `, ${leadName.split(" ")[0]}` : ""}.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          Your discovery questionnaire has been submitted. We&apos;ll review your answers and follow up as we
          prepare your proposal.
        </p>
        <button
          type="button"
          onClick={() => setReviewing(true)}
          className="mt-6 text-sm font-medium text-[#1E3A5F] underline-offset-4 hover:underline dark:text-[#60a5fa]"
        >
          Review or update your answers
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/8 bg-white shadow-premium dark:border-white/8 dark:bg-white/[0.03]">
      <div className="border-b border-black/8 px-8 pt-8 pb-6 dark:border-white/8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Discovery Questionnaire</p>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0D1B2A] dark:text-white">
          {companyName ?? leadName ?? "Your project"}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Section {sectionIndex + 1} of {sections.length} · {answeredCount} of {totalQuestions} questions answered
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#4A7DB5] transition-all duration-300"
            style={{ width: `${((sectionIndex + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-8 py-8">
        <h2 className="font-display text-lg font-bold text-[#0D1B2A] dark:text-white">{section.title}</h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{section.description}</p>

        <div className="mt-6 space-y-6">
          {section.questions.map((q) => (
            <Field key={q.id} label={q.label} htmlFor={`q-${section.id}-${q.id}`} hint={q.helpText} required={q.required}>
              <QuestionField
                sectionId={section.id}
                question={q}
                value={answers[questionKey(section.id, q.id)]}
                onChange={(value) => updateAnswer(section.id, q.id, value)}
              />
            </Field>
          ))}
        </div>

        {error && (
          <div className="mt-6">
            <FormFeedback variant="error" message={error} />
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/8 pt-6 dark:border-white/8">
          <Button variant="secondary" size="sm" onClick={handleBack} disabled={isFirst || saving}>
            Back
          </Button>
          {isLast ? (
            <Button size="sm" onClick={handleSubmit} disabled={saving}>
              {saving ? "Submitting…" : reviewing ? "Save changes" : "Submit questionnaire"}
            </Button>
          ) : (
            <Button size="sm" onClick={handleNext} disabled={saving}>
              {saving ? "Saving…" : "Save & continue"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
