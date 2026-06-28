#!/usr/bin/env node
"use strict";

/**
 * Admin password hash generator for Wali Productions.
 *
 * Usage:
 *   npm run admin:hash -- 'YourPasswordHere!'
 *
 * Generates a bcryptjs hash (cost 12) and immediately verifies it.
 * Prints the hash and exact env var instructions.
 * Never writes the plaintext password anywhere.
 */

const bcryptjs = require("bcryptjs");

const COST = 12;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log("Usage: npm run admin:hash -- '<password>'");
    console.log("Example: npm run admin:hash -- 'MyPassword123!'");
    process.exit(args.length === 0 ? 1 : 0);
  }

  const password = args[0];

  if (password.length < 8) {
    console.error("Error: password must be at least 8 characters.");
    process.exit(1);
  }

  console.log(`\nGenerating bcryptjs hash (cost factor ${COST})...`);

  const hash = await bcryptjs.hash(password, COST);
  const verified = await bcryptjs.compare(password, hash);

  if (!verified) {
    console.error("\nFATAL: Hash verification failed. Do not use this hash.");
    process.exit(1);
  }

  console.log("\n✓ Hash generated and verified successfully.\n");
  console.log("─".repeat(60));
  console.log("ADMIN_PASSWORD_HASH value:");
  console.log("");
  console.log(hash);
  console.log("");
  console.log("─".repeat(60));
  console.log("\nNext steps:");
  console.log("1. In Hostinger hPanel → Advanced → Node.js → Environment Variables");
  console.log("   Set ADMIN_PASSWORD_HASH to the value above (copy the full $2b$... string)");
  console.log("2. Ensure ADMIN_USERNAME is also set to your admin username.");
  console.log("3. Ensure SESSION_SECRET is set (generate with: openssl rand -base64 32)");
  console.log("4. Save and redeploy.\n");
}

main().catch((err) => {
  console.error("Unexpected error:", err.message);
  process.exit(1);
});
