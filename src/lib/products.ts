import type { Lang } from "./i18n";

import imgLogo from "@/assets/services/logo.jpg";
import imgIdentite from "@/assets/services/identite-visuelle.jpg";
import imgAffiche from "@/assets/services/affiche.jpg";
import imgFlyer from "@/assets/services/flyer.jpg";
import imgCarte from "@/assets/services/carte-visite.jpg";
import imgBrochure from "@/assets/services/brochure.jpg";
import imgBache from "@/assets/services/bache.jpg";
import imgRollup from "@/assets/services/roll-up.jpg";
import imgCalendrier from "@/assets/services/calendrier.jpg";
import imgReseaux from "@/assets/services/reseaux.jpg";
import imgTshirt from "@/assets/services/tshirt.jpg";
import imgPackaging from "@/assets/services/packaging.jpg";
import imgVitrine from "@/assets/services/site-vitrine.jpg";
import imgLanding from "@/assets/services/landing.jpg";
import imgEcom from "@/assets/services/ecommerce.jpg";
import imgPortfolio from "@/assets/services/portfolio.jpg";
import imgBlog from "@/assets/services/blog-site.jpg";
import imgSaas from "@/assets/services/saas.jpg";
import imgDashboard from "@/assets/services/dashboard.jpg";
import imgIA from "@/assets/services/ia.jpg";
import imgRevetementPc from "@/assets/services/revetement-pc.jpg";

export type Category = "graphic" | "web";

export interface Product {
  slug: string;
  category: Category;
  name: Record<Lang, string>;
  short: Record<Lang, string>;
  description: Record<Lang, string>;
  features: Record<Lang, string[]>;
  priceFrom: number; // in XOF
  image: string;
}

const tr = <T,>(fr: T, en: T, es: T, de: T, zh: T): Record<Lang, T> => ({ fr, en, es, de, zh });
const t5 = (fr: string, en: string) => tr(fr, en, fr, fr, fr);
const tl = (fr: string[], en: string[]) => tr(fr, en, fr, fr, fr);

