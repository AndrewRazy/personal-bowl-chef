import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bowl Chef — Drag, Drop & Cook",
  description:
    "Drag healthy ingredients into your bowl and let a local AI chef craft a real recipe you can cook.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-slate-800">{children}</body>
    </html>
  );
}
