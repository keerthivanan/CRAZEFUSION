import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL  ?? "http://localhost:3000";
const NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "CrazeFusion";

export const metadata: Metadata = {
  title: `AI Poster Generator — Generate & Sell Custom Posters | ${NAME}`,
  description: `Generate stunning wall art posters with AI in seconds. Describe any poster, buy credits, generate it, sell it in the shop and earn 30% commission on every sale. No design skills needed.`,
  keywords: [
    "AI poster generator UK", "generate custom wall art", "sell AI posters",
    "AI art poster maker", "custom poster creator", "AI wall art",
    "earn money selling posters", "AI image generator poster",
  ],
  alternates: { canonical: `${SITE}/create` },
  openGraph: {
    title:       `AI Poster Generator | ${NAME}`,
    description: "Generate any poster with AI. Sell it. Earn 30% commission automatically.",
    url:         `${SITE}/create`,
  },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
