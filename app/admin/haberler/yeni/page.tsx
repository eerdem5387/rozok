import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminHaberYeniPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Yeni Haber Ekle
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Haber ekleme formu. API hazır; isterseniz bu sayfaya form bileşeni ekleyebilirsiniz.
      </p>
      <Link
        href="/admin/haberler"
        className="text-primary hover:underline font-medium"
      >
        ← Haber listesine dön
      </Link>
    </div>
  );
}
