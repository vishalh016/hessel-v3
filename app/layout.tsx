import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hessel — Premium Catering Experience",
  description:
    "Luxury catering crafted for your most cherished moments. Weddings, corporate events, private celebrations and more.",
  openGraph: {
    title: "Hessel — Premium Catering Experience",
    description:
      "Luxury catering crafted for your most cherished moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-base text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
