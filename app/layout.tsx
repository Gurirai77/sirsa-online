import "./globals.css";
import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sirsa Online | News, Tourism, Restaurants & Schools in Sirsa",
  description: "Explore Sirsa city with latest news, tourist places, restaurants and schools. Complete local guide for Sirsa, Haryana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}