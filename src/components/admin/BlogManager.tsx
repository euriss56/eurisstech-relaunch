import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface PostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_emoji: string | null;
  tag: string | null;
  published: boolean;
  created_at: string;
}

type Draft = Omit<PostRow, "id" | "created_at"> & { id?: string };

const emptyDraft: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_emoji: "📝",
  tag: "",
  published: false,
};

function slugify(v: string) {
  return v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BlogManager() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);

  const { data: posts } = useQuery({
    queryKey: ["admin-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,slug,title,excerpt,content,cover_emoji,tag,published,created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PostRow[];
    },
  });

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        slug: d.slug || slugify(d.title),
        title: d.title,
        excerpt: d.excerpt,
        content: d.content,
        cover_emoji: d.cover_emoji,
        tag: d.tag,
        published: d.published,
      };
      if (d.id) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", d.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Article enregistré");
      setDraft(null);
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Article supprimé");
      qc.invalidateQueries({ queryKey: ["admin-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Blog</h2>
        <Button size="sm" className="gradient-primary text-primary-foreground" onClick={() => setDraft({ ...emptyDraft })}>
          <Plus className="mr-1.5 h-4 w-4" /> Nouvel article
        </Button>
      </div>

      {draft && (
        <div className="mt-4 rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{draft.id ? "Modifier l'article" : "Nouvel article"}</p>
            <Button variant="ghost" size="icon" onClick={() => setDraft(null)} aria-label="Fermer">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(draft);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bt">Titre</Label>
                <Input
                  id="bt"
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value, slug: draft.id ? draft.slug : slugify(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bs">Slug (URL)</Label>
                <Input id="bs" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bg">Catégorie</Label>
                <Input id="bg" value={draft.tag ?? ""} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} placeholder="Branding, Web…" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="be">Emoji de couverture</Label>
                <Input id="be" value={draft.cover_emoji ?? ""} onChange={(e) => setDraft({ ...draft, cover_emoji: e.target.value })} maxLength={4} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bx">Résumé</Label>
              <Textarea id="bx" rows={2} value={draft.excerpt ?? ""} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc">Contenu</Label>
              <Textarea id="bc" rows={10} value={draft.content ?? ""} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Switch id="bp" checked={draft.published} onCheckedChange={(v) => setDraft({ ...draft, published: v })} />
                <Label htmlFor="bp">Publier</Label>
              </div>
              <Button type="submit" disabled={save.isPending} className="gradient-primary text-primary-foreground">
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      )}

      {!posts || posts.length === 0 ? (
        <p className="mt-4 rounded-xl border border-border bg-surface p-6 text-sm text-muted-foreground">Aucun article.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5">
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  <span className="mr-2">{p.cover_emoji}</span>
                  {p.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  /blog/{p.slug} · {p.tag || "—"} · {new Date(p.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wide ${
                    p.published ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {p.published ? "Publié" : "Brouillon"}
                </span>
                <Button variant="outline" size="icon" className="border-border bg-background" onClick={() => setDraft(p)} aria-label="Modifier">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border bg-background text-destructive"
                  onClick={() => {
                    if (confirm(`Supprimer « ${p.title} » ?`)) remove.mutate(p.id);
                  }}
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
