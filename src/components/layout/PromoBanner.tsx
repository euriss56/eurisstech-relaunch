export function PromoBanner() {
  const items = [
    "Innovating the Digital Future",
    "Calavi · Bénin",
    "+229 01 41 67 57 84",
    "Développement Web · Mobile · IA",
    "Cybersécurité · Cloud · UI/UX",
    "contact@eurisstech.com",
  ];

  return (
    <div className="relative z-50 w-full overflow-hidden bg-primary text-primary-foreground">
      <div className="flex animate-marquee whitespace-nowrap py-1.5">
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <span
            key={i}
            className="mx-8 text-[11px] font-medium uppercase tracking-[0.2em]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
