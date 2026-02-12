import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminHaberlerPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const news = await prisma.news.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Haberler
        </h1>
        <Link
          href="/admin/haberler/yeni"
          className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2"
        >
          <span className="material-icons text-lg">add</span>
          Yeni Haber
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Başlık
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Kategori
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Tarih
              </th>
              <th className="text-right p-4 font-semibold text-slate-700 dark:text-slate-300">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {news.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Henüz haber yok.
                </td>
              </tr>
            ) : (
              news.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="p-4 font-medium text-slate-900 dark:text-white max-w-xs truncate">
                    {n.title}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {n.category}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {new Date(n.publishedAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/haberler/${n.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
