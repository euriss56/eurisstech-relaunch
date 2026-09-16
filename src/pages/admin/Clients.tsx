import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Plus, Pencil, FileText } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatFCFA, type ClientRow, type InvoiceRow } from "@/lib/invoices";

const empty = { name: "", email: "", address: "", phone: "" };

export default function AdminClients() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const qc = useQueryClient();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const { data: clients } = useQuery({
    queryKey: ["admin-clients"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await db.from("clients").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as ClientRow[];
    },
  });

  const { data: invoices } = useQuery({
    queryKey: ["admin-invoices-min"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await db.from("invoices").select("id,number,client_id,total,status");
      if (error) throw error;
      return data as InvoiceRow[];
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!form.name.trim()) throw new Error("Le nom est obligatoire");
      const payload = {
        name: form.name.trim(),
        email: form.email.trim() || null,
        address: form.address.trim() || null,
        phone: form.phone.trim() || null,
      };
      const q = editing
        ? db.from("clients").update(payload).eq("id", editing)
        : db.from("clients").insert(payload);
      const { error } = await q;
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(editing ? "Client modifié" : "Client créé");
      setForm(empty);
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
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
          <Link to="/account" className="text-primary underline">Se connecter</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-sm text-muted-foreground">Carnet clients et historique de facturation</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/admin/invoices"><Button variant="outline">Factures</Button></Link>
            <Link to="/admin"><Button variant="ghost">Admin</Button></Link>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold">{editing ? "Modifier le client" : "Nouveau client"}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input placeholder="Nom *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Téléphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input placeholder="Adresse" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => save.mutate()} disabled={save.isPending}>
              <Plus className="mr-2 h-4 w-4" /> {editing ? "Enregistrer" : "Ajouter"}
            </Button>
            {editing && (
              <Button variant="ghost" onClick={() => { setEditing(null); setForm(empty); }}>Annuler</Button>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {(clients ?? []).length === 0 && (
            <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted-foreground">Aucun client.</p>
          )}
          {(clients ?? []).map((c) => {
            const list = (invoices ?? []).filter((i) => i.client_id === c.id);
            const paid = list.filter((i) => i.status === "PAID").reduce((s, i) => s + Number(i.total), 0);
            return (
              <div key={c.id} className="rounded-xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[c.email, c.phone, c.address].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {list.length} facture{list.length > 1 ? "s" : ""} · {formatFCFA(paid)} encaissés
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditing(c.id);
                        setForm({
                          name: c.name,
                          email: c.email ?? "",
                          address: c.address ?? "",
                          phone: c.phone ?? "",
                        });
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {list.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {list.map((i) => (
                      <Link
                        key={i.id}
                        to={`/admin/invoices/${i.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-[11px] hover:border-primary hover:text-primary"
                      >
                        <FileText className="h-3 w-3" /> {i.number}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
