import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrendHive",
  description:
    "Discover trending products and enjoy a seamless shopping experience on TrendHive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased bg-background-100`}>
        <NavBar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
