/**
 * Configuration Validation Framework.
 *
 * Validates environment variables and system configuration at runtime without
 * exposing secret values. Returns structured health results suitable for display
 * in the admin health dashboard and system settings.
 *
 * Rules:
 * - Never return the value of any secret variable.
 * - Only report Configured / Missing / Invalid / Warning.
 * - All checks are synchronous (filesystem checks are handled separately).
 */

export type ConfigStatus = "configured" | "missing" | "invalid" | "warning";

export type ConfigCheck = {
  key: string;
  label: string;
  status: ConfigStatus;
  message: string;
  guidance?: string;
};

export type ConfigGroup = {
  id: string;
  label: string;
  description: string;
  checks: ConfigCheck[];
  healthy: boolean;
  critical: boolean;
};

export type PlatformHealth = {
  groups: ConfigGroup[];
  healthy: boolean;
  criticalCount: number;
  warningCount: number;
  configuredCount: number;
  totalChecks: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEnv(key: string): string | undefined {
  const val = process.env[key];
  return val && val.trim().length > 0 ? val.trim() : undefined;
}

function hasEnv(key: string): boolean {
  return Boolean(getEnv(key));
}

function envLength(key: string): number {
  return getEnv(key)?.length ?? 0;
}

function envStartsWith(key: string, prefix: string): boolean {
  return getEnv(key)?.startsWith(prefix) ?? false;
}

function check(
  key: string,
  label: string,
  validate: () => { status: ConfigStatus; message: string; guidance?: string }
): ConfigCheck {
  const result = validate();
  return { key, label, ...result };
}

function group(
  id: string,
  label: string,
  description: string,
  checks: ConfigCheck[],
  options?: { critical?: boolean }
): ConfigGroup {
  const healthy = checks.every((c) => c.status === "configured");
  return {
    id,
    label,
    description,
    checks,
    healthy,
    critical: options?.critical ?? false,
  };
}

// ─── Auth Checks ──────────────────────────────────────────────────────────────

function checkAuth(): ConfigGroup {
  const checks: ConfigCheck[] = [
    check("SESSION_SECRET", "Session Secret", () => {
      if (!hasEnv("SESSION_SECRET")) {
        return {
          status: "missing",
          message: "SESSION_SECRET is not configured.",
          guidance: 'Generate with: openssl rand -base64 32',
        };
      }
      const len = envLength("SESSION_SECRET");
      if (len < 32) {
        return {
          status: "invalid",
          message: `SESSION_SECRET is too short (${len} chars — minimum 32 required).`,
          guidance: 'Regenerate with: openssl rand -base64 32',
        };
      }
      return { status: "configured", message: `Session secret configured (${len} chars).` };
    }),

    check("ADMIN_USERNAME", "Admin Username", () => {
      if (!hasEnv("ADMIN_USERNAME")) {
        return {
          status: "missing",
          message: "ADMIN_USERNAME is not configured.",
          guidance: "Set ADMIN_USERNAME to your admin login name.",
        };
      }
      return { status: "configured", message: "Admin username configured." };
    }),

    check("ADMIN_PASSWORD_HASH", "Admin Password Hash", () => {
      if (!hasEnv("ADMIN_PASSWORD_HASH")) {
        return {
          status: "missing",
          message: "ADMIN_PASSWORD_HASH is not configured.",
          guidance:
            "Generate with: node -e \"require('bcryptjs').hash('yourpassword', 12).then(console.log)\"",
        };
      }
      const isBcrypt =
        envStartsWith("ADMIN_PASSWORD_HASH", "$2a$") ||
        envStartsWith("ADMIN_PASSWORD_HASH", "$2b$") ||
        envStartsWith("ADMIN_PASSWORD_HASH", "$2y$");
      if (!isBcrypt) {
        return {
          status: "invalid",
          message: "ADMIN_PASSWORD_HASH does not look like a valid bcryptjs hash.",
          guidance:
            "Hash must start with $2a$, $2b$, or $2y$. Regenerate it with bcryptjs.",
        };
      }
      return { status: "configured", message: "bcryptjs hash detected and valid." };
    }),
  ];

  return group("auth", "Authentication", "Admin portal login and session encryption", checks, {
    critical: true,
  });
}

// ─── SMTP Checks ─────────────────────────────────────────────────────────────

function checkSmtp(): ConfigGroup {
  const SMTP_VARS = [
    { key: "SMTP_HOST", label: "SMTP Host" },
    { key: "SMTP_PORT", label: "SMTP Port" },
    { key: "SMTP_USER", label: "SMTP Username" },
    { key: "SMTP_PASS", label: "SMTP Password" },
    { key: "CONTACT_TO_EMAIL", label: "Contact Recipient Email" },
    { key: "CONTACT_FROM_EMAIL", label: "Contact From Email" },
  ] as const;

  const checks: ConfigCheck[] = SMTP_VARS.map(({ key, label }) =>
    check(key, label, () => {
      if (!hasEnv(key)) {
        return {
          status: "missing",
          message: `${key} is not configured.`,
          guidance: "Set this variable to enable email delivery.",
        };
      }
      // Validate port is numeric
      if (key === "SMTP_PORT") {
        const port = parseInt(getEnv(key) ?? "", 10);
        if (isNaN(port) || port < 1 || port > 65535) {
          return {
            status: "invalid",
            message: "SMTP_PORT must be a valid port number (1–65535).",
          };
        }
      }
      return { status: "configured", message: `${label} configured.` };
    })
  );

  return group("smtp", "Email & SMTP", "Contact form email delivery configuration", checks);
}

// ─── Site Config Checks ───────────────────────────────────────────────────────

function checkSite(): ConfigGroup {
  const checks: ConfigCheck[] = [
    check("NEXT_PUBLIC_SITE_URL", "Public Site URL", () => {
      if (!hasEnv("NEXT_PUBLIC_SITE_URL")) {
        return {
          status: "warning",
          message: "NEXT_PUBLIC_SITE_URL is not set.",
          guidance:
            "Set to https://waliproductions.com for correct SEO metadata, OG URLs, and canonical links.",
        };
      }
      const url = getEnv("NEXT_PUBLIC_SITE_URL") ?? "";
      if (!url.startsWith("https://") && !url.startsWith("http://")) {
        return {
          status: "invalid",
          message: "NEXT_PUBLIC_SITE_URL must start with http:// or https://.",
        };
      }
      return { status: "configured", message: `Site URL configured: ${url}` };
    }),

    check("NODE_ENV", "Node Environment", () => {
      const env = process.env.NODE_ENV;
      if (env !== "production") {
        return {
          status: "warning",
          message: `NODE_ENV is '${env ?? "unset"}' — expected 'production' for deployment.`,
          guidance: "This is set automatically by the hosting environment.",
        };
      }
      return { status: "configured", message: "NODE_ENV=production." };
    }),
  ];

  return group("site", "Site Configuration", "Public site URL and environment settings", checks);
}

// ─── Runtime Checks ───────────────────────────────────────────────────────────

function checkRuntime(): ConfigGroup {
  const nodeVersion = process.versions.node;
  const [major] = nodeVersion.split(".").map(Number);

  const checks: ConfigCheck[] = [
    check("NODE_VERSION", "Node.js Version", () => {
      if (major < 20) {
        return {
          status: "warning",
          message: `Node.js ${nodeVersion} detected — recommend Node.js 20+.`,
          guidance: "Upgrade to Node.js 20 LTS for full Next.js 16 support.",
        };
      }
      return { status: "configured", message: `Node.js ${nodeVersion} (supported).` };
    }),
  ];

  return group("runtime", "Runtime Environment", "Node.js runtime and platform information", checks);
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function validatePlatformConfig(): PlatformHealth {
  const groups = [checkAuth(), checkSmtp(), checkSite(), checkRuntime()];

  const allChecks = groups.flatMap((g) => g.checks);
  const criticalCount = allChecks.filter(
    (c) => c.status === "missing" || c.status === "invalid"
  ).length;
  const warningCount = allChecks.filter((c) => c.status === "warning").length;
  const configuredCount = allChecks.filter((c) => c.status === "configured").length;

  return {
    groups,
    healthy: criticalCount === 0,
    criticalCount,
    warningCount,
    configuredCount,
    totalChecks: allChecks.length,
  };
}

export function getAuthHealth(): ConfigGroup {
  return checkAuth();
}

export function getSmtpHealth(): ConfigGroup {
  return checkSmtp();
}
