"use client";

/**
 * GoogleAnalytics
 *
 * Handles GA4 pageview tracking for the Next.js App Router.
 * The App Router does NOT trigger full page reloads on navigation, so
 * gtag('config', ...) must be re-called manually whenever the URL changes.
 *
 * This component:
 *  1. Loads the gtag.js library script (strategy="afterInteractive").
 *  2. Initialises the dataLayer and fires the initial config.
 *  3. Subscribes to pathname + searchParams changes and fires a pageview
 *     on every client-side navigation.
 *
 * Place <GoogleAnalytics /> once inside RootLayout — it handles everything.
 */

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;

    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    // Fire a pageview on every client-side route change.
    // gtag is attached to window by the <Script> tags below.
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", GA_ID, { page_path: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_ID) {
    // Silently skip in dev/test when the env var isn't set.
    return null;
  }

  return (
    <>
      {/* Load the gtag.js library — deferred until page is interactive */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Initialise dataLayer + send first pageview */}
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>

      {/*
        Wrapped in Suspense by the caller (layout.tsx) because useSearchParams()
        requires a Suspense boundary in Next.js App Router.
      */}
      <GoogleAnalyticsInner />
    </>
  );
}
