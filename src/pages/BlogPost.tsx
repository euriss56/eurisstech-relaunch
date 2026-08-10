import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Clock, Link2, Facebook } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Seo } from "@/components/Seo";
import { coverFor, readingTime } from "@/lib/blog";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_emoji: string;
  tag: string;
  created_at: string;
  updated_at?: string;
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return data as Post;
    },
  });

  const { data: related } = useQuery({
    enabled: !!post,
    queryKey: ["blog-related", post?.slug, post?.tag],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug,title,excerpt,tag,content,created_at")
        .eq("published", true)
        .neq("slug", post!.slug)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data as Post[];
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl border border-border bg-surface" />
      </div>
    );
  }
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Seo title="Article introuvable — Eurisstech" description="Cet article n'existe pas ou n'est plus publié." path={`/blog/${slug ?? ""}`} />
        <h1 className="text-2xl font-bold">Article introuvable</h1>
        <Link to="/blog" className="mt-4 inline-flex text-primary hover:underline">← Retour au blog</Link>
      </div>
    );
  }

  const path = `/blog/${post.slug}`;
  const minutes = readingTime(post.content);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at ?? post.created_at,
    articleSection: post.tag,
    inLanguage: "fr",
    author: { "@type": "Organization", name: "Eurisstech" },
    publisher: { "@type": "Organization", name: "Eurisstech" },
    mainEntityOfPage: { "@type": "WebPage", "@id": path },
  };

  const html = post.content
    .split("\n\n")
    .map((b) => {
      if (b.startsWith("## ")) return `<h2 class="mt-10 text-2xl font-bold tracking-tight">${b.slice(3)}</h2>`;
      if (b.startsWith("### ")) return `<h3 class="mt-6 text-lg font-semibold">${b.slice(4)}</h3>`;
      if (b.startsWith("- ")) {
        const items = b
          .split("\n")
          .map((l) => `<li class="ml-5 list-disc">${l.replace(/^[-]\s*/, "").replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-foreground\">$1</strong>")}</li>`)
          .join("");
        return `<ul class="mt-3 space-y-1.5 text-muted-foreground">${items}</ul>`;
      }
      return `<p class="mt-4 leading-relaxed text-muted-foreground">${b.replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-foreground\">$1</strong>")}</p>`;
    })
    .join("");

  return (
    <article className="container mx-auto px-4 py-12">
      <Seo
        title={`${post.title} — Eurisstech`.slice(0, 70)}
        description={(post.excerpt ?? "").slice(0, 158)}
        path={path}
        type="article"
        jsonLd={jsonLd}
      />

      <nav aria-label="Fil d'ariane" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Accueil</Link>
        <span className="mx-1.5">/</span>
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{post.tag}</span>
      </nav>

      <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour au blog
      </Link>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">
          {post.tag}
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span>
            {new Date(post.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {minutes} min de lecture
          </span>
          <span>Par Eurisstech</span>
        </div>

        <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-2xl border border-border">
          <img
            loading="eager"
            decoding="async"
            src={coverFor(post.slug, post.tag)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>

        <div className="prose-invert mt-6" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          <span className="mr-1 text-sm text-muted-foreground">Partager :</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs hover:border-primary/50 hover:text-primary"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs hover:border-primary/50 hover:text-primary"
          >
            <Facebook className="h-3.5 w-3.5" /> Facebook
          </a>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(shareUrl);
              toast.success("Lien copié");
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs hover:border-primary/50 hover:text-primary"
          >
            <Link2 className="h-3.5 w-3.5" /> Copier le lien
          </button>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-7 text-center">
          <h2 className="text-xl font-semibold">Un projet en tête ?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Identité visuelle, site web ou réparation : Eurisstech vous répond sous 24 h.
          </p>
          <Link
            to="/contact"
            className="gradient-primary mt-4 inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Nous contacter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {related && related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-semibold">À lire aussi</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-primary/50"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={coverFor(r.slug, r.tag)}
                      alt={r.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{r.tag}</p>
                    <p className="mt-1 text-sm font-semibold transition-colors group-hover:text-primary">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

export default BlogPost;
