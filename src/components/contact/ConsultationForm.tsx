"use client";

import { useState } from "react";
import { contactContent } from "@/config/contact";
import { Field } from "@/components/ui/forms/Field";
import { Input } from "@/components/ui/forms/Input";
import { Textarea } from "@/components/ui/forms/Textarea";
import { Select } from "@/components/ui/forms/Select";
import { FormFeedback } from "@/components/ui/forms/FormFeedback";
import { Button } from "@/components/ui/Button";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type SubmitState = {
  status: SubmitStatus;
  message: string;
  submissionId?: string;
};

export function ConsultationForm() {
  const { serviceOptions, budgetOptions, timelineOptions, preferredContactOptions, orgTypeOptions, decisionMakerOptions } =
    contactContent.consultation;
  const [state, setState] = useState<SubmitState>({ status: "idle", message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:             String(data.get("name") ?? ""),
          email:            String(data.get("email") ?? ""),
          company:          String(data.get("company") ?? ""),
          phone:            String(data.get("phone") ?? ""),
          orgType:          String(data.get("orgType") ?? ""),
          service:          String(data.get("service") ?? ""),
          budget:           String(data.get("budget") ?? ""),
          timeline:         String(data.get("timeline") ?? ""),
          preferredContact: String(data.get("preferredContact") ?? ""),
          decisionMaker:    String(data.get("decisionMaker") ?? ""),
          message:          String(data.get("message") ?? ""),
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        submissionId?: string;
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
        submissionId: result.submissionId,
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="contact-name" required>
          <Input
            id="contact-name"
            name="name"
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
        <Field label="Organization" htmlFor="contact-company">
          <Input
            id="contact-company"
            name="company"
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
        <Field label="Organization type" htmlFor="contact-orgtype">
          <Select
            id="contact-orgtype"
            name="orgType"
            options={orgTypeOptions.map((o) => ({ value: o, label: o }))}
            placeholder="Type of organization"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
        <Field label="Service needed" htmlFor="contact-service" required>
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
        <Field label="Budget range" htmlFor="contact-budget">
          <Select
            id="contact-budget"
            name="budget"
            options={budgetOptions.map((b) => ({ value: b, label: b }))}
            placeholder="Select a range"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
        <Field label="Project timeline" htmlFor="contact-timeline">
          <Select
            id="contact-timeline"
            name="timeline"
            options={timelineOptions.map((t) => ({ value: t, label: t }))}
            placeholder="When do you need this?"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred contact method" htmlFor="contact-preferred">
          <Select
            id="contact-preferred"
            name="preferredContact"
            options={preferredContactOptions.map((p) => ({ value: p, label: p }))}
            placeholder="How should we follow up?"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
        <Field label="Are you the decision-maker?" htmlFor="contact-decision">
          <Select
            id="contact-decision"
            name="decisionMaker"
            options={decisionMakerOptions.map((d) => ({ value: d, label: d }))}
            placeholder="Your role in this decision"
            defaultValue=""
            disabled={disabled}
          />
        </Field>
      </div>

      <Field
        label="Project goals and description"
        htmlFor="contact-message"
        hint="Tell us about the problem you're trying to solve, your goals, and any relevant context."
        required
      >
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Describe your project, challenge, or goals…"
          required
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
          {disabled ? "Submitting…" : "Submit inquiry"}
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
            detail={state.submissionId ? `Reference ID: ${state.submissionId}` : undefined}
          />
        )}
      </div>
    </form>
  );
}
