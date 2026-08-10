import blogBranding from "@/assets/blog/blog-branding.jpg";
import blogWeb from "@/assets/blog/blog-web.jpg";
import blogPromo from "@/assets/blog/blog-promo.jpg";
import blogMomo from "@/assets/blog/blog-momo.jpg";
import blogSocial from "@/assets/blog/blog-social.jpg";
import blogPrint from "@/assets/blog/blog-print.jpg";
import blogRepair from "@/assets/services/phone-repair.jpg";

export const COVER_BY_SLUG: Record<string, string> = {
  "reparation-ecran-smartphone-calavi": blogRepair,
  "logo-impact-marque": blogBranding,
  "site-vitrine-pourquoi": blogWeb,
  "promo-rentree-2026": blogPromo,
  "mobile-money-paiement": blogMomo,
  "reseaux-sociaux-bj": blogSocial,
  "flyer-vs-bache": blogPrint,
};

export const COVER_BY_TAG: Record<string, string> = {
  Branding: blogBranding,
  Web: blogWeb,
  Promo: blogPromo,
  Tutoriel: blogMomo,
  Stratégie: blogSocial,
  Marketing: blogPrint,
  "Réparation": blogRepair,
};

export function coverFor(slug: string, tag?: string | null) {
  return COVER_BY_SLUG[slug] ?? (tag ? COVER_BY_TAG[tag] : undefined) ?? blogBranding;
}

export function readingTime(content?: string | null) {
  const words = (content ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
