import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const [schoolsCount, newsCount, messagesCount, basvuruCount] =
    await Promise.all([
      prisma.school.count(),
      prisma.news.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.burslulukBasvuru.count(),
    ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/admin/okullar"
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors"
        >
          <span className="material-icons text-3xl text-primary mb-3 block">
            school
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Üye Okullar
          </h3>
          <p className="text-2xl font-bold text-primary mt-1">{schoolsCount}</p>
        </Link>
        <Link
          href="/admin/haberler"
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors"
        >
          <span className="material-icons text-3xl text-primary mb-3 block">
            article
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white">Haberler</h3>
          <p className="text-2xl font-bold text-primary mt-1">{newsCount}</p>
        </Link>
        <Link
          href="/admin/mesajlar"
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors"
        >
          <span className="material-icons text-3xl text-primary mb-3 block">
            mail
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Okunmamış Mesajlar
          </h3>
          <p className="text-2xl font-bold text-primary mt-1">
            {messagesCount}
          </p>
        </Link>
        <Link
          href="/admin/basvurular"
          className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-colors"
        >
          <span className="material-icons text-3xl text-primary mb-3 block">
            assignment
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white">
            Bursluluk Başvuruları
          </h3>
          <p className="text-2xl font-bold text-primary mt-1">{basvuruCount}</p>
        </Link>
      </div>
    </div>
  );
}
