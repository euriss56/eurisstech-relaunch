import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Code2, Palette, Smartphone, ShoppingBag, Monitor, Layers3, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/Seo";

const offers = [
  { Icon: Palette, number: "01", title: "Identité visuelle & design", text: "Construire une image de marque cohérente, reconnaissable et adaptée à votre public.", items: ["Création de logo et identité visuelle", "Supports de communication", "Visuels pour réseaux sociaux", "Direction artistique"] },
  { Icon: Code2, number: "02", title: "Sites web & plateformes", text: "Donner à votre activité une présence en ligne claire, professionnelle et efficace.", items: ["Sites vitrines et portfolios", "Boutiques e-commerce", "Plateformes web sur mesure", "Refonte et amélioration de sites"] },
  { Icon: Smartphone, number: "03", title: "Solutions numériques", text: "Transformer vos besoins quotidiens en outils numériques simples et pratiques.", items: ["Applications et outils métiers", "Automatisation de tâches", "Interfaces d'administration", "Conseil et accompagnement"] },
];

const steps = [
  ["Échange", "Nous prenons le temps de comprendre votre activité, vos objectifs et vos contraintes."],
  ["Proposition", "Vous recevez une direction claire, un périmètre de travail et un devis."],
  ["Réalisation", "Nous concevons, développons et vous tenons informé à chaque étape."],
  ["Livraison", "Votre solution est présentée, testée et mise en ligne selon le projet."],
];

export default function DigitalServices() {
  return (
    <div className="overflow-hidden">
      <Seo title="Services digitaux — EURISS TECH" description="Identité visuelle, création de sites web, plateformes et solutions numériques au Bénin. Donnez vie à vos projets avec EURISS TECH." path="/services" />
      <section className="relative border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container-tight grid items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Nos expertises · Studio digital</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Des idées bien pensées. <span className="text-gradient">Des solutions qui font avancer.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Nous aidons les entrepreneurs, marques et organisations à construire leur identité et à développer des expériences numériques utiles.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground"><Link to="/contact">Parler de mon projet <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/projets">Voir nos réalisations <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </motion.div>
          <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant"><Palette className="h-7 w-7 text-primary" /><p className="mt-8 text-lg font-bold">Design</p><p className="mt-1 text-sm text-muted-foreground">Une identité qui marque.</p></div>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-elegant"><Monitor className="h-7 w-7 text-primary" /><p className="mt-8 text-lg font-bold">Web</p><p className="mt-1 text-sm text-muted-foreground">Une présence qui inspire confiance.</p></div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant"><Layers3 className="h-7 w-7 text-primary" /><p className="mt-8 text-lg font-bold">Plateformes</p><p className="mt-1 text-sm text-muted-foreground">Des outils adaptés à vos besoins.</p></div>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-elegant"><ShoppingBag className="h-7 w-7 text-primary" /><p className="mt-8 text-lg font-bold">E-commerce</p><p className="mt-1 text-sm text-muted-foreground">Vendez en ligne simplement.</p></div>
          </div>
        </div>
      </section>

      <section className="container-tight py-20 sm:py-24">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Ce que nous faisons</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Les bonnes compétences pour faire avancer votre projet.</h2><p className="mt-4 leading-7 text-muted-foreground">Un accompagnement adapté à votre besoin, de la première idée jusqu'à la mise en ligne.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {offers.map(({ Icon, number, title, text, items }, i) => (
            <motion.article key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-widest text-muted-foreground">{number}</span><span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-6 w-6" /></span></div>
              <h3 className="mt-7 text-xl font-bold">{title}</h3><p className="mt-3 min-h-[76px] text-sm leading-7 text-muted-foreground">{text}</p>
              <ul className="mt-6 space-y-3">{items.map(item => <li key={item} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">Discuter de ce service <ArrowRight className="h-4 w-4" /></Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/50 py-20">
        <div className="container-tight"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Notre méthode</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Un processus simple et transparent.</h2></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, text], i) => <div key={title} className="rounded-xl border border-border bg-background p-6"><span className="text-xs font-bold tracking-widest text-primary">ÉTAPE 0{i + 1}</span><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}</div>
        </div>
      </section>

      <section className="container-tight py-20"><div className="relative overflow-hidden rounded-3xl bg-slate-950 px-7 py-16 text-center text-white sm:px-12"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" /><div className="relative mx-auto max-w-2xl"><MessageCircle className="mx-auto h-8 w-8 text-emerald-300" /><h2 className="mt-5 text-3xl font-bold sm:text-4xl">Vous avez une idée en tête ?</h2><p className="mt-4 leading-7 text-white/65">Parlons de vos objectifs. Nous vous aiderons à définir la solution la plus adaptée.</p><Button asChild size="lg" className="mt-8 bg-white text-slate-950 hover:bg-white/90"><Link to="/contact">Démarrer une conversation <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button></div></div></section>
    </div>
  );
}
