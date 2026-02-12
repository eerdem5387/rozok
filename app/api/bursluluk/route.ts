import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateRefNo() {
  const y = new Date().getFullYear();
  const r = Math.floor(1000 + Math.random() * 9000);
  return `#ROB-${y}-${r}`;
}

// Telefon: 5 ile başlayan 10 hane (5xxxxxxxxx)
const PHONE_REGEX = /^5[0-9]{9}$/;
function normalizePhone(v: string) {
  const digits = (v || "").replace(/\D/g, "");
  return digits.startsWith("0") ? digits.slice(1) : digits;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      studentName,
      tcKimlik,
      grade,
      currentSchool,
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

    const required = [
      ["studentName", studentName, "Öğrenci adı soyadı"],
      ["tcKimlik", tcKimlik, "T.C. Kimlik No"],
      ["grade", grade, "Sınıf"],
      ["currentSchool", currentSchool, "Okul"],
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
    for (const [key, val, label] of required) {
      if (val === undefined || val === null || String(val).trim() === "") {
        return NextResponse.json(
          { error: `${label} zorunludur.` },
          { status: 400 }
        );
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

    let refNo = generateRefNo();
    let exists = await prisma.burslulukBasvuru.findUnique({
      where: { refNo },
    });
    while (exists) {
      refNo = generateRefNo();
      exists = await prisma.burslulukBasvuru.findUnique({
        where: { refNo },
      });
    }

    await prisma.burslulukBasvuru.create({
      data: {
        refNo,
        studentName: String(studentName).trim(),
        tcKimlik: String(tcKimlik).trim(),
        grade: String(grade).trim(),
        currentSchool: String(currentSchool).trim(),
        fatherName: String(fatherName).trim(),
        fatherMeslek: String(fatherMeslek).trim(),
        fatherPhone: fatherPhoneNorm,
        fatherWorkAddress: String(fatherWorkAddress).trim(),
        motherName: String(motherName).trim(),
        motherMeslek: String(motherMeslek).trim(),
        motherPhone: motherPhoneNorm,
        motherWorkAddress: String(motherWorkAddress).trim(),
        email: String(email).trim(),
        kvkkOnay: !!kvkkOnay,
        examDate: "28 - 29 Mart 2026",
        examPlace: "Rize Merkez",
        examTime: "10:00",
      },
    });
    return NextResponse.json({ refNo });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Başvuru kaydedilemedi." },
      { status: 500 }
    );
  }
}
