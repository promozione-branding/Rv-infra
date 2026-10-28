"use client";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Public site shows header/footer; the admin area gets a clean screen.
export default function SiteChrome({ children }) {
  const pathname = usePathname() || "";
  if (pathname.startsWith("/admin")) return <main>{children}</main>;
  return (
    <>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
