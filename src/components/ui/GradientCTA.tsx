import Link from "next/link";

const DOT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E")`;

type GradientCTAProps = {
  id?: string;
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
  /** Short trust/note text below the CTA buttons. */
  note?: string;
  /** Which side the glow orb appears on. Defaults to right. */
  glowSide?: "left" | "right";
};

export function GradientCTA({
  id,
  heading,
  body,
  primaryCta,
  secondaryLink,
  note,
  glowSide = "right",
}: GradientCTAProps) {
  const glowClass =
    glowSide === "left"
      ? "pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl"
      : "pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#4A7DB5] opacity-10 blur-3xl";

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className="relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#1E3A5F] to-[#2B4C7E]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ backgroundImage: DOT_BG }}
      />
      <div className={glowClass} aria-hidden="true" />

      <div className="relative mx-auto max-w-content px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id={id ? `${id}-heading` : undefined}
            className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#94A3B8]">{body}</p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-[#0D1B2A] shadow-sm transition-colors hover:bg-[#F0F4F8]"
            >
              {primaryCta.label}
            </Link>
            {secondaryLink && (
              <Link
                href={secondaryLink.href}
                className="text-sm font-medium text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {secondaryLink.label}
              </Link>
            )}
          </div>

          {note && (
            <p className="mt-6 text-sm text-white/40">{note}</p>
          )}
        </div>
      </div>
    </section>
  );
}
