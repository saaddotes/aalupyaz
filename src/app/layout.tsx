import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DataContextProvider from "@/context/dataContext";
import AuthContextProvider from "@/context/authContext";
import ShoppingCart from "@/components/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vegetable Store",
  description: "Har cheez , Har pal , Har jagah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <DataContextProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <ShoppingCart />
          </body>
        </DataContextProvider>
      </AuthContextProvider>
    </html>
  );
}
