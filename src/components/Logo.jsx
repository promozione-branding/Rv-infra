import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-10 w-12 items-center justify-center rounded bg-brand text-xl font-extrabold italic text-navy">RV</span>
      <span className="leading-tight">
        <span className="block text-sm font-bold tracking-wide text-white">RV INFRASTRUCTURAL</span>
        <span className="block text-[10px] font-semibold tracking-[0.25em] text-brand">PRIVATE LIMITED</span>
      </span>
    </Link>
  );
}
