import nodemailer from "nodemailer";
import type { StoredLead } from "@/lib/repositories/lead.repository";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
}

export async function sendLeadNotificationEmail(lead: StoredLead): Promise<void> {
  const subject = `New Consultation Request — ${lead.fullName}`;
  const adminUrl = `${siteUrl()}/admin/leads/${lead.id}`;

  const body = `
New consultation request received.

Lead ID: ${lead.id}
Received: ${lead.createdAt}

---

Name: ${lead.fullName}
Email: ${lead.email}
Phone: ${lead.phone ?? "Not provided"}
Company: ${lead.companyName ?? "Not provided"}
Website: ${lead.website ?? "Not provided"}

Preferred contact method: ${lead.preferredContactMethod ?? "Not specified"}
Preferred contact time: ${lead.preferredContactTime ?? "Not specified"}

Services interested in: ${lead.servicesInterested.length ? lead.servicesInterested.join(", ") : "Not specified"}

---

Project description:
${lead.projectDescription ?? "Not provided"}

---

View in admin: ${adminUrl}
`;

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER,
    replyTo: lead.email,
    subject,
    text: body.trim(),
  });
}

export async function sendQuestionnaireInviteEmail(
  lead: StoredLead,
  accessToken: string,
): Promise<void> {
  const link = `${siteUrl()}/discovery/${accessToken}`;
  const subject = `Wali Productions — Discovery Questionnaire for ${lead.companyName ?? lead.fullName}`;

  const body = `
Hi ${lead.fullName},

Thanks for the conversation. To help us scope your project accurately,
please complete the discovery questionnaire at the link below when you
have a chance. It should take about 10–15 minutes, and you can save your
progress and come back to it.

${link}

If you have any questions in the meantime, just reply to this email.

— Wali Productions LLC
`;

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER,
    to: lead.email,
    replyTo: process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER,
    subject,
    text: body.trim(),
  });
}
