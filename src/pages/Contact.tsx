import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";


const schema = z.object({
  name: z.string().trim().min(2, "Nom requis").max(80),
  email: z.string().trim().email("Email invalide").max(120),
  phone: z.string().trim().min(6, "Téléphone requis").max(30),
  message: z.string().trim().min(5, "Message requis").max(1000),
});

function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    const { name, email, phone, message } = parsed.data;
    const { supabase } = await import("@/integrations/supabase/client");
    const { error } = await supabase.from("contact_messages").insert({ name, email, phone, message });
    if (error) {
      toast.error("Impossible d'enregistrer le message, ouverture de WhatsApp.");
    } else {
      toast.success("Message envoyé ! Nous vous répondons rapidement.");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
    const url = `https://wa.me/2290146379989?text=${encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("contact.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          {[
            { Icon: Phone, label: "Téléphone", value: "+229 01 41 67 57 84", href: "tel:+2290141675784" },
            { Icon: Mail, label: "Email", value: "contact@eurisstech.com", href: "mailto:contact@eurisstech.com" },
            { Icon: MapPin, label: "Adresse", value: "Calavi, Bénin" },
          ].map(({ Icon, label, value, href }) => {
            const content = (
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg gradient-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </div>
            );
            return href ? (
              <a key={label} href={href} className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/50">{content}</a>
            ) : (
              <div key={label} className="rounded-xl border border-border bg-surface p-5">{content}</div>
            );
          })}

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Cotonou map"
              src="https://www.google.com/maps?q=Cotonou,Benin&output=embed"
              width="100%" height="240" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="block grayscale"
            />
          </div>
        </div>

        <form onSubmit={submit} className="lg:col-span-3 space-y-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">{t("contact.name")}</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">{t("contact.phone")}</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={30} required />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">{t("contact.email")}</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={120} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">{t("contact.message")}</Label>
            <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} required />
          </div>
          <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground glow-primary">
            <Send className="mr-2 h-4 w-4" /> {t("contact.send")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
