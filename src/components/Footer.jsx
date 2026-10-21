import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { company, navLinks, services } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">Construction equipment hiring, crane rental, plant erection and readymix concrete since 1999. ISO 9001 certified.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">{navLinks.map((l) => <li key={l.label}><Link href={l.href} className="transition hover:text-brand">{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Our Services</h4>
          <ul className="space-y-2 text-sm">{services.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
        </div>
        <div className="space-y-3 text-sm">
          <h4 className="mb-4 text-sm font-semibold text-white">Contact Us</h4>
          <p className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-brand" />{company.regOffice}</p>
          <p className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0 text-brand" />{company.phones.join(", ")}<br />{company.mobile}</p>
          <p className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0 text-brand" />{company.email}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {company.name} All Rights Reserved. CIN {company.cin} · GSTIN {company.gstin}
      </div>
    </footer>
  );
}
