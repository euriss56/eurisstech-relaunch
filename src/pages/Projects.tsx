import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  FolderOpen,
  Globe2,
  LayoutDashboard,
  Search,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

type ProjectCategory = "Plateforme" | "Application" | "E-commerce" | "Site vitrine";

const projects: {
  number: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  url: string;
  image: string;
  mark: string;
  tags: string[];
}[] = [
  {
    number: "01",
    name: "TraceIMEI-BJ",
    category: "Plateforme",
    categoryLabel: "Plateforme web · Sécurité mobile",
    description:
      "Une plateforme dédiée à la traçabilité et à la vérification des téléphones au Bénin.",
    url: "https://traceimei-bj.vercel.app/",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://traceimei-bj.vercel.app/",
    mark: "TRACEIMEI-BJ",
    tags: ["Sécurité mobile", "Traçabilité", "Web"],
  },
  {
    number: "02",
    name: "Aurore Capillaire",
    category: "E-commerce",
    categoryLabel: "Boutique en ligne · Beauté",
    description:
      "Une boutique en ligne consacrée aux soins capillaires, avec une présentation dédiée aux produits de la marque.",
    url: "https://aurore-capillaire.vercel.app/",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://aurore-capillaire.vercel.app/",
    mark: "AURORE",
    tags: ["Boutique en ligne", "Soins capillaires", "E-commerce"],
  },
  {
    number: "03",
    name: "EURISS GSM",
    category: "Site vitrine",
    categoryLabel: "Site vitrine · Services informatiques",
    description:
      "Un site professionnel pour présenter les services de réparation de téléphones et d'ordinateurs.",
    url: "https://eurissgsm.vercel.app/",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://eurissgsm.vercel.app/",
    mark: "EURISS GSM",
    tags: ["Réparation", "Téléphones", "Ordinateurs"],
  },
  {
    number: "04",
    name: "OCD LIVE",
    category: "Plateforme",
    categoryLabel: "Plateforme web · Réservation",
    description:
      "Une plateforme digitale conçue pour présenter des offres et faciliter le parcours de réservation.",
    url: "https://ocd-live-eight.vercel.app/",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://ocd-live-eight.vercel.app/",
    mark: "OCD LIVE",
    tags: ["Réservation", "Offres", "Expérience utilisateur"],
  },
  {
    number: "05",
    name: "SCHOOL MANAGER BJ",
    category: "Application",
    categoryLabel: "Application web · Gestion scolaire",
    description:
      "Une application web dédiée à la gestion scolaire et à la centralisation des informations d'un établissement.",
    url: "https://school-manager-bj.vercel.app/",
    image: "https://image.thum.io/get/width/1400/crop/900/noanimate/https://school-manager-bj.vercel.app/",
    mark: "SCHOOL MANAGER",
    tags: ["Gestion scolaire", "Administration", "Éducation"],
  },
];

const filters = ["Tous", "Plateforme", "Application", "E-commerce", "Site vitrine"] as const;

const categoryIcon = {
  Plateforme: Globe2,
  Application: LayoutDashboard,
  "E-commerce": ShoppingBag,
  "Site vitrine": FolderOpen,
};

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = categoryIcon[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/50 hover:shadow-elegant"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ouvrir le projet ${project.name} dans un nouvel onglet`}
        className="relative block overflow-hidden bg-[#0A0F1C] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          {!imageFailed && (
            <img
              src={project.image}
              alt={`Capture du site ${project.name}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              onError={() => setImageFailed(true)}
            />
          )}
          {imageFailed && (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_rgba(0,123,255,0.28),_transparent_55%),linear-gradient(135deg,#0A0F1C,#111827)]">
              <div className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#007BFF]/40 bg-[#007BFF]/15 text-[#58A6FF]">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-4 text-lg font-black tracking-widest text-white">{project.mark}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/45">EURISS TECH · PROJECT {project.number}</p>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/75 via-transparent to-[#0A0F1C]/10 opacity-80" />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#0A0F1C]/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            Projet {project.number}
          </span>
          <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#0A0F1C]/70 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary">
            <ArrowUpRight className="h-5 w-5" />
          </span>
          <span className="absolute bottom-5 left-5 rounded-full bg-[#007BFF] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            {project.category}
          </span>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          {project.categoryLabel}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-foreground">
          {project.name}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex w-fit items-center gap-2 border-b border-primary/40 pb-1 text-sm font-bold text-primary transition-all hover:gap-3 hover:border-primary"
        >
          Visiter le projet <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Tous");
  const filteredProjects = useMemo(
    () =>
      activeFilter === "Tous"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  return (
    <div className="overflow-hidden">
      <Seo
        title="Nos projets & réalisations — EURISS TECH"
        description="Découvrez les réalisations EURISS TECH : plateformes web, applications, e-commerce et sites professionnels."
        path="/projets"
      />

      {/* Portfolio hero */}
      <section className="relative isolate overflow-hidden border-b border-border bg-[#0A0F1C] text-white">
        <div className="pointer-events-none absolute -right-32 -top-36 h-[28rem] w-[28rem] rounded-full bg-[#007BFF]/20 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-44 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#007BFF]/10 blur-[110px]" />
        <div className="container-tight relative py-20 text-center sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#007BFF]/40 bg-[#007BFF]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#58A6FF]">
              <FolderOpen className="h-3.5 w-3.5" /> Portfolio EURISS TECH
            </span>
            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Des idées qui deviennent des{" "}
              <span className="text-[#58A6FF]">réalisations.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Découvrez une sélection de projets numériques conçus pour répondre
              à des besoins concrets. Chaque réalisation a son identité, son
              objectif et son univers.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              <span>Conception</span>
              <span className="h-1 w-1 rounded-full bg-[#007BFF]" />
              <span>Développement</span>
              <span className="h-1 w-1 rounded-full bg-[#007BFF]" />
              <span>Innovation</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="container-tight py-16 sm:py-24">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Nos réalisations
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Du concret. Du numérique. De l'impact.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              Parcourez les projets et ouvrez directement ceux qui vous intéressent.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              <FolderOpen className="h-4 w-4" />
            </span>
            {projects.length} projets présentés
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets par catégorie">
          {filters.map((filter) => {
            const selected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={selected}
                className={`rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  selected
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_6px_24px_rgba(0,123,255,0.22)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-8 grid items-stretch gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </motion.div>
        {filteredProjects.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            Aucun projet dans cette catégorie.
          </div>
        )}
      </section>

      {/* Contact callout */}
      <section className="border-y border-border bg-surface/50">
        <div className="container-tight py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative isolate overflow-hidden rounded-3xl border border-primary/25 bg-[#0A0F1C] px-6 py-12 text-center text-white shadow-elegant sm:px-12 sm:py-16"
          >
            <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-[#007BFF]/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-[#007BFF]/15 blur-[90px]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#58A6FF]">
              À votre tour
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Votre idée mérite de devenir notre prochaine réalisation.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">
              Vous avez un projet ou un besoin numérique ? Échangeons sur une
              solution adaptée à vos objectifs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Démarrer un projet <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/services">
                  Nos services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-8 text-xs font-extrabold tracking-[0.2em] text-white/75">
              INNOVER. <span className="text-[#58A6FF]">DÉVELOPPER.</span> TRANSFORMER.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
