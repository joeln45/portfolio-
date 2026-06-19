import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

const description =
  "Joel Nirmal Oommen builds machine learning, NLP, and full-stack software, from semantic search and ML classifiers to production APIs and mobile apps.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · ML / AI engineer`,
    template: `%s · ${site.shortName}`,
  },
  description,
  keywords: [
    "Joel Nirmal",
    "Joel Nirmal Oommen",
    "Software Engineer",
    "Machine Learning Engineer",
    "AI",
    "Fintech",
    "Full-Stack Developer",
    "Next.js",
    "Python",
    "Java",
    "UAE",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} · ML / AI engineer`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ML / AI engineer`,
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:outline focus:outline-2 focus:outline-accent"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <div className="grain-overlay" aria-hidden />
      </body>
    </html>
  );
}
