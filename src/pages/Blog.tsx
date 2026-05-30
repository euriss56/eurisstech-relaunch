import {Link} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import blogBranding from "@/assets/blog/blog-branding.jpg";
import blogWeb from "@/assets/blog/blog-web.jpg";
import blogPromo from "@/assets/blog/blog-promo.jpg";
import blogMomo from "@/assets/blog/blog-momo.jpg";
import blogSocial from "@/assets/blog/blog-social.jpg";
import blogPrint from "@/assets/blog/blog-print.jpg";

const COVER_BY_SLUG: Record<string, string> = {
  "logo-impact-marque": blogBranding,
  "site-vitrine-pourquoi": blogWeb,
  "promo-rentree-2026": blogPromo,
  "mobile-money-paiement": blogMomo,
  "reseaux-sociaux-bj": blogSocial,
  "flyer-vs-bache": blogPrint,
};

const COVER_BY_TAG: Record<string, string> = {
  Branding: blogBranding,
  Web: blogWeb,
  Promo: blogPromo,
  Tutoriel: blogMomo,
  Stratégie: blogSocial,
  Marketing: blogPrint,
};

interface PostRow {
  slug: string;
  title: string;
  excerpt: string;
  cover_emoji: string;
  tag: string;
  created_at: string;
}

function Blog() {
  const { t } = useI18n();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug,title,excerpt,cover_emoji,tag,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PostRow[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-20">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("blog.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("blog.subtitle")}</p>
      </header>

      {isLoading ? (
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl border border-border bg-surface" />
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => {
            const cover = COVER_BY_SLUG[p.slug] ?? COVER_BY_TAG[p.tag] ?? blogBranding;
            return (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/50 hover:shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-semibold transition-colors group-hover:text-primary">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Lire l'article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" /> {t("blog.soon")}
        </div>
      )}
    </div>
  );
}
export default Blog;
