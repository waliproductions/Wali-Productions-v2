import { NarrativeBlock } from "@/components/ui/NarrativeBlock";

type PortfolioNarrativeProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "light" | "muted";
};

export function PortfolioNarrative({ id, eyebrow, heading, paragraphs, tone = "light" }: PortfolioNarrativeProps) {
  return (
    <NarrativeBlock
      id={id}
      eyebrow={eyebrow}
      heading={heading}
      paragraphs={paragraphs}
      tone={tone}
    />
  );
}
