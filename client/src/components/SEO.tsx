import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.zemonie.site";
const DEFAULT_DESC =
  "Zemonie is the all-in-one money management tool for Gen Z. Track income, label expenses, and visualise your financial data — free and privacy-first.";
const DEFAULT_OG_IMAGE = "https://www.zemonie.site/og-image.png";

export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  jsonLd,
}: {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}) {
  const fullTitle = `${title} | Zemonie`;
  const url = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Zemonie" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export { SITE_URL, DEFAULT_DESC, DEFAULT_OG_IMAGE };
