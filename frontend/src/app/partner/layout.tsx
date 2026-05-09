import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL  ?? "http://localhost:3000";
const NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "CrazeFusion";

export const metadata: Metadata = {
  title: `Sell Your Art — Partner Programme | ${NAME}`,
  description: `Upload your designs and earn 30% commission on every sale. No upfront costs. We print, pack and ship every order. Join the UK's fastest growing poster marketplace.`,
  keywords: [
    "sell art online UK", "print on demand artist UK", "earn money from art UK",
    "poster marketplace UK", "sell designs online", "artist partner programme",
    "passive income art UK", "sell prints online UK",
  ],
  alternates: { canonical: `${SITE}/partner` },
  openGraph: {
    title:       `Sell Your Art Online | ${NAME} Partner Programme`,
    description: "Earn 30% on every sale. We handle printing & shipping. Join free.",
    url:         `${SITE}/partner`,
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
