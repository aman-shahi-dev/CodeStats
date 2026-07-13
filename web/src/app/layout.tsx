import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter, Courier_Prime } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CodeStats | Precision Analytics for Competitive Programmers",
    template: "%s | CodeStats",
  },
  description:
    "Track your Codeforces, LeetCode, and AtCoder stats in one beautiful dashboard. Professional-grade analytics for competitive programmers.",
  keywords: [
    "competitive programming",
    "codeforces",
    "leetcode",
    "atcoder",
    "codechef",
    "analytics",
    "rating tracker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${courierPrime.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
