"use client";

import { useState } from "react";
import { contactContent } from "@/config/contact";

type SubmitState =
  | { status: "idle"; message: string }
  | { status: "submitting"; message: string }
  | { status: "success"; message: string; submissionId?: string }
  | { status: "error"; message: string };

export function ConsultationForm() {
  const { serviceOptions } = contactContent.consultation;
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setSubmitState({
      status: "submitting",
      message: "Submitting your inquiry...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        submissionId?: string;
        errors?: string[];
      };

      if (!response.ok || !result.ok) {
        setSubmitState({
          status: "error",
          message:
            result.errors?.join(" ") ||
            result.message ||
            "Your inquiry could not be submitted. Please review the form and try again.",
        });
        return;
      }

      form.reset();

      setSubmitState({
        status: "success",
        message:
          "Your inquiry was received. Wali Productions LLC will review the request and follow up as appropriate.",
        submissionId: result.submissionId,
      });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Your inquiry could not be submitted due to a connection issue. Please try again.",
      });
    }
  };

  const fieldClass =
    "mt-1 w-full rounded-md border border-black/15 bg-background px-3 py-2 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-current dark:border-white/20";
  const labelClass = "block text-sm font-medium";

  const statusClass =
    submitState.status === "error"
      ? "text-sm text-red-700 dark:text-red-300"
      : "text-sm text-neutral-600 dark:text-neutral-300";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          required
        />
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClass}>
          Organization <span className="text-neutral-500">(optional)</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-service" className={labelClass}>
          Service of interest
        </label>
        <select
          id="contact-service"
          name="service"
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className={fieldClass}
          required
        />
      </div>

      <button
        type="submit"
        disabled={submitState.status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState.status === "submitting"
          ? "Submitting..."
          : "Request consultation"}
      </button>

      {submitState.status !== "idle" && (
        <p role="status" className={statusClass}>
          {submitState.message}
          {submitState.status === "success" && submitState.submissionId ? (
            <span className="sr-only">
              {" "}
              Submission ID: {submitState.submissionId}
            </span>
          ) : null}
        </p>
      )}
    </form>
  );
}
