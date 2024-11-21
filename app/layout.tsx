import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
