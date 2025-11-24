import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

// Get the base URL dynamically at runtime for metadataBase
// This ensures the correct URL is used regardless of build-time vs runtime differences
function getBaseUrl(): string {
  // In production, use environment variables or headers
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  // Fallback to a default production URL
  return "https://mars-landing-page-aey0t2ube-ians-projects-2d2fd58b.vercel.app";
}

const baseUrl = getBaseUrl();

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
  // Use metadataBase with relative URLs - Next.js will convert them to absolute URLs
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
        url: "/starship.png", // Use relative path - metadataBase will convert to absolute URL
        width: 1200,
        height: 630,
        alt: "Mars Migration Project - Join Humanity's Journey to Mars",
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
        url: "/starship.png", // Use relative path - metadataBase will convert to absolute URL
        alt: "Mars Migration Project - Join Humanity's Journey to Mars",
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
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics
          mode={
            process.env.NODE_ENV === "production" ? "production" : "development"
          }
          debug={process.env.NODE_ENV === "development"}
        />
      </body>
    </html>
  );
}
