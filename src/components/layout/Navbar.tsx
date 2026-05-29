import { Link } from "@tanstack/react-router";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { t } = useI18n();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/shop", label: t("nav.shop") },
    { to: "/about", label: t("nav.about") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-strong">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground [&.active]:text-foreground"
              activeProps={{ className: "active" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <Link to="/account" aria-label={t("nav.account")}>
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground" aria-label={t("nav.account")}>
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full gradient-primary px-1 text-[10px] font-bold text-primary-foreground shadow-card">
                {count}
              </span>
            )}
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground [&.active]:text-foreground"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
