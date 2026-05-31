import {Link} from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatXOF } from "@/lib/products";


function Cart() {
  const { t, lang } = useI18n();
  const { enriched, total, setQty, remove, clear } = useCart();

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">{t("cart.title")}</h1>

      {enriched.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border bg-surface p-12 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">{t("cart.empty")}</p>
          <Link to="/shop" className="mt-6 inline-flex">
            <Button className="gradient-primary text-primary-foreground">{t("cart.continue")}</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {enriched.map(({ product, qty }) => (
              <div key={product.slug} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-elevated">
                  <img loading="lazy" decoding="async" src={product.image} alt={product.name[lang]} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="truncate font-semibold">{product.name[lang]}</h3>
                  <p className="text-sm text-primary">{formatXOF(product.priceFrom)}</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-1">
                  <button onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center rounded text-muted-foreground hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-6 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center rounded text-muted-foreground hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => remove(product.slug)} aria-label={t("cart.remove")} className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">Vider le panier</button>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
            <h2 className="font-semibold">Récapitulatif</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("cart.total")}</span>
              <span className="text-2xl font-bold text-primary">{formatXOF(total)}</span>
            </div>
            <Link to="/checkout" className="mt-5 block">
              <Button size="lg" className="w-full gradient-primary text-primary-foreground glow-primary">
                Payer maintenant
              </Button>
            </Link>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">Paiement Mobile Money MTN ou Moov.</p>
            <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">{t("cart.continue")}</Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
