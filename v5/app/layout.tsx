import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CleanStart — Hardened Container Images with Zero CVEs",
  description:
    "Pre-hardened, FIPS-compliant, near-zero-CVE container images. Build, deploy, and scale with confidence.",
  metadataBase: new URL("https://cleanstart.com"),
  openGraph: {
    title: "CleanStart — Hardened Container Images with Zero CVEs",
    description:
      "Pre-hardened, FIPS-compliant, near-zero-CVE container images. Build, deploy, and scale with confidence.",
    type: "website",
    siteName: "CleanStart",
  },
  twitter: {
    card: "summary_large_image",
    title: "CleanStart — Hardened Container Images with Zero CVEs",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
