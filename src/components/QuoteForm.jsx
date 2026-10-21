"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { company } from "@/data/site";

const types = ["Crawler Crane", "Hydraulic Tyre Mounted Crane", "Boom / Scissor Lift", "Transit Mixer / Concrete Pump", "Road Equipment", "Other"];

// Opens the visitor's email app with the details pre-filled.
// Replace with a fetch() to an API route / email service when ready.
export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const body = Object.entries(d).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent("Quote request - " + d.name)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs font-medium text-navy">Full Name*<input required name="name" className="input mt-1" /></label>
      <label className="text-xs font-medium text-navy">Company Name<input name="company" className="input mt-1" /></label>
      <label className="text-xs font-medium text-navy">Email Address*<input required type="email" name="email" className="input mt-1" /></label>
      <label className="text-xs font-medium text-navy">Phone Number*<input required name="phone" className="input mt-1" /></label>
      <label className="text-xs font-medium text-navy">Project Location<input name="location" className="input mt-1" /></label>
      <label className="text-xs font-medium text-navy">Equipment Required
        <select name="equipment" className="input mt-1" defaultValue="">
          <option value="" disabled>Select equipment</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="text-xs font-medium text-navy sm:col-span-2">Project Details<textarea name="details" rows={3} placeholder="Tell us about your project..." className="input mt-1" /></label>
      <div className="flex items-center gap-4 sm:col-span-2">
        <button className="btn-primary">Submit Request <ArrowRight size={14} /></button>
        {sent && <span className="flex items-center gap-1 text-sm text-green-600"><CheckCircle2 size={16} /> Opening your email app…</span>}
      </div>
    </form>
  );
}
