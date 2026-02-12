import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminOkullarPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const schools = await prisma.school.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Üye Okullar
        </h1>
        <Link
          href="/admin/okullar/yeni"
          className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2"
        >
          <span className="material-icons text-lg">add</span>
          Yeni Okul
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Okul Adı
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                İlçe
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Kademe
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Durum
              </th>
              <th className="text-right p-4 font-semibold text-slate-700 dark:text-slate-300">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {schools.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Henüz okul eklenmemiş. Yeni okul ekleyebilirsiniz.
                </td>
              </tr>
            ) : (
              schools.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {s.name}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {s.district}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {s.level}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        s.published
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {s.published ? "Yayında" : "Taslak"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/okullar/${s.id}`}
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
