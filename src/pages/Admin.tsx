import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { formatXOF } from "@/lib/products";

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

export default function Admin() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();

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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground glow-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Administration</h1>
            <p className="text-sm text-muted-foreground">Messages et commandes Eurisstech</p>
          </div>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Messages de contact</h2>
        {!messages || messages.length === 0 ? (
          <p className="mt-4 rounded-xl border border-border bg-surface p-6 text-sm text-muted-foreground">Aucun message.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("fr-FR")}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{m.email} · {m.phone}</p>
                <p className="mt-3 whitespace-pre-line text-sm">{m.message}</p>
              </div>
            ))}
          </div>
        )}

        <h2 className="mt-12 text-xl font-semibold">Commandes</h2>
        {!orders || orders.length === 0 ? (
          <p className="mt-4 rounded-xl border border-border bg-surface p-6 text-sm text-muted-foreground">Aucune commande.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5">
                <div>
                  <p className="font-semibold">#{o.id.slice(0, 8)} — {o.customer_name ?? "—"}</p>
                  <p className="text-xs text-muted-foreground">{o.customer_phone} · {new Date(o.created_at).toLocaleString("fr-FR")}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{o.status}</span>
                  <p className="mt-1 font-bold text-primary">{formatXOF(o.total)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
