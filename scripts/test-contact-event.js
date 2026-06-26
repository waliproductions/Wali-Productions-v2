const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const event = {
  eventId: crypto.randomUUID(),
  timestamp: new Date().toISOString(),
  submissionId: crypto.randomUUID(),
  event: "received",
  actor: "system",
  source: "terminal-test",
  details: {
    lifecycleStatus: "received",
    emailDeliveryStatus: "pending"
  }
};

const logFile = path.join(
  process.cwd(),
  "app-data",
  "contact-submissions",
  "logs",
  "events.jsonl"
);

fs.appendFileSync(
  logFile,
  JSON.stringify(event) + "\n",
  "utf8"
);

console.log("Appended event:");
console.log(event);
