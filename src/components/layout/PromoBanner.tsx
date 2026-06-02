export function PromoBanner() {
  const items = [
    "Eurisstech · Studio créatif & tech",
    "Basés à Calavi, au service de toute l'Afrique",
    "+229 01 41 67 57 84",
    "Branding · Web · Mobile · Conseil",
    "Devis gratuit sous 24h",
    "fanoueuriss@gmail.com",
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
