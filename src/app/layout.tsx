import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leo Lions Club of Colombo Uptown Eminence | A Futuristic Leo Hub",
  description:
    "Experience the next era of service with the Leo Lions Club of Colombo Uptown Eminence. Discover leadership, innovation, and immersive storytelling.",
  metadataBase: new URL("https://llccue.example.com"),
  keywords: [
    "Leo Lions",
    "Colombo Uptown Eminence",
    "LLCCUE",
    "youth leadership",
    "service projects",
    "Lionism",
  ],
  openGraph: {
    title: "Leo Lions Club of Colombo Uptown Eminence",
    description:
      "Step into a futuristic service collective leading innovation, compassion, and impact.",
    type: "website",
    url: "https://llccue.example.com",
    siteName: "LLCCUE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
