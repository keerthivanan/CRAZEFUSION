import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL  ?? "http://localhost:3000";
const NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "CrazeFusion";

export const metadata: Metadata = {
  title: `Shop Wall Art Posters — Cars, Movies & More | ${NAME}`,
  description: `Browse 609+ premium wall art prints. Cars, Movies, Coffee Shop & AI-generated posters. A4 & A3 prints from £11.99. Free UK delivery over £30. Printed in 48 hours.`,
  keywords: [
    "buy wall art UK", "car posters for sale UK", "movie wall prints",
    "coffee shop prints", "A4 poster prints UK", "cheap wall art UK",
    "premium print on demand", "wall art shop UK", "poster store UK",
  ],
  alternates: { canonical: `${SITE}/collection` },
  openGraph: {
    title:       `Shop Wall Art Posters | ${NAME}`,
    description: "609+ premium prints from £11.99. Cars, Movies, Coffee & AI designs. Free UK delivery.",
    url:         `${SITE}/collection`,
  },
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
