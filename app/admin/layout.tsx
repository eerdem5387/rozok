import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      {session ? (
        <>
          <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <Link href="/admin" className="flex items-center gap-2">
                <span className="material-icons text-primary">dashboard</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  RÖOB CMS
                </span>
              </Link>
            </div>
            <nav className="p-4 space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="material-icons">space_dashboard</span>
                Dashboard
              </Link>
              <Link
                href="/admin/okullar"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="material-icons">school</span>
                Okullar
              </Link>
              <Link
                href="/admin/haberler"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="material-icons">article</span>
                Haberler
              </Link>
              <Link
                href="/admin/yonetim-kurulu"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="material-icons">groups</span>
                Yönetim Kurulu
              </Link>
              <Link
                href="/admin/mesajlar"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="material-icons">mail</span>
                İletişim Mesajları
              </Link>
              <Link
                href="/admin/basvurular"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <span className="material-icons">assignment</span>
                Bursluluk Başvuruları
              </Link>
            </nav>
            <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm"
              >
                <span className="material-icons text-sm">open_in_new</span>
                Siteyi Görüntüle
              </Link>
              <form action="/api/auth/signout" method="POST" className="mt-2">
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                >
                  <span className="material-icons text-sm">logout</span>
                  Çıkış Yap
                </button>
              </form>
            </div>
          </aside>
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </>
      ) : (
        <main className="flex-1">{children}</main>
      )}
    </div>
  );
}
