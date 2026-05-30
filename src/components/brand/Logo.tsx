import { Link } from "react-router-dom";
import logo from "@/assets/eurisstech-logo.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2">
      <img
        src={logo}
        alt="Eurisstech"
        className="h-9 w-9 object-contain transition-transform group-hover:scale-105 sm:h-10 sm:w-10"
      />
      {!compact && (
        <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          Eurisstech
        </span>
      )}
      <span className="sr-only">Eurisstech — Innovating the Digital Future</span>
    </Link>
  );
}
