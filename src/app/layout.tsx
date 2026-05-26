import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "AstroClock — Real-time Ephemeris & Cosmic Alignment Clock",
  description: "A stunning, interactive real-time astrological clock. Track planetary geocentric coordinates, velocities, and retrograde motions with celestial accuracy.",
};

export const viewport: import("next").Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-[#f3eff9] bg-[#04020a] min-h-screen relative">
        {/* Ambient cosmic backgrounds */}
        <div className="stars-bg" id="ambient-stars" />
        <div className="stars-bg-dense" id="ambient-stars-dense" />
        <div className="nebula-purple" id="ambient-nebula-1" />
        <div className="nebula-pink" id="ambient-nebula-2" />
        
        {/* Main application content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
