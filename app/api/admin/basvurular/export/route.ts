import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function csvEscape(val: string | null | undefined): string {
  if (val == null) return "";
  const s = String(val);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const grade = searchParams.get("grade");
  const dateFrom = searchParams.get("dateFrom");
  const dateTo = searchParams.get("dateTo");
  const refNo = searchParams.get("refNo");
  const studentName = searchParams.get("studentName");

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

  const rows = await prisma.burslulukBasvuru.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "Ref No",
    "Öğrenci Adı",
    "T.C. Kimlik",
    "Sınıf",
    "Okul",
    "Baba Adı",
    "Baba Meslek",
    "Baba Telefon",
    "Baba İş Adresi",
    "Anne Adı",
    "Anne Meslek",
    "Anne Telefon",
    "Anne İş Adresi",
    "E-posta",
    "Başvuru Tarihi",
  ];
  const csvRows = [
    "\uFEFF" + headers.map(csvEscape).join(";"),
    ...rows.map((b) =>
      [
        b.refNo,
        b.studentName,
        b.tcKimlik ?? "",
        b.grade,
        b.currentSchool ?? "",
        b.fatherName ?? "",
        b.fatherMeslek ?? "",
        b.fatherPhone ?? "",
        b.fatherWorkAddress ?? "",
        b.motherName ?? "",
        b.motherMeslek ?? "",
        b.motherPhone ?? "",
        b.motherWorkAddress ?? "",
        b.email ?? "",
        new Date(b.createdAt).toLocaleString("tr-TR"),
      ].map(csvEscape).join(";")
    ),
  ];
  const csv = csvRows.join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bursluluk-basvurulari-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
