import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Ad, e-posta ve mesaj zorunludur." },
        { status: 400 }
      );
    }
    await prisma.contactMessage.create({
      data: {
        name: String(name),
        email: String(email),
        phone: phone ? String(phone) : null,
        subject: subject ? String(subject) : null,
        message: String(message),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi." },
      { status: 500 }
    );
  }
}
