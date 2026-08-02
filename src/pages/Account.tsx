import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { formatXOF } from "@/lib/products";


function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.12A6.61 6.61 0 0 1 5.5 12c0-.74.13-1.46.34-2.12V7.04H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.96l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}

function Account() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Chargement…</div>;
  return user ? <Dashboard onSignOut={signOut} /> : <AuthForms />;
}

function AuthForms() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [reg, setReg] = useState({ name: "", email: "", password: "" });

  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const googleAvailable =
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".lovable.app") || host.endsWith(".lovable.dev");

  const handleGoogle = async () => {
    if (!googleAvailable) {
      toast.error("Connexion Google indisponible sur ce domaine. Utilisez l'email et le mot de passe.");
      return;
    }
    setBusy(true);
    try {
      const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/account" });
      if (r.error) toast.error("Échec connexion Google");
    } finally { setBusy(false); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword(login);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Bienvenue !");
    navigate("/account");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: reg.email,
      password: reg.password,
      options: { emailRedirectTo: `${window.location.origin}/account`, data: { full_name: reg.name } },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Compte créé. Vérifiez votre email pour confirmer.");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl gradient-primary text-primary-foreground glow-primary">
            <User className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">Mon compte</h1>
          <p className="mt-2 text-sm text-muted-foreground">Suivez vos commandes et gérez votre profil.</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          {googleAvailable && (
            <>
              <Button type="button" onClick={handleGoogle} disabled={busy} variant="outline" className="w-full gap-2 border-border bg-background hover:bg-surface-elevated">
                <GoogleIcon /> Continuer avec Google
              </Button>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> ou <div className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-5">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5"><Label htmlFor="le">Email</Label><Input id="le" type="email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} required /></div>
                <div className="space-y-1.5"><Label htmlFor="lp">Mot de passe</Label><Input id="lp" type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} required /></div>
                <Button type="submit" disabled={busy} className="w-full gradient-primary text-primary-foreground"><LogIn className="mr-2 h-4 w-4" /> Se connecter</Button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="mt-5">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1.5"><Label htmlFor="rn">Nom complet</Label><Input id="rn" value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} required /></div>
                <div className="space-y-1.5"><Label htmlFor="re">Email</Label><Input id="re" type="email" value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} required /></div>
                <div className="space-y-1.5"><Label htmlFor="rp">Mot de passe</Label><Input id="rp" type="password" value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} minLength={6} required /></div>
                <Button type="submit" disabled={busy} className="w-full gradient-primary text-primary-foreground">Créer mon compte</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface OrderRow {
  id: string;
  status: string;
  total: number;
  currency: string;
  created_at: string;
  order_items: { product_name: string; qty: number; unit_price: number }[];
}

function Dashboard({ onSignOut }: { onSignOut: () => Promise<void> }) {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const { data: orders } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id,status,total,currency,created_at,order_items(product_name,qty,unit_price)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as OrderRow[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="grid h-14 w-14 place-items-center rounded-xl gradient-primary text-primary-foreground glow-primary">
              <User className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-3xl font-bold">Bonjour {user?.user_metadata?.full_name ?? user?.email}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={onSignOut} className="border-border bg-surface"><LogOut className="mr-2 h-4 w-4" /> Déconnexion</Button>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Mes commandes</h2>
        {!orders || orders.length === 0 ? (
          <div className="mt-4 rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted-foreground">
            Aucune commande pour le moment.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("fr-FR")}</p>
                    <p className="mt-1 font-semibold">#{o.id.slice(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{o.status}</span>
                    <p className="mt-1 font-bold text-primary">{formatXOF(o.total)}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {o.order_items.map((it, i) => (
                    <li key={i}>• {it.product_name} × {it.qty} — {formatXOF(it.unit_price * it.qty)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
