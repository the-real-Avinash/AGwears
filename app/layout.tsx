import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Brand",
  description: "Your go‑to clothing shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-50 text-gray-900"}>
        {children}
      </body>
    </html>
  );
}
