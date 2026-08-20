import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { profile } from "@/lib/content";
import { RouteLoader } from "@/components/route-loader";
import "./globals.css";

const sans = localFont({
  src: "./fonts/original-salmon.otf",
  variable: "--font-sans",
  display: "swap",
});

const display = localFont({
  src: "./fonts/original-salmon.otf",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://ranggamrw.my.id";
const name = "Rangga Maulana Ramadhan Wiharto";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  alternateName: "rangga.mrw",
  url: siteUrl,
  jobTitle: profile.role,
  description:
    "Developer & mahasiswa Sistem Informasi; pembuat ALKONEK, RabegLab, AlkonekPlus, dan Prodesa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  sameAs: [
    profile.socials.github,
    profile.socials.linkedin,
    profile.socials.whatsapp,
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${name} — Digital Workspace`,
    template: `%s · ${name}`,
  },
  description:
    "Ruang kerja digital rangga.mrw — tempat saya belajar, membangun, dan menulis tentang proses jadi developer.",
  keywords: [
    "rangga.mrw",
    "rangga dev",
    "rangga.mrw portfolio",
    "Developer",
    "Software Engineer",
    "Systems Engineer",
    "Laravel",
    "Next.js",
    "Digital Workspace",
    "ALKONEK",
    "RabegLab",
    "AlkonekPlus",
    "Prodesa",
    "Rangga Maulana Ramadhan Wiharto",
  ],
  authors: [{ name, url: siteUrl }],
  creator: name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${name} — Digital Workspace`,
    description:
      "Ruang kerja digital rangga.mrw — tempat saya belajar, membangun, dan menulis tentang proses jadi developer.",
    siteName: name,
    locale: "id_ID",
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "rangga.mrw — ruang kerja digital" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} — Digital Workspace`,
    description:
      "Ruang kerja digital rangga.mrw — tempat saya belajar, membangun, dan menulis tentang proses jadi developer.",
    creator: "@rangga",
    images: [`${siteUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#0f1620",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="bg-bg text-fg antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            role="presentation"
          >
            <path
              d="M0,760 C240,700 480,820 720,760 C960,700 1200,820 1440,760 V900 H0 Z"
              fill="rgba(16,64,80,0.25)"
            />
            <path
              d="M0,120 C180,90 360,150 540,120 C720,90 900,150 1080,120 C1260,90 1350,130 1440,120"
              fill="none"
              stroke="rgba(160,196,208,0.16)"
              strokeWidth="1.5"
            />
            <path
              d="M0,260 C200,230 400,290 600,260 C800,230 1000,290 1200,260 C1320,240 1380,270 1440,260"
              fill="none"
              stroke="rgba(180,214,224,0.12)"
              strokeWidth="1.25"
            />
            <path
              d="M0,400 C220,370 440,430 660,400 C880,370 1100,430 1320,400"
              fill="none"
              stroke="rgba(160,196,208,0.10)"
              strokeWidth="1"
            />
            <path
              d="M0,540 C240,510 480,570 720,540 C960,510 1200,570 1440,540"
              fill="none"
              stroke="rgba(190,220,230,0.10)"
              strokeWidth="1.25"
            />
            <path
              d="M0,680 C260,650 520,710 780,680 C1040,650 1300,710 1440,680"
              fill="none"
              stroke="rgba(160,196,208,0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M0,60 C150,220 300,140 450,300 C600,460 750,380 900,540 C1050,700 1200,620 1440,820"
              fill="none"
              stroke="rgba(180,214,224,0.09)"
              strokeWidth="1.25"
            />
            <path
              d="M0,840 C180,700 360,780 540,640 C720,500 900,580 1080,440 C1260,300 1350,360 1440,220"
              fill="none"
              stroke="rgba(180,214,224,0.09)"
              strokeWidth="1.25"
            />
            <path
              d="M220,0 C250,150 180,300 260,450 C340,600 280,750 340,900"
              fill="none"
              stroke="rgba(190,220,230,0.07)"
              strokeWidth="1"
            />
            <path
              d="M680,0 C720,150 660,300 740,450 C820,600 760,750 820,900"
              fill="none"
              stroke="rgba(190,220,230,0.06)"
              strokeWidth="1"
            />
            <path
              d="M1180,0 C1220,150 1160,300 1240,450 C1320,600 1260,750 1320,900"
              fill="none"
              stroke="rgba(190,220,230,0.07)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <RouteLoader />
      </body>
    </html>
  );
}
