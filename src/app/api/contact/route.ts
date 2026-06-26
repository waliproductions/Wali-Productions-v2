import { NextResponse } from "next/server";
import {
  appendContactEvent,
  createContactSubmissionRecord,
  markFailed,
  markProcessed,
  saveToQueue,
  sendContactEmail,
  updateSubmissionFile,
  validateContactSubmission,
} from "@/lib/contact";

function errorToMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown contact pipeline error.";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid JSON payload."] },
      { status: 400 }
    );
  }

  const validation = validateContactSubmission(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors },
      { status: 400 }
    );
  }

  const record = createContactSubmissionRecord(validation.data);
  const filePath = saveToQueue(record);

  appendContactEvent("received", record, {
    filePath,
    lifecycleStatus: record.lifecycleStatus,
    emailDeliveryStatus: record.emailDeliveryStatus,
  });

  const emailAttemptedAt = new Date().toISOString();
  record.processing.emailAttemptedAt = emailAttemptedAt;

  try {
    await sendContactEmail(record);

    const emailSentAt = new Date().toISOString();

    record.lifecycleStatus = "processed";
    record.emailDeliveryStatus = "sent";
    record.processing.emailSentAt = emailSentAt;
    record.processing.error = null;

    updateSubmissionFile(filePath, record);

    const processedPath = await markProcessed(filePath);

    appendContactEvent("email_sent", record, {
      originalFilePath: filePath,
      processedPath,
      emailAttemptedAt,
      emailSentAt,
    });

    return NextResponse.json({
      ok: true,
      submissionId: record.submissionId,
      message: "Your inquiry was received.",
    });
  } catch (error) {
    const errorMessage = errorToMessage(error);
    const emailFailedAt = new Date().toISOString();

    record.lifecycleStatus = "failed";
    record.emailDeliveryStatus = "failed";
    record.processing.emailFailedAt = emailFailedAt;
    record.processing.error = errorMessage;

    updateSubmissionFile(filePath, record);

    const failedPath = await markFailed(filePath);

    appendContactEvent("email_failed", record, {
      originalFilePath: filePath,
      failedPath,
      emailAttemptedAt,
      emailFailedAt,
      error: errorMessage,
    });

    return NextResponse.json({
      ok: true,
      submissionId: record.submissionId,
      message:
        "Your inquiry was received. Email delivery is pending review, but your submission was safely recorded.",
    });
  }
}
