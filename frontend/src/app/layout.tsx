import type { Metadata } from "next";
import { Epilogue, Poppins, Space_Grotesk } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-epilogue-var",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins-var",
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
    <html lang="en" className={`${epilogue.variable} ${spaceGrotesk.variable} ${poppins.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-poppins-var,'Poppins',sans-serif)" }}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
