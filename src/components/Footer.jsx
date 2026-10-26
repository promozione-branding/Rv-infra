import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  UserCog,
  Settings,
  Construction,
  Grab,
  Truck,
  Container,
  Factory,
  HardHat,
} from "lucide-react";
import Logo from "./Logo";
import { company } from "@/data/site";

const YELLOW = "#f5b82e";
const NAVY = "#111c2e";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Crawler Cranes", href: "/products/crawler-cranes", Icon: Construction },
  { label: "Hydraulic Grabs", href: "/products", Icon: Grab },
  { label: "Concrete Pumps", href: "/products/category/concrete", Icon: Truck },
  { label: "Self Loading Mixers", href: "/products/category/concrete", Icon: Container },
  { label: "Plant Erection", href: "/projects", Icon: Factory },
  { label: "Skilled Operators", href: "/contact", Icon: HardHat },
];

const badges = [
  { Icon: ShieldCheck, text: ["ISO 9001", "Certified"] },
  { Icon: UserCog, text: ["Trusted", "Since 1999"] },
  { Icon: Settings, text: ["Reliable", "Support"] },
];

const socials = [
  { label: "LinkedIn", glyph: "in", bg: "#0a66c2" },
  { label: "Facebook", glyph: "f", bg: "#3b5998" },
  {
    label: "Instagram",
    glyph: "ig",
    bg: "radial-gradient(circle at 30% 107%,#fdf497 0%,#fd5949 45%,#d6249f 60%,#285aeb 90%)",
  },
  { label: "YouTube", glyph: "yt", bg: "#e00000" },
];

const telHref = (n) => `tel:+91${n.replace(/\D/g, "").replace(/^0/, "")}`;
const linkClass = "transition-colors hover:text-[#7f0b18] hover:underline underline-offset-4";
const col = "lg:border-l lg:border-gray-300/70 lg:px-7";

const Bubble = ({ size, children }) => (
  <span
    className="flex shrink-0 items-center justify-center rounded-full bg-[#fdf0d2]"
    style={{ width: size, height: size }}
  >
    {children}
  </span>
);

const Heading = ({ children }) => (
  <div className="mb-4">
    <h4 className="text-lg font-bold leading-none text-[#0f1a2e]">{children}</h4>
    <span className="mt-2 block h-[3px] w-10 rounded-full" style={{ background: YELLOW }} />
  </div>
);

function SocialGlyph({ glyph }) {
  if (glyph === "ig")
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (glyph === "yt")
    return (
      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
        <path d="M9 7l8 5-8 5z" />
      </svg>
    );
  return <span className="text-base font-extrabold leading-none">{glyph}</span>;
}

export default function Footer() {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.regOffice
  )}`;

  return (
    <footer className="font-[Poppins,sans-serif]">
      <div
        className="relative overflow-hidden border-b-[3px]"
        style={{
          background: "linear-gradient(180deg,#f4f7fb,#fbfcfe 55%,#f1f4f9)",
          borderColor: YELLOW,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 hidden h-[170px] w-[100px] lg:block"
          style={{ background: YELLOW, clipPath: "polygon(0 0,100% 0,0 100%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/suppliers.png)",
              clipPath: "polygon(30% 0,100% 0,100% 100%,82% 100%)",
              maskImage: "linear-gradient(90deg,transparent,rgba(0,0,0,.35) 22%,#000 100%)",
              WebkitMaskImage: "linear-gradient(90deg,transparent,rgba(0,0,0,.35) 22%,#000 100%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 h-[130px] w-[110px]"
            style={{ background: NAVY, clipPath: "polygon(100% 0,100% 100%,0 100%)" }}
          />
        </div>

        <div className="container-x relative z-10 grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_0.95fr_2.25fr] lg:gap-0 lg:py-12">
          {/* brand */}
          <div className="lg:pr-8 lg:pt-6">
            {/* Logo already contains the company name; keep it left-aligned */}
            <div className="flex justify-start [&>*]:!mx-0 [&>*]:!ml-0">
              <Logo />
            </div>
            <span className="mt-3 block h-[3px] w-10 rounded-full" style={{ background: YELLOW }} />
            <p className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-[#4b5565]">
              Construction equipment hiring, crane rental, plant erection and readymix
              concrete since 1999. ISO 9001 certified.
            </p>
            <ul className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(125px,1fr))] gap-y-3 lg:grid-cols-3">
              {badges.map(({ Icon, text }) => (
                <li
                  key={text[0]}
                  className="flex items-center gap-2 lg:px-3 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-gray-300/80"
                >
                  <Bubble size={34}>
                    <Icon size={16} strokeWidth={1.6} className="text-[#0f1a2e]" />
                  </Bubble>
                  <span className="whitespace-nowrap text-xs font-medium leading-snug text-[#0f1a2e]">
                    {text[0]}
                    <br />
                    {text[1]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* quick links */}
          <div className={col}>
            <Heading>Quick Links</Heading>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={`${linkClass} flex items-center gap-3 text-[15px] text-[#3a4352]`}>
                    <ChevronRight size={15} strokeWidth={2.6} style={{ color: YELLOW }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* categories */}
          <div className={col}>
            <Heading>Our Categories</Heading>
            <ul className="space-y-1.5">
              {categories.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link href={href} className={`${linkClass} flex items-center gap-3 text-[15px] text-[#3a4352]`}>
                    <Bubble size={32}>
                      <Icon size={16} strokeWidth={1.5} className="text-[#0f1a2e]" />
                    </Bubble>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="lg:border-l lg:border-gray-300/70 lg:pl-7">
            <Heading>Contact Us</Heading>
            <div className="space-y-3 text-[14px] leading-relaxed text-[#2f3846]">
              <p className="flex items-start gap-3">
                <Bubble size={38}>
                  <MapPin size={18} strokeWidth={1.6} className="text-[#0f1a2e]" />
                </Bubble>
                <a href={mapHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} max-w-[300px]`}>
                  {company.regOffice}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Bubble size={38}>
                  <Phone size={18} strokeWidth={1.6} className="text-[#0f1a2e]" />
                </Bubble>
                <span>
                  {company.phones.map((p, i) => (
                    <span key={p}>
                      {i > 0 && ", "}
                      <a href={telHref(p)} className={linkClass}>{p}</a>
                    </span>
                  ))}
                  <br />
                  <a href={telHref(company.mobile)} className={linkClass}>{company.mobile}</a>
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Bubble size={38}>
                  <Mail size={18} strokeWidth={1.6} className="text-[#0f1a2e]" />
                </Bubble>
                <a href={`mailto:${company.email}`} className={`${linkClass} break-all`}>
                  {company.email}
                </a>
              </p>
            </div>
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5"
                  style={{ background: s.bg }}
                >
                  <SocialGlyph glyph={s.glyph} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-4 text-sm text-white sm:px-[3.5%] max-[600px]:flex-col max-[600px]:items-start"
        style={{ background: NAVY }}
      >
        <small>© {new Date().getFullYear()}. All rights reserved.</small>
        <small>
          Website Designed By{" "}
          <a
            href="https://inquirybazaar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline-offset-4 hover:underline"
            style={{ color: YELLOW }}
          >
            Inquiry Bazaar Pvt. Ltd.
          </a>
        </small>
      </div>
    </footer>
  );
}