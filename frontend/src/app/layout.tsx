import type { Metadata } from "next";
import { Epilogue, Inter, Space_Grotesk } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-epilogue-var",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-var",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PosterKing — India's Premium Poster Store",
  description: "Shop the best quality wall posters, split sets, and custom prints. Cars, Anime, Movies, Sports and more. Free shipping on prepaid orders.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${epilogue.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ background: "#fff" }}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
