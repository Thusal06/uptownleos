import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leo Lions Club of Colombo Uptown Eminence (LLCCUE) | District 306 D7",
  description:
    "Chartered in 2025 under Lions International, LLCCUE is a modern Leo club in District 306 D7. Discover our leadership, innovative service projects, and commitment to Lead. Serve. Uplift.",
  metadataBase: new URL("https://llccue.org"),
  keywords: [
    "Leo Lions",
    "Colombo Uptown Eminence",
    "LLCCUE",
    "District 306 D7",
    "Chartered 2025",
    "Aurum'25",
    "youth leadership",
    "service projects",
    "Lionism",
    "Sri Lanka",
    "BRANDBOOST360"
  ],
  openGraph: {
    title: "Leo Lions Club of Colombo Uptown Eminence | District 306 D7",
    description:
      "Modern Leo club chartered in 2025, leading innovation in service through technology and youth engagement. Join us in making a difference.",
    type: "website",
    url: "https://llccue.org",
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
