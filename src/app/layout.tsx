import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { MenuProvider } from "./context/MenuProvider";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cake mate",
  description: "ケーキ画像を自由に創作できるアプリです。",
  icons: {
    icon: "/siteImage1.png",
    shortcut: "/siteImage1-32x32.png",
    apple: "/siteImage1.png",
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
        <MenuProvider>
          <Header />
          <main className="pt-16 pb-10">{children}</main>
          <Footer />
        </MenuProvider>
      </body>
    </html>
  );
}
