import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Smartphone, Laptop, Wrench, ShieldCheck, Zap, BadgeCheck, Users, Tags, Headphones,
  Sparkles, Smile, BatteryCharging, Plug, Camera, Volume2, Mic, Power, Droplets,
  Stethoscope, MonitorSmartphone, HardDrive, MemoryStick, Brush, Keyboard, Bug,
  Settings, Gauge, DatabaseBackup, Download, RefreshCw, Unlock, Apple, AppWindow,
  Cable, Headphones as Earbuds, Shield, Battery, Usb, Mouse, ArrowRight, MessageCircle,
  Search, FileText, CheckCircle2, PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";
import heroImg from "@/assets/services/hero-repair.jpg";
import phoneImg from "@/assets/services/phone-repair.jpg";
import laptopImg from "@/assets/services/laptop-repair.jpg";

const WHATSAPP = "https://wa.me/2290141675784";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type Item = { icon: React.ElementType; title: string; text?: string };

function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </Reveal>
  );
}

function CardGrid({ items, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { items: Item[]; cols?: string }) {
  return (
    <div className={`mt-10 grid gap-4 ${cols}`}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={Math.min(i * 0.04, 0.3)}>
          <div className="group h-full rounded-xl border border-border bg-card/60 p-5 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
            <span className="inline-grid h-10 w-10 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <it.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-semibold">{it.title}</h3>
            {it.text && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.text}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

const PHONE_SERVICES: Item[] = [
  { icon: MonitorSmartphone, title: "Remplacement d'écran", text: "Écrans AMOLED, OLED et LCD avec une finition professionnelle." },
  { icon: BatteryCharging, title: "Remplacement de batterie", text: "Batteries de qualité avec contrôle de performance." },
  { icon: Plug, title: "Connecteur de charge", text: "Réparation USB-C, Lightning et Micro-USB." },
  { icon: Camera, title: "Caméra", text: "Réparation ou remplacement caméra avant et arrière." },
  { icon: Volume2, title: "Haut-parleur", text: "Correction des problèmes audio." },
  { icon: Mic, title: "Micro", text: "Réparation du microphone." },
  { icon: Power, title: "Boutons Power / Volume", text: "Réparation ou remplacement." },
  { icon: Droplets, title: "Désoxydation", text: "Nettoyage après infiltration d'eau." },
  { icon: Stethoscope, title: "Diagnostic complet", text: "Analyse rapide avant intervention." },
];

const PC_SERVICES: Item[] = [
  { icon: AppWindow, title: "Installation Windows" },
  { icon: RefreshCw, title: "Réinstallation système" },
  { icon: HardDrive, title: "Changement SSD" },
  { icon: MemoryStick, title: "Changement RAM" },
  { icon: Brush, title: "Nettoyage complet" },
  { icon: Laptop, title: "Changement écran" },
  { icon: Keyboard, title: "Changement clavier" },
  { icon: Battery, title: "Changement batterie" },
  { icon: Bug, title: "Suppression de virus" },
  { icon: Wrench, title: "Maintenance informatique" },
  { icon: Gauge, title: "Optimisation des performances" },
  { icon: DatabaseBackup, title: "Sauvegarde des données" },
];

const SOFTWARE: Item[] = [
  { icon: Smartphone, title: "Flash Android" },
  { icon: Apple, title: "Mise à jour iPhone" },
  { icon: Unlock, title: "Déblocage logiciel" },
  { icon: Download, title: "Installation de logiciels" },
  { icon: Settings, title: "Configuration Windows" },
  { icon: AppWindow, title: "Configuration Mac" },
  { icon: DatabaseBackup, title: "Sauvegarde" },
  { icon: HardDrive, title: "Récupération de données" },
  { icon: Gauge, title: "Optimisation système" },
];

const ACCESSORIES: Item[] = [
  { icon: Plug, title: "Chargeurs" },
  { icon: Cable, title: "Câbles" },
  { icon: Earbuds, title: "Écouteurs" },
  { icon: Smartphone, title: "Coques" },
  { icon: Shield, title: "Verres trempés" },
  { icon: BatteryCharging, title: "Power Bank" },
  { icon: HardDrive, title: "SSD" },
  { icon: Usb, title: "Clés USB" },
  { icon: Mouse, title: "Souris" },
  { icon: Keyboard, title: "Claviers" },
];

const WHY: Item[] = [
  { icon: Stethoscope, title: "Diagnostic gratuit" },
  { icon: Zap, title: "Réparation express" },
  { icon: BadgeCheck, title: "Pièces de qualité" },
  { icon: ShieldCheck, title: "Garantie après réparation" },
  { icon: Users, title: "Techniciens qualifiés" },
  { icon: Tags, title: "Prix transparents" },
  { icon: Headphones, title: "Assistance rapide" },
  { icon: Sparkles, title: "Service professionnel" },
  { icon: Smile, title: "Satisfaction client" },
];

const PROCESS = [
  { icon: Search, title: "Diagnostic", text: "Inspection complète de l'appareil." },
  { icon: FileText, title: "Devis", text: "Prix communiqué avant toute réparation." },
  { icon: Wrench, title: "Réparation", text: "Intervention réalisée par un technicien qualifié." },
  { icon: CheckCircle2, title: "Tests", text: "Tous les composants sont vérifiés." },
  { icon: PackageCheck, title: "Livraison", text: "L'appareil est remis prêt à être utilisé." },
];

const PHONE_BRANDS = ["Apple", "Samsung", "Xiaomi", "Oppo", "Tecno", "Infinix", "Itel", "Huawei", "Google Pixel", "Nokia"];
const PC_BRANDS = ["HP", "Dell", "Lenovo", "Asus", "Acer", "MSI", "Apple", "Toshiba"];

const FAQ = [
  { q: "Combien coûte une réparation ?", a: "Le tarif dépend de l'appareil et de la panne. Le diagnostic est gratuit et un devis clair vous est communiqué avant toute intervention — aucune surprise." },
  { q: "Combien de temps dure une réparation ?", a: "La plupart des réparations courantes (écran, batterie, connecteur de charge) sont réalisées en 30 minutes à 2 heures. Les cas complexes sont traités sous 24 à 72 heures." },
  { q: "Les données sont-elles conservées ?", a: "Oui, nous préservons vos données dans la mesure du possible. Une sauvegarde est proposée avant toute intervention logicielle à risque." },
  { q: "Offrez-vous une garantie ?", a: "Chaque réparation est couverte par une garantie sur la pièce remplacée et la main-d'œuvre. La durée vous est précisée sur votre reçu." },
  { q: "Travaillez-vous sans rendez-vous ?", a: "Oui, vous pouvez passer directement à notre atelier de Calavi. Un rendez-vous vous garantit toutefois une prise en charge immédiate." },
  { q: "Quels appareils réparez-vous ?", a: "Smartphones Android et iPhone, tablettes, ordinateurs portables et de bureau, ainsi que la plupart des équipements numériques du quotidien." },
  { q: "Acceptez-vous les entreprises ?", a: "Oui. Nous proposons des contrats de maintenance informatique pour les entreprises, écoles et administrations, avec interventions planifiées." },
];

export default function Services() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Eurisstech",
    description:
      "Réparation de smartphones et d'ordinateurs, maintenance informatique et vente d'accessoires à Calavi, Bénin.",
    address: { "@type": "PostalAddress", addressLocality: "Calavi", addressCountry: "BJ" },
    telephone: "+229 01 41 67 57 84",
    email: "fanoueuriss@gmail.com",
    makesOffer: [...PHONE_SERVICES, ...PC_SERVICES, ...SOFTWARE].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
    })),
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };

  return (
    <div>
      <Seo
        title="Réparation smartphone & ordinateur à Calavi — Eurisstech"
        description="Réparation téléphone, iPhone, Samsung, Android et ordinateur portable à Calavi : changement d'écran, batterie, connecteur de charge, dépannage informatique et maintenance. Diagnostic gratuit, réparation garantie."
        path="/services"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 gradient-radial-primary" aria-hidden="true" />
        <div className="container-tight grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" /> Réparation & maintenance
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Nos <span className="text-primary">Services</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Des solutions professionnelles pour la réparation, la maintenance et l'assistance
              informatique. Nous réparons smartphones, ordinateurs et équipements numériques avec
              rapidité, précision et garantie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Contacter sur WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/25 via-transparent to-primary/10 blur-2xl" aria-hidden="true" />
            <img
              src={heroImg}
              alt="Technicien Eurisstech réparant un smartphone à côté d'un ordinateur portable et d'outils de précision"
              width={1200}
              height={912}
              decoding="async"
              className="w-full rounded-2xl border border-border object-cover shadow-elegant"
            />
          </motion.div>
        </div>
      </section>

      {/* Smartphones */}
      <section className="container-tight py-20">
        <SectionHeader
          eyebrow="Section 01"
          title="Réparation de smartphones"
          text="iPhone, Samsung, Xiaomi, Tecno, Infinix… toutes les pannes courantes traitées en atelier."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <Reveal>
            <img
              src={phoneImg}
              alt="Remplacement de batterie et d'écran sur un smartphone démonté"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-border object-cover shadow-card lg:sticky lg:top-24"
            />
          </Reveal>
          <CardGrid items={PHONE_SERVICES} cols="sm:grid-cols-2" />
        </div>
      </section>

      {/* Ordinateurs */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Section 02"
            title="Réparation d'ordinateurs"
            text="Portables et fixes : matériel, système et performance remis à niveau."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <CardGrid items={PC_SERVICES} cols="sm:grid-cols-2" />
            <Reveal>
              <img
                src={laptopImg}
                alt="Ordinateur portable démonté avec SSD et barrettes de RAM lors d'une maintenance"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl border border-border object-cover shadow-card lg:sticky lg:top-24"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Déblocage & logiciel */}
      <section className="container-tight py-20">
        <SectionHeader eyebrow="Section 03" title="Déblocage & logiciel" text="Systèmes, mises à jour et récupération de données en toute sécurité." />
        <CardGrid items={SOFTWARE} />
      </section>

      {/* Accessoires */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container-tight">
          <SectionHeader eyebrow="Section 04" title="Vente d'accessoires" text="Des accessoires testés et garantis, disponibles en boutique à Calavi." />
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {ACCESSORIES.map((a, i) => (
              <Reveal key={a.title} delay={Math.min(i * 0.04, 0.3)}>
                <div className="group flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card/60 p-6 text-center shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <a.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{a.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="container-tight py-20">
        <SectionHeader eyebrow="Section 05" title="Pourquoi choisir Eurisstech ?" text="Un service d'atelier exigeant, transparent et garanti." />
        <CardGrid items={WHY} />
      </section>

      {/* Processus */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container-tight">
          <SectionHeader eyebrow="Section 06" title="Notre processus" text="Cinq étapes claires, du dépôt à la remise de votre appareil." />
          <ol className="relative mx-auto mt-12 max-w-2xl border-l border-border pl-8">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="relative pb-10 last:pb-0">
                <Reveal delay={i * 0.08}>
                  <span className="absolute -left-[3.05rem] grid h-9 w-9 place-items-center rounded-full border border-primary/40 bg-background text-primary shadow-card">
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="rounded-xl border border-border bg-card/60 p-5 shadow-card backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Étape {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Marques */}
      <section className="container-tight py-20">
        <SectionHeader eyebrow="Section 07" title="Marques prises en charge" text="Une expertise multi-marques, sur smartphones comme sur ordinateurs." />
        <div className="mt-10 space-y-8">
          {[
            { label: "Smartphones", icon: Smartphone, brands: PHONE_BRANDS },
            { label: "Ordinateurs", icon: Laptop, brands: PC_BRANDS },
          ].map((group) => (
            <Reveal key={group.label}>
              <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-card backdrop-blur">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  <group.icon className="h-4 w-4 text-primary" aria-hidden="true" /> {group.label}
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {group.brands.map((b) => (
                    <li
                      key={`${group.label}-${b}`}
                      className="grid place-items-center rounded-lg border border-border bg-background px-3 py-4 text-sm font-semibold tracking-wide transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container-tight">
          <SectionHeader eyebrow="Section 08" title="Questions fréquentes" text="Tout ce qu'il faut savoir avant de nous confier votre appareil." />
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-tight py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border p-10 text-center shadow-elegant sm:p-16">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-background" aria-hidden="true" />
            <div className="absolute inset-0 -z-10 gradient-radial-primary" aria-hidden="true" />
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Votre appareil mérite une seconde vie.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Confiez votre smartphone ou votre ordinateur à Eurisstech pour une réparation rapide,
              fiable et garantie par des techniciens qualifiés.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Demander un devis <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Contacter sur WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
