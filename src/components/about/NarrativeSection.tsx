import { NarrativeBlock } from "@/components/ui/NarrativeBlock";

type NarrativeSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "light" | "muted";
};

export function NarrativeSection({ id, eyebrow, heading, paragraphs, tone = "light" }: NarrativeSectionProps) {
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
