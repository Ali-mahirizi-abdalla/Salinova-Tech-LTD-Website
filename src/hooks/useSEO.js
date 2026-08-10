import { useEffect } from 'react';

/**
 * useSEO — Dynamically sets page title, meta description,
 * canonical URL, OG tags, and injects JSON-LD structured data.
 */
export const useSEO = ({ title, description, path = '', schema = null }) => {
  const BASE_URL = 'https://salinovatech.com';
  const canonical = `${BASE_URL}${path}`;
  const ogImage = `${BASE_URL}/assets/og-image.png`;

  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Core meta
    setMeta('description', description);
    setLink('canonical', canonical);

    // Open Graph
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonical, true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:site_name', 'Salinova Tech LTD', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // JSON-LD Structured Data
    if (schema) {
      const existing = document.getElementById('json-ld-schema');
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'json-ld-schema';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const schemaEl = document.getElementById('json-ld-schema');
      if (schemaEl) schemaEl.remove();
    };
  }, [title, description, canonical, schema]);
};
