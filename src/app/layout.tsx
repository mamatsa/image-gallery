import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "ფოტო გალერეა",
  description: "აქსელერაციის პროგრამის მეორე ეტაპის დავალება",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-7xl">{children}</main>
      </body>
    </html>
  );
}
