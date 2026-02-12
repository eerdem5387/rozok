import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    await prisma.boardMember.create({
      data: {
        name: String(body.name),
        title: String(body.title || ""),
        role: String(body.role || ""),
        image: body.image || null,
        email: body.email || null,
        link: body.link || null,
        isChairman: !!body.isChairman,
        order: Number(body.order) || 0,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Üye eklenemedi." }, { status: 500 });
  }
}
