import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { pageSeo, buildMetadata } from "@/data/seo";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

// Home page metadata (the home page is a client component, so it inherits from here).
export const metadata = buildMetadata(pageSeo.home);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
