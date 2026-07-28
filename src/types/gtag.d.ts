// Minimal type declaration for window.gtag injected by Google Analytics.
// This prevents TypeScript errors when calling window.gtag() in
// src/components/GoogleAnalytics.tsx.

interface Window {
  gtag: (
    command: "config" | "event" | "js" | "set",
    targetId: string | Date,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLayer: any[];
}
