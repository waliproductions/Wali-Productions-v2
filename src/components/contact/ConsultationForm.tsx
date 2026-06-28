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
  const { serviceOptions } = contactContent.consultation;
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
          name:    String(data.get("name") ?? ""),
          email:   String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          phone:   String(data.get("phone") ?? ""),
          service: String(data.get("service") ?? ""),
          message: String(data.get("message") ?? ""),
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
          "Your inquiry was received. Wali Productions LLC will review the request and follow up as appropriate.",
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

  const serviceSelectOptions = serviceOptions.map((s) => ({ value: s, label: s }));

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={state.status === "submitting"}
          />
        </Field>
        <Field label="Email" htmlFor="contact-email" required>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={state.status === "submitting"}
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
            disabled={state.status === "submitting"}
          />
        </Field>
        <Field label="Phone" htmlFor="contact-phone">
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={state.status === "submitting"}
          />
        </Field>
      </div>

      <Field label="Service of interest" htmlFor="contact-service" required>
        <Select
          id="contact-service"
          name="service"
          options={serviceSelectOptions}
          placeholder="Select a service"
          defaultValue=""
          required
          disabled={state.status === "submitting"}
        />
      </Field>

      <Field label="Message" htmlFor="contact-message" required>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={state.status === "submitting"}
        />
      </Field>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          disabled={state.status === "submitting"}
          size="md"
        >
          {state.status === "submitting" ? "Submitting…" : "Request consultation"}
        </Button>

        {state.status === "error" && (
          <FormFeedback variant="error" message={state.message} />
        )}
        {state.status === "success" && (
          <FormFeedback
            variant="success"
            message={state.message}
            detail={state.submissionId ? `Reference: ${state.submissionId}` : undefined}
          />
        )}
      </div>
    </form>
  );
}
