import { MetadataRoute } from "next";

// NOTE: blog post slugs will be added in a later fix once src/lib/blog-posts.ts exists.
// Pattern: ...getAllPosts().map((p) => ({ url: `${base}/blogs/${p.slug}`, ... }))

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.wolgan.co";
  const buildDate = new Date();

  return [
    {
      url: base,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/about`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services/water-treatment`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/services/mep-installations`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/services/chemical-supplies`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/clients`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/blogs`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
