"use client"

import { motion, MotionConfig } from "framer-motion"
import { contact } from "@/data/site"

const WhatsApp = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const Call = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
)

const linkCls = "group/fc relative flex items-center justify-end gap-2.5"
const labelCls = "pointer-events-none translate-x-3.5 whitespace-nowrap rounded-full border-2 border-solid border-ink bg-white px-4 py-2 text-[0.85rem] font-semibold opacity-0 transition-[opacity,transform] duration-[180ms] ease-out group-hover/fc:translate-x-0 group-hover/fc:opacity-100 group-focus-visible/fc:translate-x-0 group-focus-visible/fc:opacity-100 max-[720px]:hidden"

const btnCls = "relative grid h-[58px] w-[58px] place-items-center rounded-full border-2 border-solid border-ink shadow-[0_10px_22px_rgba(31,42,51,0.28)] transition-[transform,box-shadow] duration-[180ms] ease-out group-hover/fc:-translate-y-1 group-hover/fc:scale-[1.06] group-hover/fc:shadow-[0_16px_28px_rgba(31,42,51,0.34)] max-[720px]:h-[52px] max-[720px]:w-[52px]"
const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

export default function FloatingContact() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed bottom-10 right-11 z-40 flex flex-col items-end gap-3.5 max-[720px]:bottom-4 max-[720px]:right-3.5 max-[720px]:gap-3">
        <motion.div
          initial={{ scale: 0, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 1.6 }}
        >
          <a className={linkCls} href={wa} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
            <span className={labelCls}>Chat on WhatsApp</span>
            <span className={`${btnCls} bg-[#25d366] text-white before:pointer-events-none before:absolute before:-inset-0.5 before:animate-fc-pulse before:rounded-circle before:border-2 before:border-solid before:border-[#25d366] before:content-['']`}>
              <WhatsApp />
            </span>
          </a>
        </motion.div>
        <motion.div
          initial={{ scale: 0, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 1.8 }}
        >
          <a className={linkCls} href={`tel:${contact.phoneHref}`} aria-label="Call us">
            <span className={labelCls}>Call us</span>
            <span className={`${btnCls} bg-[#e82f17] text-white`}>
              <Call />
            </span>
          </a>
        </motion.div>
      </div>
    </MotionConfig>
  )
}