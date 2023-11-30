import "~/styles/globals.css";

import { Bungee_Hairline, Poiret_One } from "next/font/google";
import { type Metadata } from "next";

import config from "public/config.json";

export const metadata: Metadata = config.meta;

const heading = Bungee_Hairline({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const body = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} bg-s1`}>
        {children}
      </body>
    </html>
  );
}
