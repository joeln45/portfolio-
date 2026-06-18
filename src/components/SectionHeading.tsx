import Reveal from "@/components/Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-sm tracking-widest text-accent-soft">
        <span className="text-muted">{index}</span> / {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}
