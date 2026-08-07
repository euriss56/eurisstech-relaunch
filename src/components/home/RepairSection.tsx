import { Link } from "react-router-dom";
import { Smartphone, BatteryCharging, Droplets, Laptop, HardDrive, ShieldCheck } from "lucide-react";

const ITEMS = [
  { Icon: Smartphone, title: "Écrans smartphone", desc: "Vitre ou dalle cassée remplacée avec pièces testées." },
  { Icon: BatteryCharging, title: "Batteries & charge", desc: "Autonomie faible, connecteur ou charge instable." },
  { Icon: Droplets, title: "Dégât des eaux", desc: "Nettoyage carte, séchage et remise en service." },
  { Icon: Laptop, title: "Diagnostic PC", desc: "Panne matérielle identifiée avant toute intervention." },
  { Icon: HardDrive, title: "Composants & stockage", desc: "RAM, SSD, clavier, ventilation : remplacement ciblé." },
  { Icon: ShieldCheck, title: "Système & optimisation", desc: "Formatage, réinstallation, nettoyage et sauvegarde." },
];

export function RepairSection() {
  return (
    <section className="container mx-auto px-4 pb-16 pt-4">
      <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Service complémentaire
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">Réparation &amp; Maintenance</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Au-delà du design et du web, notre équipe garde vos téléphones et ordinateurs opérationnels
            pour que votre activité ne s'arrête jamais.
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(({ Icon, title, desc }) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-elevated text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="grid gap-1 text-xs text-muted-foreground sm:grid-cols-3 sm:gap-x-6">
            <li>Interventions réalisées en interne, sans sous-traitance</li>
            <li>Diagnostic transparent avant tout travaux — tarif sur devis</li>
            <li>Garantie sur l'intervention · délai indicatif 24 à 72 h</li>
          </ul>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Demander un diagnostic
          </Link>
        </div>
      </div>
    </section>
  );
}
