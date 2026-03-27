import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SCHOOL_NAME = "RİZE - GÜNEYSU - ÖZEL BİLGE İLKOKULU";
const PHONE_REGEX = /^5[0-9]{9}$/;

function normalizePhone(v: string) {
  const digits = (v || "").replace(/\D/g, "");
  return digits.startsWith("0") ? digits.slice(1) : digits;
}

function generateRefNo() {
  const y = new Date().getFullYear();
  const r = Math.floor(1000 + Math.random() * 9000);
  return `#BLG-${y}-${r}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      studentName,
      tcKimlik,
      grade,
      fatherName,
      fatherMeslek,
      fatherPhone,
      fatherWorkAddress,
      motherName,
      motherMeslek,
      motherPhone,
      motherWorkAddress,
      email,
      kvkkOnay,
    } = body;

    /** Bu formda sınav günü/seansı istemciden alınmaz; her zaman sabittir. */
    const examDayNorm = "Cumartesi";
    const examSessionNorm = "10:00";

    const required = [
      ["studentName", studentName, "Öğrenci adı soyadı"],
      ["tcKimlik", tcKimlik, "T.C. Kimlik No"],
      ["grade", grade, "Sınıf"],
      ["fatherName", fatherName, "Baba adı soyadı"],
      ["fatherMeslek", fatherMeslek, "Baba mesleği"],
      ["fatherPhone", fatherPhone, "Baba cep telefonu"],
      ["fatherWorkAddress", fatherWorkAddress, "Baba iş adresi"],
      ["motherName", motherName, "Anne adı soyadı"],
      ["motherMeslek", motherMeslek, "Anne mesleği"],
      ["motherPhone", motherPhone, "Anne cep telefonu"],
      ["motherWorkAddress", motherWorkAddress, "Anne iş adresi"],
      ["email", email, "E-posta"],
    ] as const;

    for (const [, val, label] of required) {
      if (val === undefined || val === null || String(val).trim() === "") {
        return NextResponse.json({ error: `${label} zorunludur.` }, { status: 400 });
      }
    }

    if (!kvkkOnay) {
      return NextResponse.json(
        { error: "KVKK aydınlatma metnini kabul etmeniz gerekmektedir." },
        { status: 400 }
      );
    }

    const fatherPhoneNorm = normalizePhone(String(fatherPhone));
    const motherPhoneNorm = normalizePhone(String(motherPhone));
    if (!PHONE_REGEX.test(fatherPhoneNorm)) {
      return NextResponse.json(
        { error: "Baba cep telefonu 5 ile başlayan 10 hane olmalıdır (örn: 5333333333)." },
        { status: 400 }
      );
    }
    if (!PHONE_REGEX.test(motherPhoneNorm)) {
      return NextResponse.json(
        { error: "Anne cep telefonu 5 ile başlayan 10 hane olmalıdır (örn: 5333333333)." },
        { status: 400 }
      );
    }

    const examDateLabel = "28 Mart 2026 (Cumartesi)";

    let refNo = generateRefNo();
    let exists = await prisma.bilgeIlkokuluBasvuru.findUnique({ where: { refNo } });
    while (exists) {
      refNo = generateRefNo();
      exists = await prisma.bilgeIlkokuluBasvuru.findUnique({ where: { refNo } });
    }

    await prisma.bilgeIlkokuluBasvuru.create({
      data: {
        refNo,
        studentName: String(studentName).trim(),
        tcKimlik: String(tcKimlik).trim(),
        grade: String(grade).trim(),
        currentSchool: SCHOOL_NAME,
        fatherName: String(fatherName).trim(),
        fatherMeslek: String(fatherMeslek).trim(),
        fatherPhone: fatherPhoneNorm,
        fatherWorkAddress: String(fatherWorkAddress).trim(),
        motherName: String(motherName).trim(),
        motherMeslek: String(motherMeslek).trim(),
        motherPhone: motherPhoneNorm,
        motherWorkAddress: String(motherWorkAddress).trim(),
        email: String(email).trim(),
        kvkkOnay: true,
        examDay: examDayNorm,
        examSession: examSessionNorm,
        examDate: examDateLabel,
        examPlace: "Rize Merkez",
        examTime: examSessionNorm,
      },
    });

    return NextResponse.json({ refNo });
  } catch (e) {
    console.error("[api/bilge-ortaokulu-basvuru] POST error:", e);
    return NextResponse.json(
      { error: "Başvuru kaydedilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}

