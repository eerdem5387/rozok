import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SINIFLAR } from "@/lib/bursluluk-constants";
import BasvurularFiltreVeExport from "./BasvurularFiltreVeExport";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export default async function AdminBasvurularPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string; dateFrom?: string; dateTo?: string; refNo?: string; studentName?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const grade = params.grade;
  const dateFrom = params.dateFrom;
  const dateTo = params.dateTo;
  const refNo = params.refNo;
  const studentName = params.studentName;

  const where: Record<string, unknown> = {};
  if (grade) where.grade = grade;
  if (refNo) where.refNo = { contains: refNo };
  if (studentName) where.studentName = { contains: studentName };
  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) (where.createdAt as Record<string, Date>).gte = new Date(dateFrom);
    if (dateTo) {
      const d = new Date(dateTo);
      d.setHours(23, 59, 59, 999);
      (where.createdAt as Record<string, Date>).lte = d;
    }
  }

  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);

  const [total, dailyCount, weeklyCount, byGrade, basvurular] = await Promise.all([
    prisma.burslulukBasvuru.count(),
    prisma.burslulukBasvuru.count({
      where: { createdAt: { gte: todayStart } },
    }),
    prisma.burslulukBasvuru.count({
      where: { createdAt: { gte: weekStart } },
    }),
    prisma.burslulukBasvuru.groupBy({
      by: ["grade"],
      _count: { grade: true },
      orderBy: { grade: "asc" },
    }),
    prisma.burslulukBasvuru.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const exportQuery = new URLSearchParams();
  if (grade) exportQuery.set("grade", grade);
  if (dateFrom) exportQuery.set("dateFrom", dateFrom);
  if (dateTo) exportQuery.set("dateTo", dateTo);
  if (refNo) exportQuery.set("refNo", refNo);
  if (studentName) exportQuery.set("studentName", studentName);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Bursluluk Başvuruları
        </h1>
        <a
          href={`/api/admin/basvurular/export?${exportQuery.toString()}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rize-green text-white font-semibold hover:bg-rize-green/90 transition-colors"
        >
          <span className="material-icons text-lg">download</span>
          Excel (CSV) İndir
        </a>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Toplam Başvuru</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Bugün</p>
          <p className="text-2xl font-bold text-primary mt-1">{dailyCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Son 7 Gün</p>
          <p className="text-2xl font-bold text-rize-green mt-1">{weeklyCount}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Sınıfa Göre</p>
          <div className="flex flex-wrap gap-2">
            {SINIFLAR.map((g) => {
              const item = byGrade.find((x) => x.grade === String(g));
              const count = item?._count?.grade ?? 0;
              return (
                <span
                  key={g}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium"
                >
                  {g}. Sınıf: {count}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filtreleme */}
      <BasvurularFiltreVeExport
        initialGrade={grade}
        initialDateFrom={dateFrom}
        initialDateTo={dateTo}
        initialRefNo={refNo}
        initialStudentName={studentName}
      />

      {/* Tablo */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                  Ref No
                </th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                  Öğrenci
                </th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                  Sınıf
                </th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                  Okul
                </th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                  Veli (Baba/Anne)
                </th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300">
                  Tarih
                </th>
                <th className="text-left p-4 font-semibold text-slate-700 dark:text-slate-300 w-20">
                  Detay
                </th>
              </tr>
            </thead>
            <tbody>
              {basvurular.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    {Object.keys(params).length > 0
                      ? "Filtreye uygun başvuru bulunamadı."
                      : "Henüz başvuru yok."}
                  </td>
                </tr>
              ) : (
                basvurular.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  >
                    <td className="p-4 font-mono text-sm text-primary">{b.refNo}</td>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      {b.studentName}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{b.grade}. Sınıf</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
                      {b.currentSchool || "—"}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                      {[b.fatherName, b.motherName].filter(Boolean).join(" / ") || "—"}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 text-sm">
                      {new Date(b.createdAt).toLocaleString("tr-TR")}
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/basvurular/${b.id}`}
                        className="inline-flex items-center gap-1 text-primary font-medium hover:underline text-sm"
                      >
                        Detay
                        <span className="material-icons text-sm">arrow_forward</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
