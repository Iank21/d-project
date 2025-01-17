import type { Metadata } from "next";
import "../view/globals.css";
import { cairo } from "../view/fonts";

export const metadata: Metadata = {
  title: "D-project",
  description: "Проект психологической оценки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
