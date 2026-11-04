import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, LayoutDashboard, MessageSquare, Package, Receipt, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { formatXOF } from "@/lib/products";
import { BlogManager } from "@/components/admin/BlogManager";
import { InvoiceManager } from "@/components/admin/InvoiceManager";
import { ORDER_STATUSES, orderStatusLabel, orderStatusClass } from "@/lib/orderStatus";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MessageRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  created_at: string;
}

interface OrderRow {
  id: string;
  status: string;
  total: number;
  customer_name: string | null;
  customer_phone: string | null;
  created_at: string;
}

const sections = [
  { id: "overview", label: "Vue d’ensemble", icon: LayoutDashboard },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "orders", label: "Commandes", icon: Package },
  { id: "invoices", label: "Facturation", icon: Receipt },
  { id: "blog", label: "Blog", icon: BookOpen },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function Admin() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const { data: messages } = useQuery({
    queryKey: ["admin-messages"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("id,name,email,phone,message,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as MessageRow[];
    },
  });

  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,status,total,customer_name,customer_phone,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as OrderRow[];
    },
  });

  const qc = useQueryClient();
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Statut mis à jour");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (loading || roleLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Chargement…</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Accès réservé</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page est réservée à l'administrateur.{" "}
          <Link to="/account" className="text-primary underline">Se connecter</Link>
        </p>
      </div>
    );
  }

  const paidOrders = (orders ?? []).filter((order) => order.status === "completed");
  const totalOrders = (orders ?? []).reduce((sum, order) => sum + Number(order.total || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground glow-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Administration</h1>
            <p className="text-sm text-muted-foreground">Gère ton activité EURISS TECH depuis un seul espace.</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <nav aria-label="Sections de l’administration" className="h-fit rounded-2xl border border-border bg-card p-2 shadow-sm">
            <p className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Menu principal</p>
            <div className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full ${
                    activeSection === id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {id === "messages" && !!messages?.length && (
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${activeSection === id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {messages.length}
                    </span>
                  )}
                  {id === "orders" && !!orders?.length && (
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-xs ${activeSection === id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {orders.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>

          <main className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
            {activeSection === "overview" && (
              <section className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Tableau de bord</p>
                  <h2 className="mt-1 text-2xl font-bold">Vue d’ensemble</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Choisis une rubrique dans le menu pour accéder directement à sa gestion.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <button onClick={() => setActiveSection("messages")} className="rounded-xl border border-border bg-background p-5 text-left transition hover:border-primary/50 hover:shadow-sm">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-2xl font-bold">{messages?.length ?? 0}</p>
                    <p className="text-sm font-medium">Messages reçus</p>
                    <p className="mt-1 text-xs text-muted-foreground">Consulter les demandes de contact</p>
                  </button>
                  <button onClick={() => setActiveSection("orders")} className="rounded-xl border border-border bg-background p-5 text-left transition hover:border-primary/50 hover:shadow-sm">
                    <Package className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-2xl font-bold">{orders?.length ?? 0}</p>
                    <p className="text-sm font-medium">Commandes</p>
                    <p className="mt-1 text-xs text-muted-foreground">Suivre les commandes clients</p>
                  </button>
                  <button onClick={() => setActiveSection("invoices")} className="rounded-xl border border-border bg-background p-5 text-left transition hover:border-primary/50 hover:shadow-sm">
                    <Receipt className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-lg font-bold">Facturation</p>
                    <p className="mt-1 text-xs text-muted-foreground">Clients, factures et suivi financier</p>
                  </button>
                  <button onClick={() => setActiveSection("blog")} className="rounded-xl border border-border bg-background p-5 text-left transition hover:border-primary/50 hover:shadow-sm">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <p className="mt-4 text-lg font-bold">Gestion du blog</p>
                    <p className="mt-1 text-xs text-muted-foreground">Gérer les articles du site</p>
                  </button>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="text-xs text-muted-foreground">Valeur totale des commandes</p>
                    <p className="mt-4 text-2xl font-bold">{formatXOF(totalOrders)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{paidOrders.length} commande(s) terminée(s)</p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "messages" && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Messages de contact</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{messages?.length ?? 0} message(s) reçu(s)</p>
                </div>
                {!messages?.length ? (
                  <p className="rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground">Aucun message pour le moment.</p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <article key={m.id} className="rounded-xl border border-border bg-background p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-semibold">{m.name}</p>
                          <time className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("fr-FR")}</time>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{m.email || "—"} · {m.phone || "—"}</p>
                        <p className="mt-3 whitespace-pre-line text-sm">{m.message}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeSection === "orders" && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Commandes</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{orders?.length ?? 0} commande(s) enregistrée(s)</p>
                </div>
                {!orders?.length ? (
                  <p className="rounded-xl border border-border bg-background p-6 text-sm text-muted-foreground">Aucune commande pour le moment.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.map((o) => (
                      <article key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-5">
                        <div>
                          <p className="font-semibold">#{o.id.slice(0, 8)} — {o.customer_name ?? "—"}</p>
                          <p className="text-xs text-muted-foreground">{o.customer_phone || "—"} · {new Date(o.created_at).toLocaleString("fr-FR")}</p>
                          <p className="mt-2 font-bold text-primary">{formatXOF(o.total)}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wide ${orderStatusClass(o.status)}`}>
                            {orderStatusLabel(o.status)}
                          </span>
                          <Select value={o.status} onValueChange={(v) => updateStatus.mutate({ id: o.id, status: v })}>
                            <SelectTrigger className="w-40 border-border bg-background"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {ORDER_STATUSES.map((s) => <SelectItem key={s} value={s}>{orderStatusLabel(s)}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {activeSection === "invoices" && <InvoiceManager />}
            {activeSection === "blog" && <BlogManager />}
          </main>
        </div>
      </div>
    </div>
  );
}
