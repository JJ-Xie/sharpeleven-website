import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";

/* Display — tall, narrow, high-contrast. Ships a single 400 weight, which is
   why every display class is pinned to 400: asking for 500 would only get a
   synthesised faux-bold, and that wrecks a face with hairlines this fine. */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Body — carried over from the memos and the previous site. */
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Labels, meta, figures. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SharpEleven — Long-context architecture for frontier AI",
  description:
    "One forward pass over an input of any length. The representation is the memory, the index, the keys, and the values.",
  metadataBase: new URL("https://sharp-eleven.com"),
  openGraph: {
    title: "SharpEleven",
    description:
      "Long-context architecture for frontier AI. One pass, unbounded, fully contextualised, one object.",
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
      className={`${instrumentSerif.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
