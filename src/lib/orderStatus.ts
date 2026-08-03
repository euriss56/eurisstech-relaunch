export const ORDER_STATUSES = ["pending", "confirmed", "in_progress", "delivered", "cancelled"] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  in_progress: "En cours",
  delivered: "Livrée",
  cancelled: "Annulée",
};

export function orderStatusLabel(status: string) {
  return ORDER_STATUS_LABELS[status] ?? status;
}

export function orderStatusClass(status: string) {
  switch (status) {
    case "confirmed":
      return "border-primary/40 bg-primary/10 text-primary";
    case "in_progress":
      return "border-accent/40 bg-accent/10 text-accent-foreground";
    case "delivered":
      return "border-primary/40 bg-primary/15 text-primary";
    case "cancelled":
      return "border-destructive/40 bg-destructive/10 text-destructive";
    default:
      return "border-border bg-background text-muted-foreground";
  }
}

export const ORDER_STEPS: OrderStatus[] = ["pending", "confirmed", "in_progress", "delivered"];
