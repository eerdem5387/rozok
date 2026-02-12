import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { OkulForm } from "@/components/admin/OkulForm";

export default async function AdminOkulEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const okul = await prisma.school.findUnique({ where: { id } });
  if (!okul) redirect("/admin/okullar");

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        Okul Düzenle: {okul.name}
      </h1>
      <OkulForm okul={okul} />
    </div>
  );
}
