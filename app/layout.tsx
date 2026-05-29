import type { Metadata } from "next";
import {
  Geist_Mono,
  Instrument_Serif,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SharpEleven — Long-context infrastructure for enterprise AI",
  description:
    "Efficient retrieval and reasoning systems designed for large-scale document intelligence workloads.",
  metadataBase: new URL("https://sharp-eleven.com"),
  openGraph: {
    title: "SharpEleven",
    description:
      "Long-context infrastructure for enterprise AI systems. Efficient retrieval and reasoning for large-scale document intelligence.",
    type: "website",
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
      className={`${sourceSerif.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
