export const metadata = {
  title: "Admin | R.V. Infrastructural",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-[#eff3f9]">{children}</div>;
}
