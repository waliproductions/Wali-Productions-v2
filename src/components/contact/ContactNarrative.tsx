import { NarrativeBlock } from "@/components/ui/NarrativeBlock";

type ContactNarrativeProps = {
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  tone?: "light" | "muted";
};

export function ContactNarrative({ id, eyebrow, heading, paragraphs, tone = "light" }: ContactNarrativeProps) {
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
