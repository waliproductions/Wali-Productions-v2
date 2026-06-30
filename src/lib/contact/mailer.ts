import nodemailer from "nodemailer";
import type { ContactSubmissionRecord } from "./schema";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE !== "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(
  record: ContactSubmissionRecord
) {
  const subject = `New Contact Request - ${record.requester.name}`;

  const body = `
New consultation request received.

Submission ID:
${record.submissionId}

Submitted (Local):
${record.submittedAtLocal}

Submitted (UTC):
${record.submittedAtUtc}

---

Name:
${record.requester.name}

Email:
${record.requester.email}

Organization:
${record.requester.company ?? "Not provided"}

Phone:
${record.requester.phone ?? "Not provided"}

Preferred Contact Method:
${record.inquiry.preferredContact ?? "Not specified"}

---

Service of Interest:
${record.inquiry.service ?? "Not specified"}

Budget Range:
${record.inquiry.budget ?? "Not specified"}

Project Timeline:
${record.inquiry.timeline ?? "Not specified"}

---

Message / Project Goals:
${record.inquiry.message}
`;

  await transporter.sendMail({
    from:
      process.env.CONTACT_FROM_EMAIL ??
      process.env.SMTP_USER,
    to:
      process.env.CONTACT_TO_EMAIL ??
      process.env.SMTP_USER,
    replyTo: record.requester.email,
    subject,
    text: body.trim(),
  });
}
