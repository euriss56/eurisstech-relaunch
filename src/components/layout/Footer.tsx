import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-border bg-surface/40">
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">{t("footer.links")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">{t("nav.shop")}</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">{t("nav.blog")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">{t("footer.legal")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">{t("footer.privacy")}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{t("footer.terms")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© 2025 F.MotivTech. {t("footer.rights")}</p>
          <p>Cotonou, Bénin · +229 01 46 37 99 89</p>
        </div>
      </div>
    </footer>
  );
}
