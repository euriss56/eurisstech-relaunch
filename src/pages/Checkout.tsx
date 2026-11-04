import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { Copy, Smartphone, Check, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { formatXOF } from "@/lib/products";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { id: "mtn", label: "MTN Mobile Money", number: "01 96 16 57 00", color: "from-yellow-400 to-yellow-500" },
  { id: "moov", label: "Moov Money", number: "01 55 54 71 72", color: "from-sky-400 to-blue-500" },
  { id: "celtiis", label: "Celtiis Cash", number: "01 41 67 57 84", color: "from-red-500 to-rose-600" },
] as const;


function Checkout() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { enriched, total, clear } = useCart();
  const { user } = useAuth();

  const [method, setMethod] = useState<"mtn" | "moov" | "celtiis">("mtn");
  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const active = PAYMENT_METHODS.find((m) => m.id === method)!;

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Numéro copié.");
    } catch {
      toast.error("Copie impossible sur cet appareil. Veuillez sélectionner le numéro.");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !reference) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    if (enriched.length === 0) {
      toast.error("Votre panier est vide.");
      return;
    }
    // Open a tab directly from the submit gesture so browsers do not block
    // WhatsApp after the asynchronous database request.
    const whatsappWindow = window.open("about:blank", "_blank");
    setLoading(true);
    try {
      if (user) {
        const { data: order, error } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            total,
            currency: "XOF",
            customer_name: name,
            customer_phone: phone,
            payment_method: active.label,
            payment_phone: active.number,
            payment_reference: reference,
            status: "pending",
          })
          .select("id")
          .single();

        if (error) throw error;
        if (order) {
          const { error: itemsError } = await supabase.from("order_items").insert(
            enriched.map((e) => ({
              order_id: order.id,
              product_slug: e.product.slug,
              product_name: e.product.name.fr,
              qty: e.qty,
              unit_price: e.product.priceFrom,
            })),
          );
          if (itemsError) {
            console.error("Order created but its items could not be saved:", { orderId: order.id, itemsError });
            throw new Error(`La commande #${order.id.slice(0, 8)} a été créée, mais ses articles n'ont pas pu être enregistrés. Contactez-nous avant de refaire le paiement.`);
          }
        }
      }

      // Notify the team on WhatsApp with full payment info
      const lines = enriched
        .map((e) => `• ${e.product.name.fr} x${e.qty} — ${formatXOF(e.product.priceFrom * e.qty)}`)
        .join("\n");
      const msg = [
        "🛒 Nouvelle commande Eurisstech",
        `Client : ${name}`,
        `Téléphone : ${phone}`,
        "",
        lines,
        "",
        `Total : ${formatXOF(total)}`,
        `Paiement : ${active.label}`,
        `Numéro destinataire : ${active.number}`,
        `Référence transaction : ${reference}`,
        user ? "Compte client : commande enregistrée sur le site." : "Commande invitée : demande transmise par WhatsApp.",
      ].join("\n");
      const whatsappUrl = `https://wa.me/2290141675784?text=${encodeURIComponent(msg)}`;
      if (whatsappWindow) {
        whatsappWindow.opener = null;
        whatsappWindow.location.href = whatsappUrl;
      } else if (!user) {
        // Popup blockers may prevent a new tab; preserve the guest checkout
        // by navigating this tab to the prepared WhatsApp message.
        window.location.assign(whatsappUrl);
        return;
      } else {
        toast.error("WhatsApp n'a pas pu s'ouvrir. Réessayez depuis votre commande.");
      }

      toast.success(user
        ? "Commande enregistrée. Nous allons vérifier votre paiement."
        : "Votre demande de commande est prête dans WhatsApp. Envoyez le message pour la transmettre.");
      clear();
      navigate(user ? "/account" : "/");
    } catch (err) {
      whatsappWindow?.close();
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Erreur lors de l'enregistrement. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (enriched.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Aucun article à régler</h1>
        <Link to="/shop" className="mt-4 inline-flex">
          <Button className="mt-4 gradient-primary text-primary-foreground">Voir la boutique</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour au panier
      </Link>
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Paiement Mobile Money</h1>
      <p className="mt-2 text-muted-foreground">
        Choisissez votre opérateur, envoyez le montant au numéro indiqué, puis collez la référence
        de la transaction. Votre commande sera validée après vérification.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left: payment instructions + form */}
        <div className="space-y-6">
          {/* Method picker */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMethod(m.id)}
                className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                  method === m.id
                    ? "border-primary shadow-elegant ring-2 ring-primary/30"
                    : "border-border bg-surface hover:border-primary/50"
                }`}
              >
                <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${m.color} opacity-20`} />
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${m.color} text-white`}>
                    <Smartphone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.number}</p>
                  </div>
                  {method === m.id && (
                    <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Step instructions */}
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">Comment payer en 3 étapes</h2>
            <ol className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">1</span>
                <div>
                  <p className="font-medium">Ouvrez votre application {active.label}</p>
                  <p className="text-muted-foreground">Ou composez le code USSD de votre opérateur.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">2</span>
                <div className="flex-1">
                  <p className="font-medium">Envoyez {formatXOF(total)} au numéro&nbsp;:</p>
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-border bg-background p-3">
                    <span className="font-mono text-base font-semibold text-primary">{active.number}</span>
                    <button type="button" onClick={() => copy(active.number)} className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Copier le numéro">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">3</span>
                <div>
                  <p className="font-medium">Notez la référence de transaction reçue par SMS et collez-la ci-dessous.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <h2 className="text-lg font-semibold">Confirmer votre paiement</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Votre nom" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone utilisé</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+229..." className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="reference">Référence de la transaction Mobile Money</Label>
              <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} required placeholder="Ex : MP240529.1234.A12345" className="mt-1.5" />
              <p className="mt-1 text-xs text-muted-foreground">Numéro reçu par SMS après votre transfert.</p>
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full gradient-primary text-primary-foreground glow-primary">
              {loading ? "Validation..." : `Valider le paiement de ${formatXOF(total)}`}
            </Button>
            {!user && (
              <p className="text-center text-[11px] text-muted-foreground">
                <Link to="/account" className="underline">Connectez-vous</Link> pour conserver l'historique de vos commandes.
              </p>
            )}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Vos informations restent confidentielles.
            </p>
          </form>
        </div>

        {/* Right: summary */}
        <aside className="h-fit rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="font-semibold">Votre commande</h2>
          <ul className="mt-4 space-y-3">
            {enriched.map(({ product, qty }) => (
              <li key={product.slug} className="flex items-center gap-3 text-sm">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-elevated">
                  <img loading="lazy" decoding="async" src={product.image} alt={product.name[lang]} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{product.name[lang]}</p>
                  <p className="text-xs text-muted-foreground">x{qty} · {formatXOF(product.priceFrom)}</p>
                </div>
                <span className="text-sm font-semibold">{formatXOF(product.priceFrom * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total à régler</span>
              <span className="text-2xl font-bold text-primary">{formatXOF(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
