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
      <body className="text-slate-800 antialiased">{children}</body>
    </html>
  );
}
