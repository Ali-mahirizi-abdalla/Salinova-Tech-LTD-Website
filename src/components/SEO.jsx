import React from 'react';

const BASE_URL = 'https://www.salinovatech.co.ke';
const DEFAULT_IMAGE = `${BASE_URL}/assets/og-image.png`;

/**
 * SEO Component
 *
 * Renders all per-page SEO meta tags into the document <head>.
 * Uses React 19's built-in support for rendering <title>, <meta>, and
 * <link> tags directly from within components (no react-helmet needed).
 *
 * Props:
 *  - title       : Page title (will have " | Salinova Tech LTD" appended unless already present)
 *  - description : Meta description (keep under 160 chars)
 *  - path        : URL path e.g. "/services" (default: "")
 *  - image       : Absolute URL to OG image (default: og-image.png)
 *  - type        : og:type value (default: "website")
 *  - schema      : Optional JSON-LD object for page-specific structured data
 */
export function SEO({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
}) {
  const canonicalUrl = `${BASE_URL}${path}`;
  const fullTitle = title.includes('Salinova Tech LTD')
    ? title
    : `${title} | Salinova Tech LTD`;

  return (
    <>
      {/* ── Primary SEO ───────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* ── Open Graph (Facebook, LinkedIn, WhatsApp) ─────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Salinova Tech LTD" />
      <meta property="og:locale" content="en_KE" />

      {/* ── Twitter Card ──────────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@salinovatech" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* ── Page-specific JSON-LD Structured Data ─────────────────────── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema, null, 0)}
        </script>
      )}
    </>
  );
}
