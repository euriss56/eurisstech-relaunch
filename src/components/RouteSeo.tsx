import { useLocation } from "react-router-dom";
import { Seo } from "@/components/Seo";

const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "EURISS TECH — Studio digital au Bénin",
    description:
      "EURISS TECH accompagne les entrepreneurs et les marques dans leur identité visuelle, la création de sites web et le développement de solutions numériques à Calavi, Bénin.",
  },
  "/services": {
    title: "Services digitaux — EURISS TECH",
    description:
      "Identité visuelle, design graphique, création de sites web, plateformes et solutions numériques pour les entreprises et entrepreneurs au Bénin.",
  },
  "/projets": {
    title: "Projets & réalisations — EURISS TECH",
    description:
      "Découvrez les réalisations EURISS TECH : TraceIMEI-BJ, Aurore Capillaire et EURISS GSM, entre plateformes web, e-commerce et sites vitrines.",
  },
  "/reparation": {
    title: "Réparation smartphone & ordinateur à Calavi — EURISS TECH",
    description:
      "Réparation de téléphones, iPhone, Samsung, Android et ordinateurs à Calavi : écrans, batteries, connecteurs, dépannage et maintenance. Diagnostic gratuit.",
  },
  "/shop": {
    title: "Boutique de prestations — EURISS TECH",
    description:
      "Consultez les prestations et tarifs EURISS TECH : logos, identité visuelle, supports graphiques, sites vitrines et solutions e-commerce.",
  },
  "/about": {
    title: "À propos — EURISS TECH",
    description:
      "Découvrez EURISS TECH, studio créatif et technologique basé à Calavi, qui accompagne les marques de l'identité visuelle aux solutions numériques.",
  },
  "/blog": {
    title: "Blog — EURISS TECH",
    description:
      "Conseils et contenus autour du branding, du développement web et des solutions digitales pour entrepreneurs au Bénin.",
  },
  "/contact": {
    title: "Contact — EURISS TECH, Calavi",
    description:
      "Parlons de votre projet : écrivez à fanoueuriss@gmail.com ou contactez EURISS TECH au +229 01 41 67 57 84.",
  },
  "/cart": { title: "Panier — EURISS TECH", description: "Retrouvez les prestations ajoutées à votre panier EURISS TECH." },
  "/checkout": { title: "Commande — EURISS TECH", description: "Consultez les étapes de commande et de paiement de vos prestations." },
  "/account": { title: "Mon compte — EURISS TECH", description: "Accédez à votre compte et à vos commandes EURISS TECH." },
  "/mentions-legales": {
    title: "Mentions légales — EURISS TECH",
    description: "Mentions légales et informations sur l'éditeur du site EURISS TECH.",
  },
  "/privacy": {
    title: "Politique de confidentialité — EURISS TECH",
    description: "Informations sur la collecte, l'utilisation et la protection de vos données personnelles.",
  },
  "/terms": {
    title: "Conditions générales — EURISS TECH",
    description: "Conditions générales applicables aux prestations et à l'utilisation du site EURISS TECH.",
  },
};

const FALLBACK = {
  title: "EURISS TECH — Studio créatif & technologique",
  description: "Identité visuelle, sites web et solutions numériques conçus à Calavi, Bénin.",
};

export function RouteSeo() {
  const { pathname } = useLocation();
  const base = pathname.replace(/\/+$/, "") || "/";
  const meta = META[base] ?? FALLBACK;
  return <Seo title={meta.title} description={meta.description} path={pathname} />;
}
