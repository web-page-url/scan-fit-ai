import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScanFit - AI-Powered Job & Resume Matcher",
  description: "Let AI scan your resume, fit your dream job. Analyze job descriptions and resumes with intelligent matching and optimization suggestions.",
  keywords: ["resume", "job matching", "AI", "career", "recruitment", "ATS optimization"],
  authors: [{ name: "ScanFit" }],
  creator: "ScanFit",
  publisher: "ScanFit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://scan-fit-ai.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ScanFit - AI-Powered Job & Resume Matcher",
    description: "Let AI scan your resume, fit your dream job. Analyze job descriptions and resumes with intelligent matching and optimization suggestions.",
    url: "https://scan-fit-ai.vercel.app",
    siteName: "ScanFit",
    images: [
      {
        url: "/scan-fit.png",
        width: 1200,
        height: 630,
        alt: "ScanFit - AI-Powered Job & Resume Matcher",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScanFit - AI-Powered Job & Resume Matcher",
    description: "Let AI scan your resume, fit your dream job. Analyze job descriptions and resumes with intelligent matching and optimization suggestions.",
    images: ["/scan-fit.png"],
    creator: "@scanfit_ai",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ScanFit",
      "description": "AI-powered job and resume matcher that analyzes compatibility between job descriptions and resumes, providing intelligent matching and optimization suggestions.",
      "url": "https://scan-fit-ai.vercel.app",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "AI-powered resume analysis",
        "Job description compatibility scoring",
        "Resume optimization suggestions",
        "File upload support (PDF, DOCX, TXT)",
        "Export optimized resumes"
      ],
      "author": {
        "@type": "Organization",
        "name": "ScanFit"
      }
    }),
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
