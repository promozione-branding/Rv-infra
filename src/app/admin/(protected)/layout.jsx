import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-screen lg:flex">
      <AdminSidebar />
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-9">{children}</div>
    </div>
  );
}
