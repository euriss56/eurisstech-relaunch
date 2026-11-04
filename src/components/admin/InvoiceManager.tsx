import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CalendarDays, CheckCircle2, Clock3, FilePlus2, Printer, Plus, Receipt, TrendingUp, Users, Wallet, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatXOF } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Client = { id: string; name: string; email: string | null; phone: string | null; address: string | null };
type Invoice = { id: string; number: string; client_id: string; status: string; issue_date: string; due_date: string | null; subtotal: number; tax: number; total: number; notes: string | null };
type Item = { id: string; invoice_id: string; description: string; quantity: number; unit_price: number; total: number };
type Line = { description: string; quantity: string; unit_price: string };
const db = supabase as any;
const blankLine = (): Line => ({ description: "", quantity: "1", unit_price: "" });
const statuses: Record<string, string> = { DRAFT: "Brouillon", SENT: "Envoyée", PAID: "Payée", OVERDUE: "En retard", CANCELLED: "Annulée" };

export function InvoiceManager() {
  const qc = useQueryClient();
  const [clientForm, setClientForm] = useState(false);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState(""); const [address, setAddress] = useState("");
  const [clientId, setClientId] = useState(""); const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0,10)); const [dueDate, setDueDate] = useState(""); const [taxRate, setTaxRate] = useState("0"); const [notes, setNotes] = useState(""); const [lines, setLines] = useState<Line[]>([blankLine()]); const [detailsId, setDetailsId] = useState("");
  const { data: clients = [] } = useQuery<Client[]>({ queryKey:["invoice-clients"], queryFn:async()=>{const {data,error}=await db.from("clients").select("*").order("name");if(error)throw error;return data??[];} });
  const { data: invoices = [], isLoading } = useQuery<Invoice[]>({ queryKey:["invoices"], queryFn:async()=>{const {data,error}=await db.from("invoices").select("*").order("created_at",{ascending:false});if(error)throw error;return data??[];} });
  const today = new Date().toLocaleDateString("en-CA");
  const paidInvoices = invoices.filter(inv => inv.status === "PAID");
  const activeInvoices = invoices.filter(inv => !["PAID", "CANCELLED"].includes(inv.status));
  const overdueInvoices = activeInvoices.filter(inv => inv.status === "OVERDUE" || (!!inv.due_date && inv.due_date < today));
  const collectedTotal = paidInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
  const billedTotal = invoices.filter(inv => inv.status !== "CANCELLED").reduce((sum, inv) => sum + Number(inv.total || 0), 0);
  const receivableTotal = activeInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + Number(inv.total || 0), 0);
  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(); date.setDate(1); date.setMonth(date.getMonth() - (5 - index));
    const key = date.toISOString().slice(0, 7);
    return { key, label: date.toLocaleDateString("fr-FR", { month: "short" }), total: invoices.filter(inv => inv.issue_date?.slice(0, 7) === key && inv.status !== "CANCELLED").reduce((sum, inv) => sum + Number(inv.total || 0), 0) };
  });
  const maxMonthly = Math.max(1, ...monthlyData.map(month => month.total));
  const { data: detailItems = [] } = useQuery<Item[]>({ queryKey:["invoice-items",detailsId], enabled:!!detailsId, queryFn:async()=>{const {data,error}=await db.from("invoice_items").select("*").eq("invoice_id",detailsId);if(error)throw error;return data??[];} });
  const subtotal=useMemo(()=>lines.reduce((s,l)=>s+(Number(l.quantity)||0)*(Number(l.unit_price)||0),0),[lines]); const tax=subtotal*(Number(taxRate)||0)/100;
  const addClient=useMutation({mutationFn:async()=>{if(!name.trim())throw new Error("Le nom du client est obligatoire.");const {error}=await db.from("clients").insert({name:name.trim(),email:email||null,phone:phone||null,address:address||null});if(error)throw error;},onSuccess:()=>{toast.success("Client enregistré.");setName("");setEmail("");setPhone("");setAddress("");setClientForm(false);qc.invalidateQueries({queryKey:["invoice-clients"]});},onError:(e:Error)=>toast.error(e.message)});
  const addInvoice=useMutation({mutationFn:async()=>{if(!clientId)throw new Error("Choisis un client.");const valid=lines.filter(l=>l.description.trim()&&Number(l.quantity)>0&&Number(l.unit_price)>=0);if(!valid.length)throw new Error("Ajoute au moins une ligne valide.");const {data,error}=await db.rpc("create_invoice",{_client_id:clientId,_issue_date:issueDate,_due_date:dueDate||null,_tax_rate:Number(taxRate)||0,_notes:notes||null,_items:valid.map(l=>({description:l.description.trim(),quantity:Number(l.quantity),unit_price:Number(l.unit_price)}))});if(error)throw error;return data as string;},onSuccess:(id:string)=>{toast.success("Facture créée.");setDetailsId(id);setLines([blankLine()]);setNotes("");setDueDate("");setTaxRate("0");qc.invalidateQueries({queryKey:["invoices"]});},onError:(e:Error)=>toast.error(e.message)});
  const setStatus=useMutation({mutationFn:async({id,status}:{id:string;status:string})=>{const {error}=await db.from("invoices").update({status}).eq("id",id);if(error)throw error;},onSuccess:()=>{toast.success("Statut mis à jour.");qc.invalidateQueries({queryKey:["invoices"]});},onError:(e:Error)=>toast.error(e.message)});
  const printInvoice=async(inv:Invoice)=>{const client=clients.find(c=>c.id===inv.client_id);let rows=detailsId===inv.id?detailItems:[];if(!rows.length){const {data,error}=await db.from("invoice_items").select("*").eq("invoice_id",inv.id);if(error){toast.error(error.message);return;}rows=data??[];}const safe=(v:string|null|undefined)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!));const html=`<!doctype html><html lang="fr"><meta charset="utf-8"><title>${safe(inv.number)}</title><style>body{font:14px Arial;padding:36px;color:#172033;max-width:800px;margin:auto}h1{color:#0891b2}header{display:flex;justify-content:space-between;border-bottom:2px solid #0891b2}table{width:100%;border-collapse:collapse;margin-top:28px}td,th{padding:12px;border-bottom:1px solid #ddd;text-align:left}.right{text-align:right}.total{text-align:right;font-size:19px;font-weight:bold;margin-top:24px}</style><header><div><h1>EURISS TECH</h1><p>Facture de prestations et produits</p></div><div><h2>${safe(inv.number)}</h2><p>Date : ${safe(inv.issue_date)}</p><p>Échéance : ${safe(inv.due_date)}</p></div></header><h3>Client</h3><p><b>${safe(client?.name)}</b><br>${safe(client?.email)}<br>${safe(client?.phone)}<br>${safe(client?.address)}</p><table><tr><th>Description</th><th>Qté</th><th>Prix unitaire</th><th class="right">Total</th></tr>${rows.map(r=>`<tr><td>${safe(r.description)}</td><td>${r.quantity}</td><td>${formatXOF(r.unit_price)}</td><td class="right">${formatXOF(r.total)}</td></tr>`).join("")}</table><p class="total">Sous-total : ${formatXOF(inv.subtotal)}<br>Taxes : ${formatXOF(inv.tax)}<br>Total : ${formatXOF(inv.total)}</p><p>${safe(inv.notes)}</p><script>window.onload=()=>window.print()</script></html>`;const w=window.open("","_blank");if(!w){toast.error("Autorise les fenêtres pop-up pour imprimer.");return;}w.document.write(html);w.document.close();};
  return <section className="mt-14 space-y-8">
    <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Espace de gestion</p>
        <h2 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight"><Receipt className="h-6 w-6 text-primary"/>Facturation</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pilote tes revenus, tes clients et tes factures depuis un seul espace.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={()=>setClientForm(v=>!v)}><Users className="mr-2 h-4 w-4"/>Nouveau client</Button>
        <Button onClick={()=>document.getElementById("nouvelle-facture")?.scrollIntoView({behavior:"smooth",block:"start"})}><FilePlus2 className="mr-2 h-4 w-4"/>Nouvelle facture</Button>
      </div>
    </div>

    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div><p className="text-sm font-semibold">Vue d'ensemble</p><p className="text-xs text-muted-foreground">Situation financière de ton activité</p></div>
        <span className="text-xs text-muted-foreground">Mis à jour automatiquement</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Chiffre encaissé</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600"><Wallet className="h-5 w-5"/></span></div>
          <p className="mt-5 text-2xl font-bold tracking-tight">{formatXOF(collectedTotal)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{paidInvoices.length} facture(s) payée(s)</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 via-card to-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm font-medium text-muted-foreground">À encaisser</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/15 text-sky-600"><TrendingUp className="h-5 w-5"/></span></div>
          <p className="mt-5 text-2xl font-bold tracking-tight">{formatXOF(receivableTotal)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{activeInvoices.length} facture(s) non soldée(s)</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-card to-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm font-medium text-muted-foreground">En retard</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/15 text-rose-600"><AlertTriangle className="h-5 w-5"/></span></div>
          <p className="mt-5 text-2xl font-bold tracking-tight">{formatXOF(overdueTotal)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{overdueInvoices.length} facture(s) à relancer</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Total facturé</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary"><Receipt className="h-5 w-5"/></span></div>
          <p className="mt-5 text-2xl font-bold tracking-tight">{formatXOF(billedTotal)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{invoices.filter(inv => inv.status !== "CANCELLED").length} facture(s) actives ou payées</p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><h3 className="font-semibold tracking-tight">Évolution de la facturation</h3><p className="mt-1 text-xs text-muted-foreground">Montants émis au cours des 6 derniers mois</p></div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">6 mois</span>
          </div>
          <div className="mt-7 flex h-44 items-end gap-3 sm:gap-5">
            {monthlyData.map(month=><div key={month.key} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
              <span className="max-w-full truncate text-[10px] font-medium text-muted-foreground sm:text-xs">{month.total ? formatXOF(month.total) : "—"}</span>
              <div className="flex h-full w-full items-end overflow-hidden rounded-t-lg bg-muted/60"><div className="w-full rounded-t-lg bg-primary transition-all duration-500 group-hover:bg-primary/80" style={{height:`${Math.max(month.total ? 7 : 2, month.total / maxMonthly * 100)}%`}}/></div>
              <span className="text-xs capitalize text-muted-foreground">{month.label}</span>
            </div>)}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <h3 className="font-semibold tracking-tight">État des paiements</h3><p className="mt-1 text-xs text-muted-foreground">Répartition de tes factures</p>
          <div className="mt-6 space-y-5">
            <div><div className="mb-2 flex items-center justify-between text-sm"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/>Payées</span><b>{paidInvoices.length}</b></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-emerald-500" style={{width:`${invoices.length ? paidInvoices.length / invoices.length * 100 : 0}%`}}/></div></div>
            <div><div className="mb-2 flex items-center justify-between text-sm"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"/>En attente</span><b>{activeInvoices.length - overdueInvoices.length}</b></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-amber-500" style={{width:`${invoices.length ? (activeInvoices.length - overdueInvoices.length) / invoices.length * 100 : 0}%`}}/></div></div>
            <div><div className="mb-2 flex items-center justify-between text-sm"><span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500"/>En retard</span><b>{overdueInvoices.length}</b></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-rose-500" style={{width:`${invoices.length ? overdueInvoices.length / invoices.length * 100 : 0}%`}}/></div></div>
          </div>
          <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">Les factures non réglées après leur date d'échéance sont automatiquement signalées comme en retard.</p>
        </div>
      </div>
    </div>
    {clientForm&&<div className="space-y-3 rounded-xl border border-border bg-surface p-5"><h3 className="font-semibold">Ajouter un client</h3><div className="grid gap-3 sm:grid-cols-2"><div><Label>Nom *</Label><Input value={name} onChange={e=>setName(e.target.value)}/></div><div><Label>Email</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></div><div><Label>Téléphone</Label><Input value={phone} onChange={e=>setPhone(e.target.value)}/></div><div><Label>Adresse</Label><Input value={address} onChange={e=>setAddress(e.target.value)}/></div></div><Button disabled={addClient.isPending} onClick={()=>addClient.mutate()}>Enregistrer le client</Button></div>}
    <div className="space-y-4 rounded-xl border border-border bg-surface p-5"><h3 className="flex items-center gap-2 font-semibold"><FilePlus2 className="h-4 w-4 text-primary"/>Créer une facture</h3><div className="grid gap-3 sm:grid-cols-2"><div><Label>Client *</Label><Select value={clientId} onValueChange={setClientId}><SelectTrigger><SelectValue placeholder="Choisir un client"/></SelectTrigger><SelectContent>{clients.map(c=><SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select></div><div><Label>Date de facture</Label><Input type="date" value={issueDate} onChange={e=>setIssueDate(e.target.value)}/></div><div><Label>Échéance</Label><Input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}/></div><div><Label>Taxes (%)</Label><Input type="number" min="0" max="100" value={taxRate} onChange={e=>setTaxRate(e.target.value)}/></div></div>
    <div className="space-y-3"><div className="flex justify-between"><h4 className="font-medium">Prestations et produits</h4><Button size="sm" variant="outline" onClick={()=>setLines(old=>[...old,blankLine()])}><Plus className="mr-1 h-4 w-4"/>Ajouter</Button></div>{lines.map((l,i)=><div key={i} className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1fr_90px_130px_40px]"><div><Label>Description</Label><Input placeholder="Réparation, développement web, accessoire…" value={l.description} onChange={e=>setLines(old=>old.map((x,j)=>j===i?{...x,description:e.target.value}:x))}/></div><div><Label>Quantité</Label><Input type="number" min="0.01" step="0.01" value={l.quantity} onChange={e=>setLines(old=>old.map((x,j)=>j===i?{...x,quantity:e.target.value}:x))}/></div><div><Label>Prix unitaire (F)</Label><Input type="number" min="0" value={l.unit_price} onChange={e=>setLines(old=>old.map((x,j)=>j===i?{...x,unit_price:e.target.value}:x))}/></div><div className="flex items-end"><Button size="icon" type="button" variant="ghost" aria-label="Supprimer" disabled={lines.length===1} onClick={()=>setLines(old=>old.filter((_,j)=>j!==i))}><Trash2 className="h-4 w-4"/></Button></div></div>)}</div>
    <div><Label>Notes</Label><Textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Conditions et informations complémentaires…"/></div><div className="ml-auto max-w-xs space-y-1 text-right text-sm"><p>Sous-total : <b>{formatXOF(subtotal)}</b></p><p>Taxes : <b>{formatXOF(tax)}</b></p><p className="text-lg font-bold text-primary">Total : {formatXOF(subtotal+tax)}</p></div><Button disabled={addInvoice.isPending||clients.length===0} onClick={()=>addInvoice.mutate()}><FilePlus2 className="mr-2 h-4 w-4"/>{addInvoice.isPending?"Création…":"Créer la facture"}</Button>{clients.length===0&&<p className="text-xs text-muted-foreground">Ajoute d'abord un client.</p>}</div>
    <div className="space-y-3"><h3 className="font-semibold">Historique des factures</h3>{isLoading?<p className="text-sm text-muted-foreground">Chargement…</p>:invoices.length===0?<p className="rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">Aucune facture pour le moment.</p>:invoices.map(inv=><div key={inv.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4"><div><p className="font-semibold">{inv.number}</p><p className="text-xs text-muted-foreground">{clients.find(c=>c.id===inv.client_id)?.name||"Client"} · {inv.issue_date}</p><p className="font-bold text-primary">{formatXOF(inv.total)}</p></div><div className="flex flex-wrap items-center gap-2"><Select value={inv.status} onValueChange={status=>setStatus.mutate({id:inv.id,status})}><SelectTrigger className="w-36"><SelectValue>{statuses[inv.status]||inv.status}</SelectValue></SelectTrigger><SelectContent>{Object.entries(statuses).map(([v,l])=><SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent></Select><Button size="sm" variant="outline" onClick={()=>setDetailsId(inv.id)}>Détails</Button><Button size="sm" variant="outline" onClick={()=>void printInvoice(inv)}><Printer className="mr-1 h-4 w-4"/>PDF / Imprimer</Button></div></div>)}</div>
    {detailsId&&<div className="rounded-xl border border-border bg-surface p-5"><div className="flex justify-between"><h3 className="font-semibold">Détails de {invoices.find(i=>i.id===detailsId)?.number}</h3><Button size="sm" variant="ghost" onClick={()=>setDetailsId("")}>Fermer</Button></div><div className="mt-3 space-y-2">{detailItems.map(it=><div key={it.id} className="flex justify-between text-sm"><span>{it.description} · {it.quantity}</span><b>{formatXOF(it.total)}</b></div>)}</div></div>}
  </section>;
}
