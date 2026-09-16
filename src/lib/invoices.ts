export const INVOICE_STATUSES = ["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"] as const;

export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const INVOICE_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  SENT: "Envoyée",
  PAID: "Payée",
  OVERDUE: "En retard",
  CANCELLED: "Annulée",
};

export function invoiceStatusLabel(s: string) {
  return INVOICE_STATUS_LABELS[s] ?? s;
}

export function invoiceStatusClass(s: string) {
  switch (s) {
    case "SENT":
      return "border-primary/40 bg-primary/10 text-primary";
    case "PAID":
      return "border-primary/40 bg-primary/20 text-primary";
    case "OVERDUE":
      return "border-destructive/40 bg-destructive/10 text-destructive";
    case "CANCELLED":
      return "border-border bg-muted text-muted-foreground line-through";
    default:
      return "border-border bg-background text-muted-foreground";
  }
}

export interface ClientRow {
  id: string;
  name: string;
  email: string | null;
  address: string | null;
  phone: string | null;
  created_at: string;
}

export interface InvoiceItemRow {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface InvoiceRow {
  id: string;
  number: string;
  client_id: string;
  status: string;
  issue_date: string;
  due_date: string | null;
  subtotal: number;
  tax: number;
  total: number;
  notes: string | null;
  created_at: string;
  clients?: ClientRow | null;
}

export const COMPANY = {
  name: "Eurisstech",
  owner: "Euriss Mahunan FANOU",
  address: "Calavi, République du Bénin",
  email: "fanoueuriss@gmail.com",
  phone: "+229 01 41 67 57 84",
};

export const formatFCFA = (n: number) =>
  `${Number(n || 0).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} FCFA`;

export const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString("fr-FR") : "—";
