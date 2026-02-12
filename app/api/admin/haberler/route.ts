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
      String(body.title)
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-ğüşıöç]/g, "");
    await prisma.news.create({
      data: {
        title: String(body.title),
        slug,
        excerpt: body.excerpt || null,
        content: body.content || "",
        category: String(body.category || "Duyurular"),
        image: body.image || null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        published: !!body.published,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Haber eklenemedi." }, { status: 500 });
  }
}
