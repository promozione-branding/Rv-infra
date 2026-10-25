"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send, X } from "lucide-react";

const ROYAL_RED = "#B3112B";
const ROYAL_RED_DARK = "#7A0B1E";
const YELLOW = "#FFC72C";

const empty = {
  name: "",
  company: "",
  phone: "",
  email: "",
  product: "",
  location: "",
  message: "",
};

const fieldClass =
  "w-full rounded-md border border-grey/15 px-3 py-2 text-sm text-grey-500 placeholder-slate-500 outline-none transition focus:border-[#FFC72C] focus:ring-2 focus:ring-[#FFC72C]/30";
const labelClass =
  "mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-black-300";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="text-[#FFC72C]"> *</span>}
      </span>
      {children}
    </label>
  );
}


export default function QuoteModal({ open, onClose, product = "" }) {
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const firstRef = useRef(null);

  useEffect(() => {
    if (open) {
      setForm({ ...empty, product });
      setSent(false);
      setError("");
      const t = setTimeout(() => firstRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open, product]);

  // esc to close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative max-h-[92vh] w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
          >
            {/* yellow top accent */}
            <div className="h-1 w-full" style={{ background: YELLOW }} />

            {/* header */}
            <div
              className="relative px-5 py-3.5 sm:px-6"
              style={{
                background: `linear-gradient(135deg, ${ROYAL_RED} 0%, ${ROYAL_RED_DARK} 55%, #0A0A0A 100%)`,
              }}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-[#FFC72C] hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
              <h2
                id="quote-title"
                className="text-xl font-extrabold text-white sm:text-2xl"
              >
                Request a <span style={{ color: YELLOW }}>Quote</span>
              </h2>
              <p className="mt-0.5 text-xs text-slate-200">
                Tell us what you need and we'll get back with pricing.
              </p>
            </div>

            {/* body */}
            <div className="max-h-[calc(92vh-90px)] overflow-y-auto px-5 py-4 sm:px-6 bg-white">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <CheckCircle2
                    className="mx-auto h-12 w-12"
                    style={{ color: YELLOW }}
                  />
                  <h3 className="mt-4 text-xl font-bold text-white">
                    Thank you, {form.name.split(" ")[0] || "we've got it"}!
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-slate-300">
                    Your request has been received. We will contact you shortly
                    with a quotation.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-lg px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
                    style={{ background: YELLOW }}
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input
                      ref={firstRef}
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your name"
                      className={fieldClass}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Company name"
                      className={fieldClass}
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="Phone" required>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="Enter Mobile Number"
                      className={fieldClass}
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="Enter Email"
                      className={fieldClass}
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Equipment needed" required>
                    <input
                      required
                      value={form.product}
                      onChange={set("product")}
                      placeholder="e.g. 100T crane, piling rig"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Site location" required>
                    <input
                      required
                      value={form.location}
                      onChange={set("location")}
                      placeholder="City / project site"
                      className={fieldClass}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Project details">
                      <textarea
                        rows={2}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Load weight, lift height, operators needed, anything else we should know…"
                        className={`${fieldClass} resize-none`}
                      />
                    </Field>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 sm:col-span-2" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-2.5 sm:col-span-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#FFC72C] hover:text-[#FFC72C]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-2 text-sm font-bold text-black shadow-[0_6px_18px_rgba(255,199,44,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
                      style={{ background: YELLOW }}
                    >
                      {sending ? "Sending…" : "Submit Request"}
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}