import type { Metadata } from "next";
// import localFont from "next/font/local";
import { ibm } from "./fonts";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "SEMES 3-step monitor",
  description: "3-step Inspection Module Integrated Monitor",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${ibm.className} antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
