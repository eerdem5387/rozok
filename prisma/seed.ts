import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("rozok.admin", 10);
  await prisma.adminUser.upsert({
    where: { email: "info@rozokbir.com" },
    update: { password: hashed },
    create: {
      email: "info@rozokbir.com",
      password: hashed,
      name: "Admin",
    },
  });
  console.log("Seed: Admin user created (info@rozokbir.com / rozok.admin)");

  await prisma.school.upsert({
    where: { slug: "rize-bilim-koleji" },
    update: {},
    create: {
      name: "Rize Bilim Koleji",
      slug: "rize-bilim-koleji",
      district: "Rize Merkez",
      level: "Lise",
      description: "Fen ve teknoloji odaklı eğitim anlayışıyla geleceğin bilim insanlarını yetiştiren öncü eğitim kurumu.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB80an7IVevDcnHBRKeSdHCKQnP8g3zSl1irPCOQi6dCioBcl8GZf_JXQsMHLKSv0G1vHjKbBtZoKDkN60TMXmM4gBYvOK17r2qe6T-dbh6Q8Um7BZ1-UBcOsuf-06DE1QEWexhKdhGxw45il0mqSVO_GVlTtNd9HT0FvFLu0FzKF-SzSfT0h-0D244IegYDblqJU-k9eJLmHOeOxFkYZ6sXFnHTHeAedDopNifvFqNh1LZzf0glSTpUnZHNAZOp9TOTiNGMJxKQp8",
      published: true,
    },
  });
  console.log("Seed: Örnek okul eklendi.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
