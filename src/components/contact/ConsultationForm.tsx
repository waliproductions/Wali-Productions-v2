"use client";

import { useState } from "react";
import { contactContent } from "@/config/contact";

/**
 * Consultation request form — PRESENTATIONAL ONLY.
 *
 * Per the Phase 8 brief, this form is NOT connected to a backend and no form
 * endpoint is invented. Submitting does not send anything; it only shows a
 * notice that submission is not yet configured. Wire this to an approved
 * endpoint in a later, separately-approved phase.
 */
export function ConsultationForm() {
  const { serviceOptions } = contactContent.consultation;
  const [showNotice, setShowNotice] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Intentionally does not submit anywhere — no backend is configured.
    event.preventDefault();
    setShowNotice(true);
  };

  const fieldClass =
    "mt-1 w-full rounded-md border border-black/15 bg-background px-3 py-2 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-current dark:border-white/20";
  const labelClass = "block text-sm font-medium";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl space-y-5">
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
        <select id="contact-service" name="service" className={fieldClass} defaultValue="">
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
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-base font-medium text-background transition-opacity hover:opacity-90"
      >
        Request consultation
      </button>

      {showNotice && (
        <p role="status" className="text-sm text-neutral-600 dark:text-neutral-300">
          This form is not yet connected to a backend, so no message was sent.
          A submission endpoint will be configured in a later phase.
        </p>
      )}
    </form>
  );
}
