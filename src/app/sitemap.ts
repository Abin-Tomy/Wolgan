import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.wolgan.co";

  return [
    {
      url: base,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services/water-treatment`,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/mep-installations`,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/chemical-supplies`,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/clients`,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/team`,
      lastModified: "2026-06-07",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blogs`,
      lastModified: "2026-06-07",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: "2026-06-07",
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
