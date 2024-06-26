import type { Metadata } from "next";
import Providers from "./providers";
import { ProvidersTwo } from "./GlobalRedux/provider";
import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Topbar";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Coin Flow",
  description:
    "CoinFlow: Your Comprehensive Cryptocurrency Hub - Stay ahead of the market with CoinFlow",
  icons: {
    icon: [
      {
        url: "/images/logo.ico",
      },
    ],
  },
};

const grotesk = Space_Grotesk({ subsets: [] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={grotesk.className}>
      <body className="flex flex-col justify-center items-center dark:bg-dark-background bg-light-background">
        <ProvidersTwo>
          <Providers>
            <Topbar />
            <div className="w-full flex justify-center items-center  bg-white dark:bg-dark-background ">
              <Navbar />
            </div>
            {children}
          </Providers>
        </ProvidersTwo>
      </body>
    </html>
  );
}
