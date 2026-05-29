import { useI18n } from "@/lib/i18n";
import { Flame, Megaphone } from "lucide-react";

export function PromoBanner() {
  const { t } = useI18n();
  const items = [
    { icon: <Flame className="h-3.5 w-3.5" />, text: t("promo.banner") },
    { icon: <Megaphone className="h-3.5 w-3.5" />, text: "Sites web professionnels sur mesure" },
    { icon: <Flame className="h-3.5 w-3.5" />, text: "Graphisme & identité visuelle" },
    { icon: <Megaphone className="h-3.5 w-3.5" />, text: "Solutions IA pour votre entreprise" },
    { icon: <Flame className="h-3.5 w-3.5" />, text: "Impression & supports marketing" },
    { icon: <Megaphone className="h-3.5 w-3.5" />, text: "Gestion des réseaux sociaux" },
  ];

  return (
    <div className="relative z-50 w-full gradient-primary text-primary-foreground overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-2 mx-6 text-xs font-medium sm:text-sm">
            {item.icon}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
