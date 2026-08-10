import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, ArrowRight, Search, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { coverFor, readingTime } from "@/lib/blog";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  cover_emoji: string;
  tag: string;
  created_at: string;
}

function formatDate(v: string) {
  return new Date(v).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function Blog() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("Tous");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug,title,excerpt,content,cover_emoji,tag,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PostRow[];
    },
  });

  const tags = useMemo(() => {
    const set = new Set((posts ?? []).map((p) => p.tag).filter(Boolean));
    return ["Tous", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (posts ?? []).filter((p) => {
      const matchTag = tag === "Tous" || p.tag === tag;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? "").toLowerCase().includes(q) ||
        (p.tag ?? "").toLowerCase().includes(q);
      return matchTag && matchQuery;
    });
  }, [posts, query, tag]);

  const showFeatured = tag === "Tous" && !query.trim() && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div className="container mx-auto px-4 py-20">
      <header className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Blog Eurisstech
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("blog.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("blog.subtitle")}</p>
      </header>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un article…"
            aria-label="Rechercher un article"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((tg) => (
            <button
              key={tg}
              type="button"
              onClick={() => setTag(tg)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                tag === tg
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground"
              }`}
            >
              {tg}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-surface" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <>
          {featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="group mt-14 grid overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-card lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
                <img
                  src={coverFor(featured.slug, featured.tag)}
                  alt={featured.title}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide">
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-primary">À la une</span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground">{featured.tag}</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(featured.created_at)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {readingTime(featured.content)} min
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                  Lire l'article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={coverFor(p.slug, p.tag)}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    <div className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground backdrop-blur">
                      {p.tag}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-semibold transition-colors group-hover:text-primary">{p.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatDate(p.created_at)}</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {readingTime(p.content)} min
                      </span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                      Lire l'article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : posts && posts.length > 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Aucun article ne correspond à votre recherche.
        </p>
      ) : (
        <div className="mt-12 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" /> {t("blog.soon")}
        </div>
      )}
    </div>
  );
}
export default Blog;
