import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Layers3,
  Palette,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import heroBg from "@/assets/hero-bg-light.jpg";

const projects = [
  {
    number: "01",
    name: "TraceIMEI-BJ",
    category: "Plateforme web · Sécurité mobile",
    description: "Une expérience digitale pensée pour faciliter la traçabilité et la vérification des téléphones au Bénin.",
    url: "https://traceimei-bj.vercel.app/",
    className: "from-emerald-950 via-emerald-900 to-slate-950",
    mark: "TRACE / IMEI",
    accent: "text-emerald-300",
  },
  {
    number: "02",
    name: "Aurore Capillaire",
    category: "E-commerce · Beauté",
    description: "Une boutique en ligne élégante dédiée aux soins capillaires et à la mise en valeur des produits.",
    url: "https://aurore-capillaire.vercel.app/",
    className: "from-amber-950 via-stone-900 to-neutral-950",
    mark: "AURORE",
    accent: "text-amber-200",
  },
  {
    number: "03",
    name: "EURISS GSM",
    category: "Site vitrine · Services tech",
    description: "Une présence digitale claire pour présenter les services de réparation et accompagner les clients.",
    url: "https://eurissgsm.vercel.app/",
    className: "from-blue-950 via-slate-900 to-neutral-950",
    mark: "EURISS GSM",
    accent: "text-sky-300",
  },
];

