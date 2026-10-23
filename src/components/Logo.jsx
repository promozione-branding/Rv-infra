import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
     <img src="/logo.png" alt="RV Infra" width={100} height={80}/>
    </Link>
  );
}
