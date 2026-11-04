import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = "https://eurisstech.vercel.app";

export function Seo({ title, description, path, type = "website", jsonLd }: SeoProps) {
  const canonicalUrl = new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
