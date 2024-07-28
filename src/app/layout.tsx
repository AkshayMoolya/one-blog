import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/shared/provider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-8 pb-16 pt-24">
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
