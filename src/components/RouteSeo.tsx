import { useLocation } from "react-router-dom";
import { Seo } from "@/components/Seo";

const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Eurisstech — Studio créatif & tech au Bénin",
    description:
      "Eurisstech, studio créatif et technologique à Calavi : identité visuelle, sites web, applications mobiles et design print pour marques africaines ambitieuses.",
  },
  "/services": {
    title: "Réparation smartphone & ordinateur à Calavi — Eurisstech",
    description:
      "Réparation téléphone, iPhone, Samsung, Android et ordinateur portable à Calavi : écran, batterie, connecteur de charge, dépannage et maintenance informatique. Diagnostic gratuit.",
  },
  "/shop": {
    title: "Services & tarifs — Eurisstech",
    description:
      "Logos, sites vitrines, e-commerce, applications mobiles, affiches et motion design. Découvrez nos prestations et tarifs en FCFA.",
  },
  "/about": {
    title: "À propos d'Eurisstech — Notre histoire",
    description:
      "Fondé par Euriss Mahunan FANOU à Calavi, Eurisstech accompagne les marques du premier logo jusqu'au produit digital final.",
  },
  "/blog": {
    title: "Blog Eurisstech — Branding, web & digital",
    description:
      "Conseils branding, web, réseaux sociaux et paiement mobile pour entrepreneurs au Bénin et en Afrique de l'Ouest.",
  },
  "/contact": {
    title: "Contact — Eurisstech Calavi, Bénin",
    description:
      "Parlons de votre projet : écrivez à fanoueuriss@gmail.com ou appelez le +229 01 41 67 57 84. Réponse rapide, devis gratuit.",
  },
  "/cart": { title: "Panier — Eurisstech", description: "Votre sélection de services Eurisstech." },
  "/checkout": { title: "Commande — Eurisstech", description: "Finalisez votre commande Eurisstech en toute sécurité." },
  "/account": { title: "Mon compte — Eurisstech", description: "Accédez à vos commandes et informations Eurisstech." },
  "/mentions-legales": {
    title: "Mentions légales — Eurisstech",
    description: "Mentions légales et informations éditeur du site Eurisstech.",
  },
  "/privacy": {
    title: "Politique de confidentialité — Eurisstech",
    description: "Comment Eurisstech collecte, utilise et protège vos données personnelles.",
  },
  "/terms": {
    title: "Conditions générales — Eurisstech",
    description: "Conditions générales de vente et d'utilisation des services Eurisstech.",
  },
};

const FALLBACK = {
  title: "Eurisstech — Studio créatif & technologique",
  description: "Identité visuelle, sites web et applications mobiles conçus à Calavi, Bénin.",
};

export function RouteSeo() {
  const { pathname } = useLocation();
  const base = pathname.replace(/\/+$/, "") || "/";
  const meta = META[base] ?? FALLBACK;
  return <Seo title={meta.title} description={meta.description} path={pathname} />;
}
