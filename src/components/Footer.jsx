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


export default function Footer() {
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
                <Link
                  href={l.href}
                  className="transition hover:text-brand text-gray-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-gray-900">
            Our Services
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {services.map((s) => (
              <li key={s.title}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <h4 className="mb-4 text-sm font-semibold text-gray-900">
            Contact Us
          </h4>
          <p className="flex gap-3 text-gray-700">
            <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
            {company.regOffice}
          </p>
          <p className="flex gap-3 text-gray-700">
            <Phone size={16} className="mt-0.5 shrink-0 text-brand" />
            {company.phones.join(", ")}
            <br />
            {company.mobile}
          </p>
          <p className="flex gap-3 text-gray-700">
            <Mail size={16} className="mt-0.5 shrink-0 text-brand" />
            {company.email}
          </p>
        </div>
      </div>

 <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 max-[600px]:flex-col max-[600px]:items-start bg-navy px-4 py-4 text-white">
  <small>
    © {new Date().getFullYear()}. All rights reserved.
  </small>

  <small>
    Website Designed By 
    <a
      href="https://inquirybazaar.com/"
      className="font-medium underline-offset-4 transition-colors hover:underline"
    >
     {""} Inquiry Bazaar Pvt. Ltd.
    </a>
  </small>
</div>
    </footer>
  );
}