import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rize Özel Okullar Birliği",
  description: "Rize'deki özel öğretim kurumlarının kalitesini artırmak ve ortak standartları yükseltmek.",
  icons: {
    icon: "/rozok-logo.svg",
    shortcut: "/rozok-logo.svg",
    apple: "/rozok-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${lexend.variable} bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
