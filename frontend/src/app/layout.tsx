import type { Metadata } from "next";
import { Epilogue, Poppins, Space_Grotesk } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AnnouncementBar from "@/components/navbar/AnnouncementBar";
import MobileBottomNav from "@/components/navbar/MobileBottomNav";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-epilogue-var",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins-var",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-var",
  display: "swap",
});

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "CrazeFusion";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium AI Poster Store UK | Wall Art Prints`,
    template: `%s | ${SITE_NAME} UK Posters`,
  },
  description: "Shop 609+ premium wall art posters. Cars, Movies, Coffee & more. Generate custom AI posters and sell them — earn 30% per sale. Free UK delivery over £30. Printed in 48hrs.",
  keywords: [
    "wall art posters UK", "premium poster prints", "AI poster generator",
    "car posters UK", "movie posters UK", "coffee shop prints",
    "custom wall art", "buy posters online UK", "print on demand UK",
    "A4 poster prints", "Ferrari poster", "dark academia poster",
    "wall decor UK", "affordable art prints",
  ],
  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type:        "website",
    locale:      "en_GB",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       `${SITE_NAME} — Premium AI Poster Store UK`,
    description: "609+ premium wall art posters. Generate custom AI posters. Earn 30% selling your designs. Free UK delivery.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — Premium UK Wall Art` }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "CrazeFusion — Premium AI Poster Store UK",
    description: "609+ premium wall art posters. AI poster generator. Free UK delivery.",
    images:      ["/og-image.jpg"],
    creator:     "@crazefusion",
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${epilogue.variable} ${spaceGrotesk.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OnlineStore",
            "name": SITE_NAME,
            "url": SITE_URL,
            "description": "Premium UK wall art poster store with AI poster generation. 609+ designs. Free delivery.",
            "priceRange": "£",
            "currenciesAccepted": "GBP",
            "paymentAccepted": "Credit Card, Debit Card",
            "areaServed": { "@type": "Country", "name": "United Kingdom" },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Wall Art Posters",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Car Posters" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Movie Posters" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Coffee Shop Prints" } },
                { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "AI Generated Posters" } },
              ],
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "2400",
              "bestRating": "5",
            },
          })}}
        />
      </head>
      <body style={{ margin: 0, fontFamily: "var(--font-poppins-var,'Poppins',sans-serif)" }}>
        <ThemeProvider>
          <CartProvider>
            <AnnouncementBar />
            {children}
            <MobileBottomNav />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
