import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col items-center leading-none">
      <img src="/logo.png" alt="RV Infrastructural Pvt. Ltd." width={120} height={80} />
      <span className="mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
        RV Infrastructural Pvt. Ltd.
      </span>
    </Link>
  );
}