function Home() {
  const { t } = useI18n();

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.55, ease: "easeOut" as const },
    }),
  };

  const services = [
    {
      Icon: Palette,
      number: "01",
      title: "Identité visuelle & design",
      description: "Des univers de marque cohérents : logo, supports de communication, visuels et direction artistique.",
      tags: ["Branding", "Design graphique", "Supports print"],
    },
    {
      Icon: Code2,
      number: "02",
      title: "Sites web & plateformes",
      description: "Des expériences web modernes, rapides et adaptées aux objectifs de votre activité.",
      tags: ["Site vitrine", "E-commerce", "Plateforme web"],
    },
    {
      Icon: Smartphone,
      number: "03",
      title: "Solutions numériques",
      description: "Des outils digitaux utiles pour simplifier vos opérations et mieux servir vos utilisateurs.",
      tags: ["Applications", "Automatisation", "Accompagnement"],
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-40 -top-32 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute -left-40 top-64 h-[360px] w-[360px] rounded-full bg-primary/10 blur-[110px]" />
          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="container mx-auto grid min-h-[650px] items-center gap-14 px-4 py-20 sm:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:py-28">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Studio créatif & technologique · Bénin
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-[4.35rem]">
              Les bonnes idées méritent une{" "}
              <span className="text-gradient">présence digitale remarquable.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              EURISS TECH accompagne les marques et les entrepreneurs dans la création de leur identité,
              de leurs sites web et de leurs solutions numériques.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact">
                <Button size="lg" className="gradient-primary text-primary-foreground glow-primary">
                  Démarrer un projet <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-border bg-background/60">
                  Découvrir nos services <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border pt-6 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Design réfléchi</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Technologie utile</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Accompagnement humain</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="relative mx-auto w-full max-w-[600px]"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-slate-950 p-3 shadow-2xl">
              <div className="relative min-h-[410px] overflow-hidden rounded-[1.2rem] sm:min-h-[480px]">
                <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-slate-950/20 to-slate-950/95" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,197,94,0.22),transparent_42%)]" />

                <div className="relative flex min-h-[410px] flex-col justify-between p-6 text-white sm:min-h-[480px] sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.25em] text-white/70">EURISS TECH</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/80 backdrop-blur">Digital studio</span>
                  </div>

                  <div className="space-y-5">
                    <div className="ml-auto w-[82%] rounded-2xl border border-white/15 bg-white/10 p-4 shadow-xl backdrop-blur-xl sm:w-[78%]">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">01 / Design</span>
                        <Palette className="h-4 w-4 text-emerald-300" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-2/3 rounded-full bg-white/80" />
                        <div className="h-2 w-full rounded-full bg-white/20" />
                        <div className="h-2 w-4/5 rounded-full bg-white/20" />
                      </div>
                      <div className="mt-5 flex gap-2">
                        <div className="h-9 w-9 rounded-lg bg-emerald-400/80" />
                        <div className="h-9 w-9 rounded-lg bg-sky-300/80" />
                        <div className="h-9 w-9 rounded-lg bg-amber-200/80" />
                        <div className="flex-1 rounded-lg border border-white/15" />
                      </div>
                    </div>

                    <div className="w-[75%] rounded-2xl border border-white/15 bg-slate-900/75 p-4 shadow-xl backdrop-blur-xl sm:w-[70%]">
                      <div className="mb-3 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-emerald-300" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/55">02 / Development</span>
                      </div>
                      <div className="space-y-2 font-mono text-[10px] text-emerald-200/80">
                        <p><span className="text-violet-300">const</span> idea = <span className="text-amber-200">"your vision"</span>;</p>
                        <p><span className="text-violet-300">build</span>(idea);</p>
                        <p className="text-white/45">// Make it meaningful.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold tracking-tight sm:text-4xl">Ideas into</p>
                      <p className="text-3xl font-bold tracking-tight text-emerald-300 sm:text-4xl">experiences.</p>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                      <ArrowDownRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-xl border border-border bg-background/90 px-4 py-3 shadow-xl backdrop-blur sm:-left-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Notre approche</p>
              <p className="mt-1 text-sm font-semibold">Créativité + technologie</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO STRIP */}
      <section className="border-y border-border bg-surface/50">
        <div className="container mx-auto grid gap-5 px-4 py-8 sm:grid-cols-3 sm:gap-8">
          {[
            ["01", "Comprendre", "Vos besoins avant de concevoir."],
            ["02", "Concevoir", "Une réponse adaptée à vos objectifs."],
            ["03", "Faire évoluer", "Un accompagnement qui continue."],
          ].map(([number, title, description]) => (
            <div key={number} className="flex items-start gap-4">
              <span className="pt-1 text-xs font-bold tracking-widest text-primary">{number}</span>
              <div>
                <h2 className="font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto px-4 py-24 sm:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Ce que nous faisons</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{t("services.title")}</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{t("services.subtitle")}</p>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">
            Tous nos services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map(({ Icon, number, title, description, tags }, i) => (
            <motion.article
              key={number}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.18em] text-muted-foreground/60">{number}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-9 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-3 min-h-[76px] text-sm leading-7 text-muted-foreground">{description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{tag}</span>
                ))}
              </div>
              <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                En savoir plus <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-y border-border bg-surface/40 py-24 sm:py-28">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Sélection de projets</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Du concret. Des projets qui prennent vie.</h2>
              <p className="mt-4 leading-7 text-muted-foreground">Quelques réalisations qui illustrent notre manière de transformer une idée en expérience numérique.</p>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">
              En savoir plus sur le studio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, i) => (
              <motion.a
                key={project.number}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group block overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className={`relative flex h-64 flex-col justify-between overflow-hidden bg-gradient-to-br ${project.className} p-6 text-white`}>
                  <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute -right-2 top-10 h-36 w-36 rounded-full border border-white/10" />
                  <div className="relative flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-white/55">PROJECT / {project.number}</span>
                    <ArrowUpRight className="h-5 w-5 text-white/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <div className="relative">
                    <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${project.accent}`}>{project.category}</p>
                    <p className="text-3xl font-black tracking-tight sm:text-4xl">{project.mark}</p>
                    <div className="mt-4 h-px w-14 bg-white/40" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-muted-foreground">{project.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Visiter le projet <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIO VALUES */}
      <section className="container mx-auto px-4 py-24 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">L'esprit EURISS TECH</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">La technologie doit servir une idée. Pas la compliquer.</h2>
            <p className="mt-5 leading-8 text-muted-foreground">Nous privilégions les échanges simples, les choix techniques pertinents et les réalisations soignées. Chaque projet commence par l'écoute et se construit autour de vos priorités.</p>
            <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Découvrir notre démarche <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <Layers3 className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-bold">Une vision globale</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Du premier croquis à la mise en ligne, chaque détail compte.</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-7 sm:translate-y-8">
              <Code2 className="h-6 w-6 text-primary" />
              <h3 className="mt-5 font-bold">Des choix utiles</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Des solutions pensées pour répondre à un vrai besoin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24 sm:pb-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-slate-950 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-primary/25 blur-[100px]" />
          <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-sky-500/15 blur-[100px]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Votre prochain projet commence ici</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Parlons de ce que vous voulez construire.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/65">Présentez-nous votre idée. Nous prendrons le temps de comprendre votre besoin et de vous proposer la bonne direction.</p>
            <Link to="/contact" className="mt-8 inline-flex">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-white/90">
                Parler de mon projet <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
