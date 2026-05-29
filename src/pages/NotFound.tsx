import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Cette page n'existe pas.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium uppercase tracking-wider text-primary-foreground hover:bg-[var(--primary-hover)]">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
