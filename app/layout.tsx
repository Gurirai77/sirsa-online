import "./globals.css";
import Navbar from "../components/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sirsa Portal",
  description: "Explore schools, restaurants, tourism and news in Sirsa",
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