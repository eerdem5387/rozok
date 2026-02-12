import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    await prisma.school.update({
      where: { id },
      data: {
        name: body.name != null ? String(body.name) : undefined,
        slug: body.slug != null ? String(body.slug) : undefined,
        district: body.district != null ? String(body.district) : undefined,
        level: body.level != null ? String(body.level) : undefined,
        description: body.description !== undefined ? body.description : undefined,
        image: body.image !== undefined ? body.image : undefined,
        logo: body.logo !== undefined ? body.logo : undefined,
        websiteUrl: body.websiteUrl !== undefined ? body.websiteUrl : undefined,
        phone: body.phone !== undefined ? body.phone : undefined,
        address: body.address !== undefined ? body.address : undefined,
        email: body.email !== undefined ? body.email : undefined,
        about: body.about !== undefined ? body.about : undefined,
        facilities: body.facilities !== undefined ? body.facilities : undefined,
        published: body.published !== undefined ? !!body.published : undefined,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Güncellenemedi." }, { status: 500 });
  }
}
