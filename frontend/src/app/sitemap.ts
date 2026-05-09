import { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE,                              lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE}/collection`,              lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE}/collection?cat=Cars`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE}/collection?cat=Movies`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE}/collection?cat=Coffee+Shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/create`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/credits`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/partner`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/partner/register`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
