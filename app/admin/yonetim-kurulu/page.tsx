import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminYonetimKuruluPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const members = await prisma.boardMember.findMany({
    orderBy: [{ isChairman: "desc" }, { order: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Yönetim Kurulu
        </h1>
        <Link
          href="/admin/yonetim-kurulu/yeni"
          className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 flex items-center gap-2"
        >
          <span className="material-icons text-lg">add</span>
          Yeni Üye
        </Link>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Ad
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Unvan / Rol
              </th>
              <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                Başkan
              </th>
              <th className="text-right p-4 font-semibold text-slate-700 dark:text-slate-300">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  Henüz üye eklenmemiş.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {m.name}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {m.title} / {m.role}
                  </td>
                  <td className="p-4">
                    {m.isChairman ? (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded">
                        Başkan
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/yonetim-kurulu/${m.id}`}
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
