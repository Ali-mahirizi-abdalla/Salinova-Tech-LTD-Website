import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ─── Replace with your real GA4 Measurement ID ───────────────────────────────
// Get it from: https://analytics.google.com → Admin → Data Streams → your stream
const GA_MEASUREMENT_ID = 'G-QZ82JB63Y7';
// ─────────────────────────────────────────────────────────────────────────────

/**
 * GoogleAnalytics
 *
 * Injects the GA4 gtag.js script on first mount and fires a `page_view`
 * event every time the React Router location changes.
 *
 * Usage: Render <GoogleAnalytics /> once inside your <Router> (in App.jsx).
 */
export function GoogleAnalytics() {
  const location = useLocation();

  // Inject the gtag.js script once on mount
  useEffect(() => {
    if (
      !GA_MEASUREMENT_ID ||
      GA_MEASUREMENT_ID === 'G-XXXXXXXXXX' ||
      document.getElementById('ga4-script')
    ) {
      return; // Skip in dev when ID is placeholder, or if already injected
    }

    // 1. Load the gtag.js library
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // 2. Initialize the data layer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We fire manually on route change below
    });
  }, []);

  // Fire a page_view event on every route change
  useEffect(() => {
    if (
      !GA_MEASUREMENT_ID ||
      GA_MEASUREMENT_ID === 'G-XXXXXXXXXX' ||
      typeof window.gtag !== 'function'
    ) {
      return;
    }

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null; // This component renders nothing
}
