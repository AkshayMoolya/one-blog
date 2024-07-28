import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/shared/provider";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-68px)] max-w-4xl px-8 pb-16 pt-24">
            {children}
          </main>
        </body>
      </html>
    </Providers>
  );
}
