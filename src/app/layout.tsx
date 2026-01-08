import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ReactLenis } from "@/lib/lenis"; // We need to create this wrapper for client-side usage if not using the package directly in a client component
import "./globals.css";
import LiquidBackground from "@/components/ui/liquid-background";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leo Lions Club of Colombo Uptown Eminence | LLCCUE",
  description:
    "A dynamic Leo club igniting youth leadership through service, creativity, and meaningful impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased bg-obsidian text-slate-300 selection:bg-eminence-gold/30 selection:text-white`}>
        <ReactLenis root>
          {/* Ambient Background System */}
          <LiquidBackground />
          <div className="bg-noise" />
          
          <div className="relative z-10">
            {children}
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}