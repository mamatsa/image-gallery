import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Image Gallery",
  description:
    "Making Science | Sweeft Acceleration Program / React.js II Step task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-7xl">{children}</main>
      </body>
    </html>
  );
}
