import type { Metadata } from "next";
import { Great_Vibes } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

// Get the base URL from environment variable or use default
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://mars-landing-page-aey0t2ube-ians-projects-2d2fd58b.vercel.app");

export const metadata: Metadata = {
  title: {
    default: "Mars Migration Project - Join Humanity's Journey to Mars",
    template: "%s | Mars Migration Project",
  },
  description:
    "Join the Mars migration project led by Elon Musk. Secure your place in history as one of the first settlers on the Red Planet. Apply now for the most important journey of your life.",
  keywords: [
    "Mars",
    "Mars migration",
    "Mars colonization",
    "Elon Musk",
    "space exploration",
    "Mars settlement",
    "Red Planet",
    "space travel",
    "Mars mission",
    "interplanetary travel",
  ],
  authors: [{ name: "Mars Migration Project" }],
  creator: "Mars Migration Project",
  publisher: "Mars Migration Project",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ko: "/ko",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR"],
    url: baseUrl,
    siteName: "Mars Migration Project",
    title: "Mars Migration Project - Join Humanity's Journey to Mars",
    description:
      "Join the Mars migration project led by Elon Musk. Secure your place in history as one of the first settlers on the Red Planet. Apply now for the most important journey of your life.",
    images: [
      {
        url: `${baseUrl}/starship.png`,
        width: 1200,
        height: 630,
        alt: "Starship - Mars Migration Project",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mars Migration Project - Join Humanity's Journey to Mars",
    description:
      "Join the Mars migration project led by Elon Musk. Secure your place in history as one of the first settlers on the Red Planet. Apply now for the most important journey of your life.",
    images: [
      {
        url: `${baseUrl}/starship.png`,
        alt: "Starship - Mars Migration Project",
      },
    ],
    creator: "@MarsMigration",
    site: "@MarsMigration",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
        className={`${greatVibes.variable} great-vibes-regular antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
