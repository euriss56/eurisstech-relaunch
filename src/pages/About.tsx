import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Database,
  Globe2,
  Laptop,
  Lightbulb,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import founderImg from "@/assets/founder.jpg";
import locauxImg from "@/assets/eurisstech-locaux.jpg";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const expertise = [
  {
    Icon: Globe2,
    title: "Sites web professionnels",
    description: "Des expériences web modernes, rapides et adaptées à votre activité.",
  },
  {
    Icon: Code2,
    title: "Applications web",
    description: "Des outils numériques conçus pour répondre à des besoins concrets.",
  },
  {
    Icon: MonitorSmartphone,
    title: "Plateformes digitales",
    description: "Des plateformes utiles, accessibles et pensées pour leurs utilisateurs.",
  },
  {
    Icon: Laptop,
    title: "E-commerce",
    description: "Des boutiques en ligne pour présenter vos produits et développer votre présence.",
  },
  {
    Icon: Database,
    title: "Bases de données",
    description: "Une organisation structurée des informations au service de vos activités.",
  },
  {
    Icon: Wrench,
    title: "Maintenance & réparation",
    description: "Des services de réparation et d'assistance pour téléphones et ordinateurs.",
  },
];

const principles = [
  {
    Icon: Target,
    title: "Notre mission",
    description:
      "Transformer les idées et les besoins de nos clients en solutions numériques utiles, accessibles et bien conçues.",
  },
  {
    Icon: Lightbulb,
    title: "Notre vision",
    description:
      "Contribuer à un écosystème où les entreprises, entrepreneurs et particuliers peuvent tirer pleinement parti du numérique.",
  },
  {
    Icon: ShieldCheck,
    title: "Nos engagements",
    description:
      "Privilégier l'écoute, la clarté, la qualité du travail et des solutions pensées pour durer.",
  },
];

function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative isolate border-b border-border">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${locauxImg})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background/95 to-primary/10" />
        <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-80 w-80 rounded-full bg-primary/20 blur-[110px]" />
        <div className="container mx-auto grid items-center gap-12 px-4 py-20 sm:py-28 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div initial="hidden" animate="visible" variants={reveal}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-4 w-4" /> À propos d'EURISS TECH
            </span>
            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Le numérique au service de vos{" "}
              <span className="text-primary">ambitions.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              EURISS TECH imagine et développe des solutions numériques pour les
              entreprises, les entrepreneurs et les particuliers. De la création
              web à l'assistance informatique, nous faisons du numérique un outil
              concret pour avancer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="glow-primary">
                  Parlons de votre projet <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/projets">
                <Button size="lg" variant="outline">
                  Découvrir nos projets
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-sm font-extrabold tracking-[0.22em] text-foreground">
              INNOVER. <span className="text-primary">DÉVELOPPER.</span> TRANSFORMER.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-primary/20 bg-card p-2 shadow-elegant">
              <img
                src={locauxImg}
                alt="Univers et environnement de travail EURISS TECH"
                className="aspect-[5/4] w-full rounded-[1.2rem] object-cover"
                decoding="async"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/15 bg-background/85 p-4 shadow-xl backdrop-blur-xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Notre signature
                </p>
                <p className="mt-1 text-lg font-extrabold tracking-wide">
                  INNOVER. DÉVELOPPER. TRANSFORMER.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/25 to-transparent blur-2xl" />
            <img
              src={founderImg}
              alt="Euriss Mahunan FANOU, fondateur d'EURISS TECH"
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-3xl border border-border object-cover shadow-elegant"
            />
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-primary/25 bg-card px-5 py-4 shadow-elegant sm:-right-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Fondateur
              </p>
              <p className="mt-1 font-bold">Euriss Mahunan FANOU</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              L'origine du projet
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Une passion pour la technologie. Une volonté de créer de l'impact.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground">
              <p>
                EURISS TECH est porté par la volonté de rendre les outils
                numériques plus accessibles et de proposer des réalisations
                adaptées aux réalités des utilisateurs.
              </p>
              <p>
                À travers chaque projet, l'objectif est de comprendre le besoin,
                construire une réponse claire et soigner l'expérience jusque dans
                les détails. Le travail associe réflexion, développement et
                amélioration continue.
              </p>
              <p>
                Cette démarche se traduit aussi par une offre de services
                informatiques de proximité, notamment pour l'entretien et la
                réparation des téléphones et des ordinateurs.
              </p>
            </div>
            <div className="mt-7 border-l-2 border-primary bg-primary/5 px-5 py-4">
              <p className="text-lg font-semibold leading-7 text-foreground">
                « La technologie prend tout son sens lorsqu'elle apporte une
                réponse simple à un besoin réel. »
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-primary">
                L'esprit EURISS TECH
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="border-y border-border bg-surface/50">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Ce que nous faisons
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Des compétences au croisement du digital et de l'informatique
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Des services complémentaires pour accompagner vos idées et vos
              besoins technologiques.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map(({ Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50 hover:shadow-elegant"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, vision, commitments */}
      <section className="container mx-auto px-4 py-20 sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Ce qui nous guide
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Notre cap, à chaque étape
          </h2>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map(({ Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden rounded-3xl border border-primary/25 bg-card px-6 py-14 text-center shadow-elegant sm:px-12 sm:py-16"
        >
          <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
          <div className="absolute -bottom-28 -left-16 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[90px]" />
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Smartphone className="h-3.5 w-3.5" /> Votre prochain projet commence ici
          </span>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
            Et si nous donnions vie à votre prochaine idée ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            Présentez-nous votre besoin. Échangeons sur une solution adaptée à
            votre activité, à vos objectifs et à votre budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button size="lg" className="glow-primary">
                Contacter EURISS TECH <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/projets">
              <Button size="lg" variant="outline">
                Explorer nos réalisations
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm font-extrabold tracking-[0.2em] text-foreground">
            INNOVER. <span className="text-primary">DÉVELOPPER.</span> TRANSFORMER.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
