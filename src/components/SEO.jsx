import React from 'react';


export function SEO({ 
  title, 
  description, 
  path = "",
  image = "https://salinova-tech.vercel.app/assets/og-image.png",
  type = "website",
  schema = null
}) {
  const url = `https://salinova-tech.vercel.app${path}`;
  const fullTitle = title.includes('Salinova Tech LTD') ? title : `${title} | Salinova Tech LTD`;
  
  return (
    <>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Salinova Tech LTD" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </>
  );
}
