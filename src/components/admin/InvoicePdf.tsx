import { Document, Page, Text, View, Image, StyleSheet, pdf } from "@react-pdf/renderer";
import logo from "@/assets/eurisstech-logo.png";
import {
  COMPANY,
  formatDate,
  formatFCFA,
  invoiceStatusLabel,
  type InvoiceItemRow,
  type InvoiceRow,
} from "@/lib/invoices";

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, color: "#111827", fontFamily: "Helvetica" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  logo: { width: 120, marginBottom: 8 },
  muted: { color: "#6b7280" },
  h1: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0077a8" },
  block: { marginTop: 24 },
  boxTitle: { fontSize: 9, textTransform: "uppercase", color: "#6b7280", marginBottom: 4 },
  bold: { fontFamily: "Helvetica-Bold" },
  thead: {
    flexDirection: "row",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  tr: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  cDesc: { width: "52%" },
  cQty: { width: "12%", textAlign: "right" },
  cPrice: { width: "18%", textAlign: "right" },
  cTotal: { width: "18%", textAlign: "right" },
  totals: { marginTop: 14, alignSelf: "flex-end", width: "45%" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#0a0a0a",
  },
  legal: { marginTop: 36, fontSize: 8, color: "#6b7280", lineHeight: 1.5 },
});

export function InvoiceDocument({
  invoice,
  items,
}: {
  invoice: InvoiceRow;
  items: InvoiceItemRow[];
}) {
  const client = invoice.clients;
  return (
    <Document title={`Facture ${invoice.number}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.row}>
          <View>
            <Image src={logo} style={styles.logo} />
            <Text style={styles.bold}>{COMPANY.name}</Text>
            <Text style={styles.muted}>{COMPANY.owner}</Text>
            <Text style={styles.muted}>{COMPANY.address}</Text>
            <Text style={styles.muted}>{COMPANY.email}</Text>
            <Text style={styles.muted}>{COMPANY.phone}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.h1}>FACTURE</Text>
            <Text style={styles.bold}>{invoice.number}</Text>
            <Text style={styles.muted}>Émise le {formatDate(invoice.issue_date)}</Text>
            <Text style={styles.muted}>Échéance : {formatDate(invoice.due_date)}</Text>
            <Text style={styles.muted}>Statut : {invoiceStatusLabel(invoice.status)}</Text>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.boxTitle}>Facturé à</Text>
          <Text style={styles.bold}>{client?.name ?? "—"}</Text>
          {!!client?.address && <Text style={styles.muted}>{client.address}</Text>}
          {!!client?.email && <Text style={styles.muted}>{client.email}</Text>}
          {!!client?.phone && <Text style={styles.muted}>{client.phone}</Text>}
        </View>

        <View style={styles.thead}>
          <Text style={styles.cDesc}>Description</Text>
          <Text style={styles.cQty}>Qté</Text>
          <Text style={styles.cPrice}>P.U.</Text>
          <Text style={styles.cTotal}>Total</Text>
        </View>
        {items.map((it) => (
          <View key={it.id} style={styles.tr}>
            <Text style={styles.cDesc}>{it.description}</Text>
            <Text style={styles.cQty}>{Number(it.quantity)}</Text>
            <Text style={styles.cPrice}>{formatFCFA(Number(it.unit_price))}</Text>
            <Text style={styles.cTotal}>{formatFCFA(Number(it.total))}</Text>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.muted}>Sous-total</Text>
            <Text>{formatFCFA(Number(invoice.subtotal))}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.muted}>TVA</Text>
            <Text>{formatFCFA(Number(invoice.tax))}</Text>
          </View>
          <View style={styles.grand}>
            <Text style={styles.bold}>Total à payer</Text>
            <Text style={styles.bold}>{formatFCFA(Number(invoice.total))}</Text>
          </View>
        </View>

        {!!invoice.notes && (
          <View style={styles.block}>
            <Text style={styles.boxTitle}>Notes</Text>
            <Text style={styles.muted}>{invoice.notes}</Text>
          </View>
        )}

        <View style={styles.legal}>
          <Text>
            Facture n° {invoice.number} — émise le {formatDate(invoice.issue_date)}
            {invoice.due_date ? ` — à régler avant le ${formatDate(invoice.due_date)}` : ""}.
          </Text>
          <Text>
            Conditions de paiement : règlement à réception par Mobile Money (MTN / Moov) ou espèces.
            Tout retard de paiement pourra entraîner la suspension des prestations en cours.
          </Text>
          <Text>
            {COMPANY.name} — entreprise individuelle, {COMPANY.address}. Contact : {COMPANY.email} ·{" "}
            {COMPANY.phone}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function downloadInvoicePdf(invoice: InvoiceRow, items: InvoiceItemRow[]) {
  const blob = await pdf(<InvoiceDocument invoice={invoice} items={items} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${invoice.number}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
