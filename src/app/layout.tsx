import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AudioSphere — Curated Stories & Curious Facts Podcast",
  description:
    "Where creativity meets acoustic storytelling. Listen in order to explore science, comedy, and culture through sound.",
  openGraph: {
    title: "AudioSphere — Curated Stories & Curious Facts Podcast",
    description:
      "Where creativity meets acoustic storytelling. Listen in order to explore science, comedy, and culture through sound.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioSphere — Curated Stories & Curious Facts Podcast",
    description:
      "Where creativity meets acoustic storytelling. Listen in order to explore science, comedy, and culture through sound.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        className="font-sans antialiased bg-[#161618] text-[#F5F2EB] selection:bg-[#FF7B60] selection:text-white min-h-screen"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
