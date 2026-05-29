import { useSearchParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PRODUCTS, formatXOF, type Category } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

type Search = { cat?: Category | "all" };

({
  head: () => ({
    meta: [
      { title: "Boutique — F.MotivTech" },
      { name: "description", content: "Catalogue F.MotivTech : créations graphiques et sites web professionnels au Bénin." },
      { property: "og:title", content: "Boutique — F.MotivTech" },
      { property: "og:description", content: "Découvrez nos services de graphisme et de développement web." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: (s.cat === "graphic" || s.cat === "web" || s.cat === "all" ? s.cat : undefined) as Search["cat"],
  }),
  component: Shop,
});

function Shop() {
  const { t, lang } = useI18n();
  const { add } = useCart();
  const [sp] = useSearchParams();
  const search = { cat: sp.get("cat") as "graphic" | "web" | "all" | null };
  const [filter, setFilter] = useState<"all" | Category>(search.cat ?? "all");

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const tabs: { key: "all" | Category; label: string }[] = [
    { key: "all", label: t("shop.all") },
    { key: "graphic", label: t("shop.graphic") },
    { key: "web", label: t("shop.web") },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("shop.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("shop.subtitle")}</p>
      </header>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              filter === tab.key
                ? "border-primary gradient-primary text-primary-foreground shadow-card"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-card"
          >
            <Link to={`/shop/${p.slug}`} className="block">
              <div className="relative h-48 overflow-hidden bg-surface-elevated">
                <img
                  src={p.image}
                  alt={p.name[lang]}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground backdrop-blur">
                  {p.category === "graphic" ? t("shop.graphic") : t("shop.web")}
                </div>
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <Link to={`/shop/${p.slug}`}>
                <h3 className="font-semibold transition-colors group-hover:text-primary">{p.name[lang]}</h3>
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.short[lang]}</p>
              <div className="mt-4 flex flex-1 items-end justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{t("services.from")}</p>
                  <p className="text-lg font-bold text-primary">{formatXOF(p.priceFrom)}</p>
                </div>
                <Button
                  size="sm"
                  className="gradient-primary text-primary-foreground"
                  onClick={() => { add(p.slug); toast.success(`${p.name[lang]} ajouté au panier`); }}
                >
                  {t("shop.order")}
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default Shop;
