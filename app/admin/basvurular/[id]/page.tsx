import { getServerSession } from "next-auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  const v = value?.trim();
  return (
    <div className="py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="mt-1 text-slate-900 dark:text-white">{v || "—"}</dd>
    </div>
  );
}

export default async function AdminBasvuruDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const b = await prisma.burslulukBasvuru.findUnique({
    where: { id },
  });

  if (!b) notFound();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/basvurular"
            className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-primary text-sm font-medium"
          >
            <span className="material-icons text-lg">arrow_back</span>
            Başvuru listesine dön
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Başvuru: {b.refNo}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Öğrenci Bilgileri */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-icons text-primary">person</span>
              Öğrenci Bilgileri
            </h2>
          </div>
          <dl className="px-6 py-4">
            <InfoRow label="Ref No" value={b.refNo} />
            <InfoRow label="Öğrenci Adı Soyadı" value={b.studentName} />
            <InfoRow label="T.C. Kimlik No" value={b.tcKimlik} />
            <InfoRow label="Sınıf" value={b.grade ? `${b.grade}. Sınıf` : null} />
            <InfoRow label="Okuduğu Okul" value={b.currentSchool} />
          </dl>
        </div>

        {/* Baba Bilgileri */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-icons text-primary">person</span>
              Baba Bilgileri
            </h2>
          </div>
          <dl className="px-6 py-4">
            <InfoRow label="Ad Soyad" value={b.fatherName} />
            <InfoRow label="Meslek" value={b.fatherMeslek} />
            <InfoRow label="Cep Telefonu" value={b.fatherPhone} />
            <InfoRow label="İş Adresi" value={b.fatherWorkAddress} />
          </dl>
        </div>

        {/* Anne Bilgileri */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-icons text-primary">person</span>
              Anne Bilgileri
            </h2>
          </div>
          <dl className="px-6 py-4">
            <InfoRow label="Ad Soyad" value={b.motherName} />
            <InfoRow label="Meslek" value={b.motherMeslek} />
            <InfoRow label="Cep Telefonu" value={b.motherPhone} />
            <InfoRow label="İş Adresi" value={b.motherWorkAddress} />
          </dl>
        </div>

        {/* İletişim & Sınav Bilgileri */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-icons text-primary">contact_mail</span>
              İletişim & Sınav Bilgileri
            </h2>
          </div>
          <dl className="px-6 py-4">
            <InfoRow label="E-posta" value={b.email} />
            <InfoRow label="KVKK Onayı" value={b.kvkkOnay ? "Evet" : "Hayır"} />
            <InfoRow label="Sınav Tarihi" value={b.examDate} />
            <InfoRow label="Sınav Yeri" value={b.examPlace} />
            <InfoRow label="Sınav Saati" value={b.examTime} />
            <InfoRow
              label="Başvuru Tarihi"
              value={b.createdAt ? new Date(b.createdAt).toLocaleString("tr-TR") : null}
            />
          </dl>
        </div>
      </div>
    </div>
  );
}
