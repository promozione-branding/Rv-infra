import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });

export const metadata = {
  title: "R.V. Infrastructural Pvt. Ltd. | Crane & Construction Equipment Rental",
  description: "Crane rental, construction equipment hiring, plant erection and readymix concrete across India. ISO 9001 certified since 1999.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
