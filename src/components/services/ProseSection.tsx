import { NarrativeBlock } from "@/components/ui/NarrativeBlock";

type ProseSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "light" | "muted";
};

export function ProseSection({ id, eyebrow, heading, paragraphs, tone = "light" }: ProseSectionProps) {
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