export const PRODUCTS: Product[] = [
  // ---------- GRAPHISME ----------
  {
    slug: "logo-professionnel",
    category: "graphic",
    image: imgLogo,
    name: t5("Logo Professionnel", "Professional Logo"),
    short: t5("Un logo unique qui incarne votre marque.", "A unique logo that embodies your brand."),
    description: t5(
      "Création d'un logo professionnel sur mesure, livré en plusieurs formats (PNG, SVG, PDF) pour tous vos supports digitaux et imprimés.",
      "Custom professional logo delivered in multiple formats (PNG, SVG, PDF).",
    ),
    features: tl(
      ["3 propositions créatives", "2 cycles de révision", "Fichiers PNG, SVG, PDF", "Charte couleurs"],
      ["3 creative concepts", "2 revision rounds", "PNG, SVG, PDF files", "Color guidelines"],
    ),
    priceFrom: 15000,
  },
  {
    slug: "identite-visuelle",
    category: "graphic",
    image: imgIdentite,
    name: t5("Identité Visuelle Complète", "Full Visual Identity"),
    short: t5("Logo, charte, papeterie : tout votre univers de marque.", "Logo, guidelines, stationery — the full brand universe."),
    description: t5(
      "Pack complet d'identité de marque : logo, charte graphique, papeterie (carte de visite, en-tête, enveloppe), déclinaisons réseaux sociaux et guide d'utilisation.",
      "Complete brand identity pack: logo, brand guidelines, stationery and social templates.",
    ),
    features: tl(
      ["Logo & variantes", "Charte graphique PDF", "Carte de visite + papeterie", "Templates réseaux sociaux", "Guide d'usage"],
      ["Logo & variants", "Brand guidelines PDF", "Business card + stationery", "Social templates", "Usage guide"],
    ),
    priceFrom: 75000,
  },
  {
    slug: "affiche-publicitaire",
    category: "graphic",
    image: imgAffiche,
    name: t5("Affiche Publicitaire", "Advertising Poster"),
    short: t5("Affiches percutantes prêtes à imprimer.", "High-impact posters ready to print."),
    description: t5(
      "Affiches publicitaires haute résolution adaptées à tous vos événements et campagnes.",
      "High-resolution posters tailored to your events and campaigns.",
    ),
    features: tl(
      ["Format A3/A2/A1", "Fichier prêt à imprimer", "Livraison 48h"],
      ["A3/A2/A1 sizes", "Print-ready file", "48h delivery"],
    ),
    priceFrom: 8000,
  },
  {
    slug: "flyer-pro",
    category: "graphic",
    image: imgFlyer,
    name: t5("Flyer Pro", "Pro Flyer"),
    short: t5("Flyers recto-verso au design soigné.", "Two-sided flyers with crisp design."),
    description: t5(
      "Flyers professionnels recto-verso pour booster vos campagnes locales.",
      "Two-sided professional flyers to boost local campaigns.",
    ),
    features: tl(
      ["Recto-verso", "A5/A6", "Fichier prêt à imprimer"],
      ["Front & back", "A5/A6", "Print-ready"],
    ),
    priceFrom: 6000,
  },
  {
    slug: "carte-de-visite",
    category: "graphic",
    image: imgCarte,
    name: t5("Carte de Visite", "Business Card"),
    short: t5("Cartes élégantes, recto-verso, prêtes à imprimer.", "Elegant double-sided cards, print-ready."),
    description: t5(
      "Cartes de visite professionnelles au design moderne, recto-verso, déclinables pour toute l'équipe.",
      "Modern professional business cards, two-sided, available for the whole team.",
    ),
    features: tl(
      ["Recto-verso HD", "QR code optionnel", "Fichier print-ready", "Mockup 3D inclus"],
      ["HD two-sided", "Optional QR code", "Print-ready file", "3D mockup included"],
    ),
    priceFrom: 5000,
  },
  {
    slug: "brochure-plaquette",
    category: "graphic",
    image: imgBrochure,
    name: t5("Brochure & Plaquette", "Brochure & Booklet"),
    short: t5("Plaquette d'entreprise pour valoriser vos offres.", "Corporate booklet to showcase your offers."),
    description: t5(
      "Brochure ou plaquette commerciale au design soigné, mise en page pro pour présenter votre activité et vos services.",
      "Polished corporate brochure to showcase your business and services.",
    ),
    features: tl(
      ["4 à 12 pages", "Mise en page pro", "Format A4/A5 plié", "PDF haute définition"],
      ["4–12 pages", "Pro layout", "Folded A4/A5", "High-definition PDF"],
    ),
    priceFrom: 25000,
  },
  {
    slug: "bache-publicitaire",
    category: "graphic",
    image: imgBache,
    name: t5("Bâche Publicitaire", "Advertising Banner"),
    short: t5("Bâches grand format pour visibilité maximale.", "Large-format banners for maximum visibility."),
    description: t5(
      "Bâches publicitaires résistantes, design grand format pour vos événements et façades.",
      "Durable large-format advertising banners for events and facades.",
    ),
    features: tl(["Grand format", "Fichier HD", "Œillets inclus"], ["Large format", "HD file", "Eyelets included"]),
    priceFrom: 20000,
  },
  {
    slug: "roll-up-kakemono",
    category: "graphic",
    image: imgRollup,
    name: t5("Roll-up / Kakémono", "Roll-up / Kakemono"),
    short: t5("Stand vertical idéal pour salons et événements.", "Vertical stand ideal for events and trade shows."),
    description: t5(
      "Création du visuel pour roll-up rétractable ou kakémono événementiel, design impactant à hauteur d'œil.",
      "Visual design for retractable roll-up or event kakemono, eye-level impact.",
    ),
    features: tl(
      ["Format 85×200 cm", "Visuel impactant", "Fichier print-ready"],
      ["85×200 cm size", "High-impact visual", "Print-ready file"],
    ),
    priceFrom: 18000,
  },
  {
    slug: "calendrier-personnalise",
    category: "graphic",
    image: imgCalendrier,
    name: t5("Calendrier Personnalisé", "Custom Calendar"),
    short: t5("Calendrier annuel à votre image.", "Annual calendar in your brand colors."),
    description: t5(
      "Calendrier annuel design, parfait cadeau d'entreprise pour vos clients et partenaires.",
      "Annual designer calendar, the perfect corporate gift.",
    ),
    features: tl(
      ["12 mois", "Format mural/bureau", "Photos & branding inclus"],
      ["12 months", "Wall/desk format", "Photos & branding included"],
    ),
    priceFrom: 12000,
  },
  {
    slug: "visuels-reseaux-sociaux",
    category: "graphic",
    image: imgReseaux,
    name: t5("Visuels Réseaux Sociaux", "Social Media Visuals"),
    short: t5("Pack de visuels Instagram, Facebook, TikTok.", "Visual pack for Instagram, Facebook, TikTok."),
    description: t5(
      "Pack mensuel de visuels pour vos réseaux sociaux : posts, stories, reels covers, bannières, design cohérent.",
      "Monthly pack of social visuals: posts, stories, reel covers, banners — consistent design.",
    ),
    features: tl(
      ["10 posts + 5 stories", "Templates réutilisables", "Adapté à chaque plateforme", "Livré en PNG + sources"],
      ["10 posts + 5 stories", "Reusable templates", "Platform-tailored", "PNG + source files"],
    ),
    priceFrom: 25000,
  },
  {
    slug: "tshirt-goodies",
    category: "graphic",
    image: imgTshirt,
    name: t5("T-shirts & Goodies", "T-shirts & Goodies"),
    short: t5("Visuels pour t-shirts, mugs, tote-bags, casquettes.", "Designs for t-shirts, mugs, tote bags, caps."),
    description: t5(
      "Design de visuels personnalisés pour textiles et goodies d'entreprise (t-shirts, polos, mugs, tote-bags, stylos, casquettes).",
      "Custom designs for branded textiles and goodies (t-shirts, polos, mugs, tote bags, pens, caps).",
    ),
    features: tl(
      ["Fichiers vectoriels", "Mockups réalistes", "Adapté à l'impression textile"],
      ["Vector files", "Realistic mockups", "Textile print-ready"],
    ),
    priceFrom: 10000,
  },
  {
    slug: "packaging-produit",
    category: "graphic",
    image: imgPackaging,
    name: t5("Packaging Produit", "Product Packaging"),
    short: t5("Emballages premium qui font vendre.", "Premium packaging that sells."),
    description: t5(
      "Design de packaging produit (boîtes, étiquettes, sachets) qui valorise votre marque en rayon et au déballage.",
      "Product packaging design (boxes, labels, pouches) that elevates your brand on shelf and unboxing.",
    ),
    features: tl(
      ["Mockup 3D", "Fichier dieline imprimeur", "Design recto-verso"],
      ["3D mockup", "Printer-ready dieline", "Front & back design"],
    ),
    priceFrom: 30000,
  },

  // ---------- WEB ----------
  {
    slug: "site-vitrine",
    category: "web",
    image: imgVitrine,
    name: t5("Site Vitrine Pro", "Pro Showcase Website"),
    short: t5("Un site moderne, rapide et éditable.", "A modern, fast, editable website."),
    description: t5(
      "Site vitrine professionnel responsive, optimisé SEO, sécurisé HTTPS, éditable à tout moment via un back-office simple.",
      "Responsive showcase website, SEO-optimised, HTTPS secured, editable anytime.",
    ),
    features: tl(
      ["5 pages sur mesure", "Responsive mobile/desktop", "SEO de base inclus", "Hébergement 1ère année", "Back-office d'édition"],
      ["5 custom pages", "Mobile/desktop responsive", "Basic SEO", "Hosting 1st year", "Admin panel"],
    ),
    priceFrom: 150000,
  },
  {
    slug: "landing-page",
    category: "web",
    image: imgLanding,
    name: t5("Landing Page Conversion", "Conversion Landing Page"),
    short: t5("Une page unique pour transformer vos visiteurs en clients.", "A single page that converts visitors into customers."),
    description: t5(
      "Landing page haute conversion pour lancer un produit, capturer des leads ou booster une campagne publicitaire.",
      "High-conversion landing page to launch a product, capture leads or boost an ad campaign.",
    ),
    features: tl(
      ["Page unique optimisée", "Formulaire de capture", "Intégration analytics", "Mobile first", "A/B test ready"],
      ["Single optimised page", "Lead capture form", "Analytics integrated", "Mobile-first", "A/B test ready"],
    ),
    priceFrom: 80000,
  },
  {
    slug: "site-ecommerce",
    category: "web",
    image: imgEcom,
    name: t5("Site E-commerce", "E-commerce Website"),
    short: t5("Boutique en ligne sécurisée, prête à vendre.", "Secure online store, ready to sell."),
    description: t5(
      "Boutique e-commerce sécurisée avec gestion produits, panier, paiements Mobile Money et tableau de bord administrateur.",
      "Secure e-commerce store with product management, cart, Mobile Money payments and admin dashboard.",
    ),
    features: tl(
      ["Catalogue produits illimité", "Panier & checkout", "Paiement Mobile Money (MTN, Moov)", "Dashboard admin", "Multi-langues"],
      ["Unlimited products", "Cart & checkout", "Mobile Money (MTN, Moov)", "Admin dashboard", "Multi-language"],
    ),
    priceFrom: 350000,
  },
  {
    slug: "site-portfolio",
    category: "web",
    image: imgPortfolio,
    name: t5("Site Portfolio", "Portfolio Website"),
    short: t5("Mettez en valeur vos projets et talents.", "Showcase your projects and skills."),
    description: t5(
      "Site portfolio créatif pour designers, photographes, freelances ou artistes : galerie, projets, contact.",
      "Creative portfolio site for designers, photographers, freelancers or artists: gallery, projects, contact.",
    ),
    features: tl(
      ["Galerie projets", "Animations soignées", "Page contact", "SEO de base"],
      ["Project gallery", "Smooth animations", "Contact page", "Basic SEO"],
    ),
    priceFrom: 100000,
  },
  {
    slug: "blog-pro",
    category: "web",
    image: imgBlog,
    name: t5("Blog Pro", "Pro Blog"),
    short: t5("Plateforme de blog moderne avec back-office.", "Modern blog platform with admin panel."),
    description: t5(
      "Blog professionnel avec gestion des articles, catégories, commentaires et newsletter, optimisé SEO.",
      "Professional blog with articles, categories, comments and newsletter, SEO optimised.",
    ),
    features: tl(
      ["Éditeur d'articles", "Catégories & tags", "Newsletter", "SEO avancé", "Multi-auteurs"],
      ["Article editor", "Categories & tags", "Newsletter", "Advanced SEO", "Multi-author"],
    ),
    priceFrom: 180000,
  },
  {
    slug: "application-web-saas",
    category: "web",
    image: imgSaas,
    name: t5("Application Web / SaaS", "Web App / SaaS"),
    short: t5("Application sur mesure pour automatiser votre métier.", "Custom web app to automate your business."),
    description: t5(
      "Développement d'application web ou SaaS sur mesure : authentification, base de données, abonnements et tableau de bord.",
      "Custom web app / SaaS development: auth, database, subscriptions and dashboard.",
    ),
    features: tl(
      ["Auth utilisateurs", "Base de données", "Abonnements", "API & intégrations", "Hébergement scalable"],
      ["User auth", "Database", "Subscriptions", "API & integrations", "Scalable hosting"],
    ),
    priceFrom: 800000,
  },
  {
    slug: "dashboard-admin",
    category: "web",
    image: imgDashboard,
    name: t5("Dashboard Admin", "Admin Dashboard"),
    short: t5("Tableau de bord pour piloter votre activité.", "Dashboard to drive your business."),
    description: t5(
      "Tableau de bord administrateur pour visualiser KPI, gérer utilisateurs, produits ou commandes, avec graphiques et exports.",
      "Admin dashboard to visualise KPIs, manage users, products or orders, with charts and exports.",
    ),
    features: tl(
      ["Graphiques & KPI", "Gestion utilisateurs", "Exports CSV/PDF", "Rôles & permissions"],
      ["Charts & KPIs", "User management", "CSV/PDF exports", "Roles & permissions"],
    ),
    priceFrom: 250000,
  },
  {
    slug: "site-ia-chatbot",
    category: "web",
    image: imgIA,
    name: t5("Site avec IA & Chatbot", "AI-powered Site & Chatbot"),
    short: t5("Boostez votre site avec un assistant IA intelligent.", "Boost your site with a smart AI assistant."),
    description: t5(
      "Intégration d'un chatbot IA sur votre site : réponses automatiques, prise de rendez-vous, qualification des leads, support 24/7.",
      "AI chatbot integration: auto-replies, booking, lead qualification, 24/7 support.",
    ),
    features: tl(
      ["Chatbot IA personnalisé", "Réponses 24/7", "Prise de rendez-vous", "Connecté à votre contenu", "Multilingue"],
      ["Custom AI chatbot", "24/7 replies", "Booking flow", "Connected to your content", "Multilingual"],
    ),
    priceFrom: 200000,
  },

  // ---------- NOUVEAUX PRODUITS GRAPHIQUES ----------
  {
    slug: "menu-restaurant",
    category: "graphic",
    image: imgBrochure,
    name: t5("Menu Restaurant", "Restaurant Menu"),
    short: t5("Cartes et menus design pour restaurants et bars.", "Designer menus for restaurants and bars."),
    description: t5(
      "Création de menus élégants et lisibles pour restaurants, bars, food-trucks. Format imprimable ou QR code digital.",
      "Elegant, readable menus for restaurants, bars, food-trucks. Print or QR digital format.",
    ),
    features: tl(
      ["Recto-verso", "Version QR code", "Photos & icônes", "Fichier print-ready"],
      ["Two-sided", "QR code version", "Photos & icons", "Print-ready"],
    ),
    priceFrom: 15000,
  },
  {
    slug: "carton-invitation",
    category: "graphic",
    image: imgCarte,
    name: t5("Carton d'Invitation", "Invitation Card"),
    short: t5("Invitations mariage, anniversaire, événement pro.", "Wedding, birthday and corporate event invites."),
    description: t5(
      "Cartons d'invitation personnalisés pour mariages, anniversaires, baptêmes et événements d'entreprise.",
      "Custom invitations for weddings, birthdays, baptisms and corporate events.",
    ),
    features: tl(
      ["Design sur mesure", "Recto-verso", "Format imprimable", "Version digitale"],
      ["Custom design", "Two-sided", "Print-ready", "Digital version"],
    ),
    priceFrom: 7000,
  },
  {
    slug: "presentation-powerpoint",
    category: "graphic",
    image: imgBrochure,
    name: t5("Présentation PowerPoint", "PowerPoint Presentation"),
    short: t5("Slides pro pour pitchs, formations, conférences.", "Pro slides for pitches, training, conferences."),
    description: t5(
      "Conception de présentations PowerPoint / Keynote / Google Slides au design moderne et structuré pour convaincre.",
      "Modern, well-structured PowerPoint / Keynote / Google Slides decks that convert.",
    ),
    features: tl(
      ["Jusqu'à 20 slides", "Template réutilisable", "Icônes & graphiques", "Format .pptx + PDF"],
      ["Up to 20 slides", "Reusable template", "Icons & charts", ".pptx + PDF formats"],
    ),
    priceFrom: 20000,
  },
  {
    slug: "cv-design",
    category: "graphic",
    image: imgCarte,
    name: t5("CV & Lettre de Motivation Design", "Designer CV & Cover Letter"),
    short: t5("Un CV qui se démarque et décroche l'entretien.", "A CV that stands out and lands the interview."),
    description: t5(
      "CV professionnel au design moderne accompagné d'une lettre de motivation assortie, livrés en PDF et Word éditable.",
      "Modern professional CV with matching cover letter, delivered as PDF and editable Word.",
    ),
    features: tl(
      ["CV + lettre", "PDF + Word éditable", "Design ATS-friendly", "2 révisions incluses"],
      ["CV + cover letter", "PDF + editable Word", "ATS-friendly design", "2 revisions included"],
    ),
    priceFrom: 8000,
  },
  {
    slug: "habillage-vehicule",
    category: "graphic",
    image: imgBache,
    name: t5("Habillage Véhicule (Covering)", "Vehicle Wrap Design"),
    short: t5("Transformez vos véhicules en panneaux publicitaires.", "Turn vehicles into rolling billboards."),
    description: t5(
      "Design de covering complet ou partiel pour voitures, motos, camionnettes : visibilité maximale dans la ville.",
      "Full or partial vehicle wrap design for cars, bikes, vans — maximum city visibility.",
    ),
    features: tl(
      ["Design sur mesure", "Mockup 3D du véhicule", "Fichier pour imprimeur"],
      ["Custom design", "3D vehicle mockup", "Printer-ready file"],
    ),
    priceFrom: 35000,
  },
  {
    slug: "motion-design",
    category: "graphic",
    image: imgReseaux,
    name: t5("Motion Design / Vidéo Animée", "Motion Design / Animated Video"),
    short: t5("Vidéos animées courtes pour réseaux et pubs.", "Short animated videos for social and ads."),
    description: t5(
      "Création de vidéos motion design courtes (15s à 60s) pour expliquer votre offre, animer vos réseaux ou booster vos publicités.",
      "Short motion design videos (15s–60s) to explain your offer, energize socials or boost ads.",
    ),
    features: tl(
      ["Durée 15 à 60s", "Voix off optionnelle", "Musique libre de droits", "Format MP4 HD"],
      ["15–60s duration", "Optional voice-over", "Royalty-free music", "HD MP4"],
    ),
    priceFrom: 45000,
  },
  {
    slug: "retouche-photo",
    category: "graphic",
    image: imgPackaging,
    name: t5("Retouche Photo Pro", "Pro Photo Retouching"),
    short: t5("Photos produits et portraits retouchés pro.", "Product photos and portraits, pro-retouched."),
    description: t5(
      "Retouche professionnelle de photos : détourage, correction colorimétrique, suppression d'arrière-plan, embellissement.",
      "Professional photo retouching: cutout, color correction, background removal, enhancement.",
    ),
    features: tl(
      ["Détourage HD", "Correction couleurs", "Arrière-plan transparent", "Livraison rapide"],
      ["HD cutout", "Color correction", "Transparent background", "Fast delivery"],
    ),
    priceFrom: 3000,
  },
  {
    slug: "revetement-pc",
    category: "graphic",
    image: imgRevetementPc,
    name: t5("Revêtement PC (Skin Ordinateur)", "Laptop Skin / Wrap"),
    short: t5("Habillez votre ordinateur aux couleurs de votre marque.", "Wrap your laptop in your brand colors."),
    description: t5(
      "Conception et pose de revêtement adhésif (skin) pour ordinateurs portables et de bureau : protection contre les rayures et personnalisation totale avec votre design ou votre identité de marque.",
      "Design and application of adhesive skins for laptops and desktops: scratch protection plus full customization with your design or brand identity.",
    ),
    features: tl(
      ["Design personnalisé ou motif au choix", "Vinyle de qualité, sans résidu", "Découpe adaptée à votre modèle", "Pose sur place à Calavi"],
      ["Custom design or ready-made patterns", "Residue-free quality vinyl", "Cut to fit your exact model", "On-site application in Calavi"],
    ),
    priceFrom: 7000,
  },
  {
    slug: "revetement-pc-entreprise",
    category: "graphic",
    image: imgRevetementPc,
    name: t5("Revêtement PC — Pack Entreprise", "Laptop Skins — Business Pack"),
    short: t5("Un parc informatique aux couleurs de votre société.", "Brand your whole computer fleet."),
    description: t5(
      "Habillage en série des ordinateurs de votre équipe : même design, logo et couleurs sur tout le parc, pour une image professionnelle homogène.",
      "Batch skinning for your team's computers: same design, logo and colors across the fleet for a consistent professional image.",
    ),
    features: tl(
      ["À partir de 5 ordinateurs", "Design unique validé avant production", "Tarif dégressif", "Pose incluse"],
      ["From 5 computers", "Single approved design", "Volume discount", "Application included"],
    ),
    priceFrom: 30000,
  },


  // ---------- NOUVEAUX PRODUITS WEB ----------
  {
    slug: "site-immobilier",
    category: "web",
    image: imgVitrine,
    name: t5("Site Immobilier", "Real Estate Website"),
    short: t5("Plateforme pour agences et promoteurs immobiliers.", "Platform for real estate agencies and developers."),
    description: t5(
      "Site immobilier complet : catalogue de biens, filtres avancés, galerie photos, formulaire de visite, espace agent.",
      "Full real estate site: listings, advanced filters, photo galleries, viewing form, agent area.",
    ),
    features: tl(
      ["Catalogue de biens", "Filtres avancés", "Galerie & visite virtuelle", "Espace agent", "Multi-langues"],
      ["Listings catalog", "Advanced filters", "Gallery & virtual tour", "Agent area", "Multi-language"],
    ),
    priceFrom: 400000,
  },
  {
    slug: "site-restaurant",
    category: "web",
    image: imgVitrine,
    name: t5("Site Restaurant & Réservation", "Restaurant & Booking Website"),
    short: t5("Site avec menu, réservation et commande en ligne.", "Site with menu, booking and online ordering."),
    description: t5(
      "Site web pour restaurants : menu digital, système de réservation de table et commande en ligne avec paiement Mobile Money.",
      "Restaurant website: digital menu, table booking and online ordering with Mobile Money payment.",
    ),
    features: tl(
      ["Menu digital", "Réservation en ligne", "Commande & livraison", "Paiement Mobile Money"],
      ["Digital menu", "Online booking", "Order & delivery", "Mobile Money payment"],
    ),
    priceFrom: 220000,
  },
  {
    slug: "site-ecole-formation",
    category: "web",
    image: imgDashboard,
    name: t5("Site École / Formation en ligne", "School / E-learning Site"),
    short: t5("Plateforme de cours en ligne avec espace élève.", "E-learning platform with student area."),
    description: t5(
      "Plateforme de formation en ligne : catalogue de cours, inscriptions, espace élève, suivi de progression, certificats.",
      "E-learning platform: course catalog, enrollment, student area, progress tracking, certificates.",
    ),
    features: tl(
      ["Catalogue de cours", "Espace élève", "Vidéos & quiz", "Certificats PDF", "Paiement intégré"],
      ["Course catalog", "Student area", "Videos & quizzes", "PDF certificates", "Integrated payment"],
    ),
    priceFrom: 450000,
  },
  {
    slug: "application-mobile",
    category: "web",
    image: imgSaas,
    name: t5("Application Mobile (iOS & Android)", "Mobile App (iOS & Android)"),
    short: t5("App mobile cross-platform pour votre activité.", "Cross-platform mobile app for your business."),
    description: t5(
      "Développement d'application mobile cross-platform (iOS + Android) sur mesure, publication sur App Store et Google Play.",
      "Custom cross-platform mobile app (iOS + Android), published to App Store and Google Play.",
    ),
    features: tl(
      ["iOS + Android", "Notifications push", "Auth & profils", "Publication stores incluse"],
      ["iOS + Android", "Push notifications", "Auth & profiles", "Store publication included"],
    ),
    priceFrom: 900000,
  },
  {
    slug: "refonte-site-web",
    category: "web",
    image: imgVitrine,
    name: t5("Refonte de Site Web", "Website Redesign"),
    short: t5("Modernisez votre site existant, sans repartir de zéro.", "Modernize your existing site without starting over."),
    description: t5(
      "Audit complet de votre site actuel puis refonte design + technique pour le rendre moderne, rapide et mobile-friendly.",
      "Full audit of your current site then design + technical redesign — modern, fast, mobile-friendly.",
    ),
    features: tl(
      ["Audit UX/SEO", "Nouveau design", "Migration contenu", "Optimisation vitesse", "Responsive"],
      ["UX/SEO audit", "New design", "Content migration", "Speed optimization", "Responsive"],
    ),
    priceFrom: 180000,
  },
  {
    slug: "maintenance-site",
    category: "web",
    image: imgDashboard,
    name: t5("Maintenance & Hébergement", "Maintenance & Hosting"),
    short: t5("Votre site à jour, sécurisé et toujours en ligne.", "Your site up-to-date, secure and always online."),
    description: t5(
      "Forfait mensuel de maintenance : mises à jour, sauvegardes, sécurité, hébergement, support technique et petites modifications.",
      "Monthly maintenance plan: updates, backups, security, hosting, tech support and small edits.",
    ),
    features: tl(
      ["Sauvegardes hebdo", "Mises à jour sécurité", "Hébergement inclus", "Support prioritaire", "2h de modifs/mois"],
      ["Weekly backups", "Security updates", "Hosting included", "Priority support", "2h edits/month"],
    ),
    priceFrom: 25000,
  },
  {
    slug: "seo-referencement",
    category: "web",
    image: imgIA,
    name: t5("SEO & Référencement Google", "SEO & Google Ranking"),
    short: t5("Apparaissez en première page de Google.", "Get to Google's first page."),
    description: t5(
      "Optimisation SEO complète de votre site : audit, mots-clés, contenu, vitesse, backlinks pour grimper dans Google.",
      "Full SEO optimization: audit, keywords, content, speed, backlinks to climb Google rankings.",
    ),
    features: tl(
      ["Audit SEO complet", "30 mots-clés ciblés", "Optimisation on-page", "Rapport mensuel", "Google Analytics"],
      ["Full SEO audit", "30 target keywords", "On-page optimization", "Monthly report", "Google Analytics"],
    ),
    priceFrom: 75000,
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const formatXOF = (n: number) => `${n.toLocaleString("fr-FR")} F`;
