"use client";

import { useState } from "react";
import { contactContent } from "@/config/contact";
import { Field } from "@/components/ui/forms/Field";
import { Input } from "@/components/ui/forms/Input";
import { Textarea } from "@/components/ui/forms/Textarea";
import { Select } from "@/components/ui/forms/Select";
import { FormFeedback } from "@/components/ui/forms/FormFeedback";
import { Button } from "@/components/ui/Button";

const CONTACT_METHOD_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "video-call", label: "Video call (Zoom/Teams)" },
  { value: "text", label: "Text message" },
  { value: "no-preference", label: "No preference" },
];

const CONTACT_TIME_OPTIONS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "anytime", label: "Anytime" },
];

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type SubmitState = {
  status: SubmitStatus;
  message: string;
  leadId?: string;
};

export function ConsultationForm() {
  const { serviceOptions } = contactContent.consultation;
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(data.get("fullName") ?? ""),
          email: String(data.get("email") ?? ""),
          companyName: String(data.get("companyName") ?? ""),
          phone: String(data.get("phone") ?? ""),
          website: String(data.get("website") ?? ""),
          servicesInterested: [String(data.get("service") ?? "")].filter(Boolean),
          preferredContactMethod: String(data.get("preferredContactMethod") ?? ""),
          preferredContactTime: String(data.get("preferredContactTime") ?? ""),
          projectDescription: String(data.get("projectDescription") ?? ""),
          // Honeypot — legitimate visitors never see or fill this field.
          website2: String(data.get("website2") ?? ""),
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        leadId?: string;
        errors?: string[];
      };

      if (!response.ok || !result.ok) {
        setState({
          status: "error",
          message:
            result.errors?.join(" ") ||
            result.message ||
            "Your inquiry could not be submitted. Please review the form and try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message:
          "Your inquiry was received. Wali Productions LLC will review your request and follow up within 24 hours.",
        leadId: result.leadId,
      });
    } catch {
      setState({
        status: "error",
        message:
          "Your inquiry could not be submitted due to a connection issue. Please try again.",
      });
    }
  };

  const disabled = state.status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot field — hidden from sighted and screen-reader users, bots often fill every input. */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website2">Leave this field blank</label>
        <input id="contact-website2" name="website2" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="contact-name" required>
          <Input
            id="contact-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            disabled={disabled}
          />
        </Field>
        <Field label="Email address" htmlFor="contact-email" required>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@organization.com"
            required
            disabled={disabled}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Company name" htmlFor="contact-company">
          <Input
            id="contact-company"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Company, agency, or ministry"
            disabled={disabled}
          />
        </Field>
        <Field label="Phone number" htmlFor="contact-phone">
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(000) 000-0000"
            disabled={disabled}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Website" htmlFor="contact-website">
          <Input
            id="contact-website"
            name="website"
            type="text"
            autoComplete="url"
            placeholder="yourcompany.com"
            disabled={disabled}
          />
        </Field>
        <Field label="Service you're interested in" htmlFor="contact-service" required>
          <Select
            id="contact-service"
            name="service"
            options={serviceOptions.map((s) => ({ value: s, label: s }))}
            placeholder="Select a service"
            defaultValue=""
            required
            disabled={disabled}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred contact method" htmlFor="contact-preferred">
          <Select
            id="contact-preferred"
            name="preferredContactMethod"
            options={CONTACT_METHOD_OPTIONS}
            placeholder="How should we follow up?"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
        <Field label="Preferred contact time" htmlFor="contact-preferred-time">
          <Select
            id="contact-preferred-time"
            name="preferredContactTime"
            options={CONTACT_TIME_OPTIONS}
            placeholder="Best time to reach you"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
      </div>

      <Field
        label="Brief project description"
        htmlFor="contact-description"
        hint="A sentence or two is plenty — we'll get the full picture during our conversation."
      >
        <Textarea
          id="contact-description"
          name="projectDescription"
          rows={4}
          placeholder="What are you looking to build or solve?"
          disabled={disabled}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-1">
        <Button
          type="submit"
          disabled={disabled}
          size="md"
          className="w-full sm:w-auto"
        >
          {disabled ? "Submitting…" : "Request a consultation"}
        </Button>

        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          No commitment required. We respond to every inquiry within 24 hours.
        </p>

        {state.status === "error" && (
          <FormFeedback variant="error" message={state.message} />
        )}
        {state.status === "success" && (
          <FormFeedback
            variant="success"
            message={state.message}
            detail={state.leadId ? `Reference ID: ${state.leadId}` : undefined}
          />
        )}
      </div>
    </form>
  );
}
