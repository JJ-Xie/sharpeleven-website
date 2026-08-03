import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/* Display — the memo headline face. Low weight, high optical size. */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      className={`${newsreader.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
