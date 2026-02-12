import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminYonetimKuruluYeniPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Yeni Yönetim Kurulu Üyesi
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Üye ekleme formu. API hazır; isterseniz bu sayfaya form bileşeni ekleyebilirsiniz.
      </p>
      <Link
        href="/admin/yonetim-kurulu"
        className="text-primary hover:underline font-medium"
      >
        ← Yönetim kurulu listesine dön
      </Link>
    </div>
  );
}
