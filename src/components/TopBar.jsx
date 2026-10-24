import { contact } from "@/data/site"

const Phone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
)

const Mail = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

const linkCls = "inline-flex min-w-0 items-center gap-2 transition-opacity duration-[180ms] ease-out hover:opacity-70"
const textCls = "overflow-hidden text-ellipsis whitespace-nowrap"

export default function TopBar() {
  return (
    <div className="relative z-[31] bg-[#cdcdcd] text-[0.82rem] font-semibold text-ink max-[720px]:rounded-b-[14px] max-[720px]:text-[0.74rem]">
      <div className="flex min-h-9 items-center justify-between gap-4 px-11 py-1.5 max-[720px]:px-3">
        <div className="flex min-w-0 items-center gap-[26px] max-[720px]:w-full max-[720px]:justify-between max-[720px]:gap-2.5">
          <a href={`tel:${contact.phoneHref}`} className={linkCls}>
            <Phone />
            <span className={textCls}>{contact.phone}</span>
          </a>
          <a href={`mailto:${contact.email}`} className={linkCls}>
            <Mail />
            <span className={textCls}>{contact.email}</span>
          </a>
        </div>
        <span className="whitespace-nowrap max-[720px]:hidden">{contact.hours}</span>
      </div>
    </div>
  )
}