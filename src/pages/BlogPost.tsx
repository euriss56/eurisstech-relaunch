import {Link} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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


interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_emoji: string;
  tag: string;
  created_at: string;
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return data as Post;
    },
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20"><div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl border border-border bg-surface" /></div>;
  }
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Article introuvable</h1>
        <Link to="/blog" className="mt-4 inline-flex text-primary hover:underline">← Retour au blog</Link>
      </div>
    );
  }

  const html = post.content
    .split("\n\n")
    .map((b) => {
      if (b.startsWith("## ")) return `<h2 class="mt-10 text-2xl font-bold tracking-tight">${b.slice(3)}</h2>`;
      if (b.startsWith("### ")) return `<h3 class="mt-6 text-lg font-semibold">${b.slice(4)}</h3>`;
      if (b.startsWith("- ")) {
        const items = b.split("\n").map((l) => `<li class="ml-5 list-disc">${l.replace(/^[-]\s*/, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</li>`).join("");
        return `<ul class="mt-3 space-y-1.5 text-muted-foreground">${items}</ul>`;
      }
      return `<p class="mt-4 leading-relaxed text-muted-foreground">${b.replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-foreground\">$1</strong>")}</p>`;
    })
    .join("");

  return (
    <article className="container mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour au blog
      </Link>
      <div className="mx-auto mt-8 max-w-3xl">
        <div className="rounded-full inline-block border border-border bg-surface px-3 py-1 text-xs uppercase tracking-wide text-muted-foreground">{post.tag}</div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-2xl border border-border">
          <img src={COVER_BY_SLUG[post.slug] ?? blogBranding} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
        <div className="mt-6 text-xs text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <div className="prose-invert mt-6" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}

export default BlogPost;
