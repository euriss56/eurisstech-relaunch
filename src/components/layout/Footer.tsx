import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n";

const SERVICES = [
  "Identité visuelle & logo",
  "Sites web sur mesure",
  "Applications mobiles",
  "E-commerce & catalogues",
  "Design print & packaging",
  "Motion & contenus vidéo",
  "Conseil & stratégie digitale",
  "Maintenance & hébergement",
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-tight grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Eurisstech — Studio créatif & technologique. Nous donnons une voix visuelle aux marques
            africaines ambitieuses, du premier logo jusqu'au produit digital final.
          </p>
          <ul className="mt-6 space-y-1.5 text-sm text-muted-foreground">
            <li>📍 Calavi, Bénin</li>
            <li>📧 <a className="hover:text-foreground" href="mailto:fanoueuriss@gmail.com">fanoueuriss@gmail.com</a></li>
            <li>📞 <a className="hover:text-foreground" href="tel:+22901416757 84">+229 01 41 67 57 84</a></li>
          </ul>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Github, href: "#", label: "GitHub" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {SERVICES.map((s) => (
              <li key={s}><Link to="/shop" className="hover:text-foreground">{s}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">{t("footer.links")}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/shop" className="hover:text-foreground">{t("nav.shop")}</Link></li>
            <li><Link to="/blog" className="hover:text-foreground">{t("nav.blog")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Légal</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">{t("footer.privacy")}</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">{t("footer.terms")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-tight flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Eurisstech. {t("footer.rights")}</p>
          <p className="uppercase tracking-widest">Pensé, dessiné et codé à Calavi, Bénin</p>
        </div>
      </div>
    </footer>
  );
}
