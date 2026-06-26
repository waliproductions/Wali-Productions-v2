const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const now = new Date();
const submissionId = crypto.randomUUID();

const queueDir = path.join(
  process.cwd(),
  "app-data",
  "contact-submissions",
  "queue"
);

fs.mkdirSync(queueDir, { recursive: true });

const filename = `contact-${now.toISOString().replace(/[:.]/g, "-")}-${submissionId}.json`;
const filePath = path.join(queueDir, filename);

const submission = {
  submissionId,
  submittedAt: now.toISOString(),
  lifecycleStatus: "received",
  emailDeliveryStatus: "pending",
  source: "terminal-test",
  formVersion: "contact-v1",
  requester: {
    name: "Test User",
    email: "test@example.com",
    phone: "555-555-5555"
  },
  inquiry: {
    service: "Website Development",
    message: "This is only a lifecycle queue logging test."
  },
  processing: {
    receivedAt: now.toISOString(),
    emailAttemptedAt: null,
    emailSentAt: null,
    emailFailedAt: null,
    archivedAt: null,
    error: null
  }
};

fs.writeFileSync(filePath, JSON.stringify(submission, null, 2), {
  encoding: "utf8",
  flag: "wx"
});

console.log("Saved to queue:");
console.log(filePath);
