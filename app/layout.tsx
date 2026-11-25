import type { Metadata } from "next";
import { Schibsted_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/header/navigation";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Benjamin Pedersen",
    template: "%s · Benjamin Pedersen",
  },
  description:
    "Personal site of Benjamin Pedersen, a student at Glemmen VGS in Fredrikstad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${schibstedGrotesk.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="fixed top-6 z-50 w-full">
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
