import { NarrativeBlock } from "@/components/ui/NarrativeBlock";

type GovNarrativeProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "light" | "muted";
};

export function GovNarrative({ id, eyebrow, heading, paragraphs, tone = "light" }: GovNarrativeProps) {
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
