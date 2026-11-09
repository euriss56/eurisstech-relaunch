import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const projects = [
  { number: "01", name: "TraceIMEI-BJ", category: "Plateforme web · Sécurité mobile", description: "Une plateforme dédiée à la traçabilité et à la vérification des téléphones au Bénin.", url: "https://traceimei-bj.vercel.app/", label: "Découvrir la plateforme", gradient: "from-emerald-950 via-emerald-900 to-slate-950", mark: "TRACE / IMEI", accent: "text-emerald-300", tags: ["Plateforme web", "Sécurité", "Technologie"] },
  { number: "02", name: "Aurore Capillaire", category: "E-commerce · Beauté", description: "Une boutique en ligne consacrée aux soins capillaires, avec une présentation soignée des produits.", url: "https://aurore-capillaire.vercel.app/", label: "Visiter la boutique", gradient: "from-amber-950 via-stone-900 to-neutral-950", mark: "AURORE", accent: "text-amber-200", tags: ["E-commerce", "Beauté", "Boutique en ligne"] },
  { number: "03", name: "EURISS GSM", category: "Site vitrine · Services tech", description: "Un site professionnel pour présenter les prestations de réparation mobile et informatique.", url: "https://eurissgsm.vercel.app/", label: "Visiter le site", gradient: "from-blue-950 via-slate-900 to-neutral-950", mark: "EURISS GSM", accent: "text-sky-300", tags: ["Site vitrine", "Services", "Technologie"] },
  { number: "04", name: "OCD LIVE", category: "Plateforme web · Réservation", description: "Une plateforme digitale conçue pour présenter des offres, faciliter les réservations et accompagner les utilisateurs dans leur parcours.", url: "https://ocd-live-eight.vercel.app/", label: "Découvrir OCD LIVE", gradient: "from-violet-950 via-indigo-950 to-slate-950", mark: "OCD LIVE", accent: "text-violet-300", tags: ["Plateforme web", "Réservation", "Expérience utilisateur"] },
  { number: "05", name: "SCHOOL MANAGER BJ", category: "Application web · Gestion scolaire", description: "Une application web dédiée à la gestion scolaire, pensée pour centraliser les informations et simplifier le suivi des activités d’un établissement.", url: "https://school-manager-bj.vercel.app/", label: "Découvrir SCHOOL MANAGER BJ", gradient: "from-cyan-950 via-blue-950 to-slate-950", mark: "SCHOOL / MANAGER", accent: "text-cyan-300", tags: ["Application web", "Gestion scolaire", "Éducation"] },
];

export default function Projects() {
  return (
    <div className="overflow-hidden">
      <Seo title="Nos projets & réalisations — EURISS TECH" description="Découvrez une sélection de projets conçus par EURISS TECH : plateformes web, e-commerce et sites vitrines." path="/projets" />
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container-tight py-20 text-center sm:py-28">
          <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Portfolio · EURISS TECH</span>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Des idées transformées en <span className="text-gradient">projets concrets.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Découvrez quelques réalisations qui illustrent notre approche du design, du développement web et des solutions numériques.</p>
        </div>
      </section>
      <section className="container-tight py-20 sm:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sélection de réalisations</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Notre travail en quelques projets.</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Chaque réalisation répond à un besoin précis et à un univers qui lui est propre.</p></div>
        <div className="space-y-7">
          {projects.map((project, i) => <motion.article key={project.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-card md:grid-cols-[1fr_0.9fr]">
            <div className={`relative flex min-h-[270px] flex-col justify-between overflow-hidden bg-gradient-to-br ${project.gradient} p-7 text-white sm:min-h-[330px] sm:p-10`}><div className="absolute -right-10 -top-12 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -right-2 top-12 h-44 w-44 rounded-full border border-white/10" /><div className="relative flex items-center justify-between"><span className="text-xs font-semibold tracking-[0.2em] text-white/55">PROJECT / {project.number}</span><ArrowUpRight className="h-5 w-5 text-white/70" /></div><div className="relative"><p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${project.accent}`}>{project.category}</p><p className="text-4xl font-black tracking-tight sm:text-5xl">{project.mark}</p></div></div>
            <div className="flex flex-col justify-center p-7 sm:p-10"><span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Réalisation 0{i + 1}</span><h3 className="mt-3 text-2xl font-bold sm:text-3xl">{project.name}</h3><p className="mt-4 leading-7 text-muted-foreground">{project.description}</p><div className="mt-6 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</span>)}</div><a href={project.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3">{project.label} <ExternalLink className="h-4 w-4" /></a></div>
          </motion.article>)}
        </div>
      </section>
      <section className="border-y border-border bg-surface/50 py-20"><div className="container-tight text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">À votre tour</p><h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Votre projet pourrait être le prochain.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">Vous avez une idée, un besoin ou une activité à développer en ligne ? Construisons quelque chose d'utile ensemble.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild size="lg"><Link to="/contact">Parler de mon projet <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline"><Link to="/services">Découvrir nos services <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></div></section>
    </div>
  );
}
