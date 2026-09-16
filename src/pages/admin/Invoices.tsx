import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/useIsAdmin";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  INVOICE_STATUSES,
  formatDate,
  formatFCFA,
  invoiceStatusClass,
  invoiceStatusLabel,
  type ClientRow,
  type InvoiceRow,
} from "@/lib/invoices";

export default function AdminInvoices() {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [status, setStatus] = useState("all");
  const [clientId, setClientId] = useState("all");

  const { data: clients } = useQuery({
    queryKey: ["admin-clients"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await db.from("clients").select("*").order("name");
      if (error) throw error;
      return data as ClientRow[];
    },
  });

  const { data: invoices } = useQuery({
    queryKey: ["admin-invoices"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await db
        .from("invoices")
        .select("*, clients(*)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as InvoiceRow[];
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
          <Link to="/account" className="text-primary underline">Se connecter</Link>
        </p>
      </div>
    );
  }

  const rows = (invoices ?? []).filter(
    (i) => (status === "all" || i.status === status) && (clientId === "all" || i.client_id === clientId),
  );
  const totalPaid = rows.filter((i) => i.status === "PAID").reduce((s, i) => s + Number(i.total), 0);
  const totalDue = rows
    .filter((i) => i.status === "SENT" || i.status === "OVERDUE")
    .reduce((s, i) => s + Number(i.total), 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Factures</h1>
            <p className="text-sm text-muted-foreground">Suivi de la facturation Eurisstech</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Link to="/admin/clients"><Button variant="outline">Clients</Button></Link>
            <Link to="/admin/invoices/new">
              <Button><Plus className="mr-2 h-4 w-4" /> Nouvelle facture</Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Factures</p>
            <p className="mt-1 text-2xl font-bold">{rows.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Encaissé</p>
            <p className="mt-1 text-2xl font-bold text-primary">{formatFCFA(totalPaid)}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">En attente</p>
            <p className="mt-1 text-2xl font-bold">{formatFCFA(totalDue)}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-48 border-border bg-background"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {INVOICE_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>{invoiceStatusLabel(s)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={clientId} onValueChange={setClientId}>
            <SelectTrigger className="w-56 border-border bg-background"><SelectValue placeholder="Client" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les clients</SelectItem>
              {(clients ?? []).map((c) => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 space-y-3">
          {rows.length === 0 && (
            <p className="rounded-xl border border-border bg-surface p-6 text-sm text-muted-foreground">
              Aucune facture pour ce filtre.
            </p>
          )}
          {rows.map((i) => (
            <Link
              key={i.id}
              to={`/admin/invoices/${i.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50"
            >
              <div>
                <p className="font-semibold">{i.number} — {i.clients?.name ?? "—"}</p>
                <p className="text-xs text-muted-foreground">
                  Émise le {formatDate(i.issue_date)} · Échéance {formatDate(i.due_date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wide ${invoiceStatusClass(i.status)}`}>
                  {invoiceStatusLabel(i.status)}
                </span>
                <p className="font-bold text-primary">{formatFCFA(Number(i.total))}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
