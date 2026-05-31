import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { getProduct, formatXOF } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";


function ShopDetail() {
  const params = useParams<{ slug: string }>();
  const product = getProduct(params.slug!);
  if (!product) {
    return <div className="container-tight py-20 text-center"><h1 className="text-2xl font-bold">Produit introuvable</h1></div>;
  }
  const { t, lang } = useI18n();
  const { add } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("product.back")}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface shadow-elegant">
            <img loading="lazy" decoding="async"
              src={product.image}
              alt={product.name[lang]}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
              {product.category === "graphic" ? t("shop.graphic") : t("shop.web")}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name[lang]}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.short[lang]}</p>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">{t("services.from")}</span>
            <span className="text-3xl font-bold text-primary">{formatXOF(product.priceFrom)}</span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description[lang]}</p>

          <div className="mt-8 rounded-xl border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("product.features")}</h3>
            <ul className="mt-4 space-y-2.5">
              {product.features[lang].map((f: string) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground glow-primary"
              onClick={() => { add(product.slug); toast.success(`${product.name[lang]} ajouté au panier`); }}
            >
              {t("product.order")}
            </Button>
            <a
              href={`https://wa.me/2290145764494?text=${encodeURIComponent(`Bonjour, je suis intéressé par : ${product.name.fr}`)}`}
              target="_blank" rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-border bg-surface">WhatsApp</Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ShopDetail;
