import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2">
      <img
        src={logo}
        alt="F.MotivTech"
        className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
      />
      {!compact && (
        <span className="text-base font-bold tracking-tight text-foreground">
          F.<span className="text-primary">MotivTech</span>
        </span>
      )}
    </Link>
  );
}
