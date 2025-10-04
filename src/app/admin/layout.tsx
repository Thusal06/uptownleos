import { Metadata } from "next";
import { Poppins } from "next/font/google";
import AdminNav from "@/components/admin/AdminNav";
import "@/app/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Admin Panel | LLCCUE",
  description: "Admin dashboard for Leo Lions Club of Colombo Uptown Eminence",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <AdminNav />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}