/***************************************************************
                NOTES
***************************************************************/
/*
- Root layout component
- Handles loading states
- Uses TypeScript
*/

/***************************************************************
                IMPORTS
***************************************************************/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LinksProvider } from "@/context/LinksContext";

/***************************************************************
                Constants
***************************************************************/
const inter = Inter({ subsets: ["latin"] });

/***************************************************************
                Types
***************************************************************/
interface RootLayoutProps {
  children: React.ReactNode;
}

/***************************************************************
                Components
***************************************************************/
export const metadata: Metadata = {
  title: "Zazzy",
  description: "Your personal link tree",
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LinksProvider>
          {children}
        </LinksProvider>
      </body>
    </html>
  );
}
