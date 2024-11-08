import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import "animate.css";
import Providers from "@/lib/Providers";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/context/userProvider";

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
    <Providers>
      <html lang="en">
        <body className={`${poppins.className}  antialiased bg-background-100`}>
          <Toaster />
          <UserProvider>
            <NavBar />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </UserProvider>
        </body>
      </html>
    </Providers>
  );
}
