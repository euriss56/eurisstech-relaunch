import { Link } from "react-router-dom";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-1.5">
      <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
        Eurisstech
      </span>
      <span
        aria-hidden
        className="mb-0.5 inline-block h-1.5 w-1.5 rounded-full bg-primary transition-transform group-hover:scale-125"
      />
      {!compact && (
        <span className="sr-only">Eurisstech — Innovating the Digital Future</span>
      )}
    </Link>
  );
}
