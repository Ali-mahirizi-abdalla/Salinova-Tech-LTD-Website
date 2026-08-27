import React from 'react';

const BASE_URL = 'https://www.salinovatech.co.ke';
const DEFAULT_IMAGE = `${BASE_URL}/assets/og-image.png`;

/**
 * SEO Component
 *
 * Renders all per-page SEO meta tags into the document <head>.
 * Automatically enforces optimal character limits based on search engine and
 * social network standards to avoid truncation warnings:
 *  - Title: <= 58 characters (Google truncation threshold ~60 chars)
 *  - Meta description: <= 155 characters (Google threshold ~160 chars)
 *  - OG description: <= 125 characters (Social card threshold ~125 chars)
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

  // Format and clamp title length to max 58 characters
  const rawTitle = title.includes('Salinova Tech')
    ? title
    : `${title} | Salinova Tech`;
  const fullTitle =
    rawTitle.length > 58 ? `${rawTitle.slice(0, 55)}...` : rawTitle;

  // Clamp meta description to max 155 characters
  const metaDesc =
    description.length > 155
      ? `${description.slice(0, 152)}...`
      : description;

  // Clamp social open graph description to max 125 characters
  const ogDesc =
    description.length > 125
      ? `${description.slice(0, 122)}...`
      : description;

  return (
    <>
      {/* ── Primary SEO ───────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* ── Open Graph (Facebook, LinkedIn, WhatsApp) ─────────────────── */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={ogDesc} />
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
      <meta name="twitter:description" content={ogDesc} />
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
