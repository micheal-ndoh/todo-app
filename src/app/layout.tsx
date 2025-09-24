import "../styles/globals.css";

import { type Metadata } from "next";
import ThemeToggle from "./_components/ThemeToggle";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A clean, fast Todo app with edit, filters, completion, and theme toggle.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = localFont({
  src: [
    {
      path: "../../public/fonts/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
