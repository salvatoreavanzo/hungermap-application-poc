import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hanger Map PoC",
  description: "A Nextjs application using Mapbox and Leaflet",
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
    <header
        style={{
            background: "#2E4053",
            padding: "1rem",
        }}
    >
        <p>Hunger Map PoC</p>
    </header>
    {children}
    <footer
        style={{
            background: "ghostwhite",
            padding: "1rem",
        }}
    >
        <p>Footer</p>
    </footer>
    </body>

    </html>
  );
}
