import {Link} from "react-router-dom";
import { Target, Eye, Heart, Award, Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import founderImg from "@/assets/founder.jpg";
import buildingExterior from "@/assets/building-exterior.jpg";
import buildingAerial from "@/assets/building-aerial.jpg";
import lobbyImg from "@/assets/lobby.jpg";
import receptionImg from "@/assets/reception.jpg";

({
  head: () => ({
    meta: [
      { title: "À propos — F.MotivTech" },
      {
        name: "description",
        content:
          "Découvrez F.MotivTech, studio de création digitale fondé par Fréjuste GNIMADI à Cotonou, Bénin.",
      },
      { property: "og:title", content: "À propos — F.MotivTech" },
      {
        property: "og:description",
        content:
          "L'histoire, la vision et l'équipe derrière F.MotivTech, dirigée par Fréjuste GNIMADI.",
      },
      { property: "og:image", content: buildingExterior },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${buildingAerial})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/85 via-background/75 to-background" />
        <div className="container mx-auto px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> À propos de nous
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
              Nous bâtissons des marques qui <span className="text-primary">performent</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              F.MotivTech est un studio de création digitale basé à Cotonou, dédié aux
              entrepreneurs et entreprises qui veulent une identité forte et un web qui convertit.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 blur-2xl" />
            <img
              src={founderImg}
              alt="Fréjuste GNIMADI, fondateur de F.MotivTech"
              className="w-full rounded-2xl object-cover shadow-elegant"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Le fondateur
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Monsieur Fréjuste GNIMADI
            </h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              Fondateur & Directeur Général
            </p>
            <div className="mt-6 space-y-4 text-foreground/80">
              <p>
                Passionné par le design, la technologie et l'entrepreneuriat,
                <span className="font-semibold text-foreground"> Fréjuste GNIMADI </span>
                a fondé F.MotivTech avec une conviction simple : chaque entreprise mérite une
                image professionnelle et des outils digitaux à la hauteur de ses ambitions.
              </p>
              <p>
                Sa philosophie tient en quatre mots :{" "}
                <span className="font-semibold text-foreground">
                  Focus. Plan. Execute. Succeed.
                </span>{" "}
                C'est cette discipline qui guide chaque projet livré par l'équipe.
              </p>
              <blockquote className="rounded-xl border-l-4 border-primary bg-surface p-5 italic text-foreground/90 shadow-card">
                « Le succès se construit sur la discipline et la constance. Notre mission
                est de donner à chaque marque les moyens de briller. »
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="border-y border-border bg-surface/60">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qui nous fait avancer
            </h2>
            <p className="mt-3 text-muted-foreground">
              Trois piliers qui définissent notre manière de travailler avec nos clients.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: Target,
                title: "Notre Mission",
                desc: "Offrir à chaque entreprise du Bénin et d'Afrique des créations graphiques et des sites web professionnels, accessibles et performants.",
              },
              {
                Icon: Eye,
                title: "Notre Vision",
                desc: "Devenir la référence en design et solutions digitales pour les marques ambitieuses, en alliant créativité locale et standards internationaux.",
              },
              {
                Icon: Heart,
                title: "Nos Valeurs",
                desc: "Excellence, transparence, écoute et engagement. Chaque projet est traité avec le sérieux qu'il mérite.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-card">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company gallery */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Nos locaux
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Un cadre pensé pour la création
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <img
            src={buildingExterior}
            alt="Bâtiment F.MotivTech"
            className="h-72 w-full rounded-2xl object-cover shadow-card md:row-span-2 md:h-full"
          />
          <img
            src={lobbyImg}
            alt="Hall d'accueil F.MotivTech"
            className="h-72 w-full rounded-2xl object-cover shadow-card"
          />
          <img
            src={receptionImg}
            alt="Réception F.MotivTech"
            className="h-72 w-full rounded-2xl object-cover shadow-card"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface/60">
        <div className="container mx-auto grid gap-8 px-4 py-14 sm:grid-cols-3">
          {[
            { Icon: Award, value: "100+", label: "Projets livrés" },
            { Icon: Users, value: "80+", label: "Clients satisfaits" },
            { Icon: Sparkles, value: "5★", label: "Qualité reconnue" },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-card">
                <Icon className="h-7 w-7" />
              </span>
              <div>
                <p className="text-3xl font-bold tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-10 text-center shadow-elegant sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Prêt à construire votre marque avec nous&nbsp;?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Discutons de votre projet — devis gratuit sous 24h.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button size="lg" className="gradient-primary text-primary-foreground glow-primary">
                Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/shop">
              <Button size="lg" variant="outline">
                Voir nos services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
