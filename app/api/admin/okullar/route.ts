import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const slug =
      body.slug ||
      String(body.name)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-ğüşıöç]/g, "");
    await prisma.school.create({
      data: {
        name: String(body.name),
        slug,
        district: String(body.district),
        level: String(body.level),
        description: body.description || null,
        image: body.image || null,
        logo: body.logo || null,
        websiteUrl: body.websiteUrl || null,
        phone: body.phone || null,
        address: body.address || null,
        email: body.email || null,
        about: body.about || null,
        facilities: body.facilities || null,
        published: !!body.published,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Okul eklenemedi." }, { status: 500 });
  }
}
