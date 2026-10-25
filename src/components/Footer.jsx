import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { company, navLinks, services } from "@/data/site";

const GREY_TOP = {
  background:
    "linear-gradient(180deg, #f7f8fa 0%, #e3e5e9 38%, #cfd2d8 70%, #bfc3ca 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.08)",
};

const serviceLinks = {
  "Crane Rental Services": "/products/category/cranes",
  "Heavy Lifting & Erection": "/products/crawler-cranes",
  "Plant Erection": "/projects",
  "Construction Equipment Hiring": "/products",
  "Readymix Concrete": "/products/category/concrete",
  "Skilled Operators & Support": "/contact",
};

// "011-45570007" -> "+911145570007", "9811017313" -> "+919811017313"
const telHref = (n) => `tel:+91${n.replace(/\D/g, "").replace(/^0/, "")}`;

const linkClass = "transition hover:text-[#7f0b18] hover:underline underline-offset-4";

export default function Footer() {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    company.regOffice
  )}`;

  return (
    <footer style={GREY_TOP}>
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Construction equipment hiring, crane rental, plant erection and
            readymix concrete since 1999. ISO 9001 certified.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-gray-900">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={`${linkClass} text-gray-700`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-gray-900">
            Our Categories
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {services.map((s) => (
              <li key={s.title}>
                <Link
                  href={serviceLinks[s.title] || "/products"}
                  className={linkClass}
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="mb-4 text-sm font-semibold text-gray-900">
            Contact Us
          </h4>

          <p className="flex gap-3 text-gray-700">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#7f0b18]" />
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {company.regOffice}
            </a>
          </p>

          <p className="flex gap-3 text-gray-700">
            <Phone size={16} className="mt-0.5 shrink-0 text-[#7f0b18]" />
            <span>
              {company.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 && ", "}
                  <a href={telHref(p)} className={linkClass}>
                    {p}
                  </a>
                </span>
              ))}
              <br />
              <a href={telHref(company.mobile)} className={linkClass}>
                {company.mobile}
              </a>
            </span>
          </p>

          <p className="flex gap-3 text-gray-700">
            <Mail size={16} className="mt-0.5 shrink-0 text-[#7f0b18]" />
            <a href={`mailto:${company.email}`} className={`${linkClass} break-all`}>
              {company.email}
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-navy px-4 py-4 text-white max-[600px]:flex-col max-[600px]:items-start">
        <small>© {new Date().getFullYear()}. All rights reserved.</small>

        <small>
          Website Designed By{" "}
          <a
            href="https://inquirybazaar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline-offset-4 transition-colors hover:underline"
          >
            Inquiry Bazaar Pvt. Ltd.
          </a>
        </small>
      </div>
    </footer>
  );
}