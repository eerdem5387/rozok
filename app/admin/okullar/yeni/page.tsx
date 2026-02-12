import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { OkulForm } from "@/components/admin/OkulForm";

export default async function AdminOkulYeniPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Yeni Okul Ekle
      </h1>
      <OkulForm />
    </div>
  );
}
