import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimationProvider from "@/components/AnimationProvider";

export const metadata: Metadata = {
  title: {
    default: "Ballplex — Elite Baseball & Softball Development",
    template: "%s — Ballplex",
  },
  description:
    "Elite Baseball & Softball Player Development in Viera, Florida. Private Lessons, Homeschool Program, Strength & Conditioning and Cage Rentals.",
  icons: { icon: "/LOGO.png" },
  openGraph: {
    type: "website",
    siteName: "Ballplex",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main>
          <AnimationProvider>{children}</AnimationProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
