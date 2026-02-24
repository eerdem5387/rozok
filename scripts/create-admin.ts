/**
 * Admin kullanıcısı oluşturur. Aynı e-posta varsa siler, yenisi oluşturur.
 * Çalıştırma: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/create-admin.ts
 * .env dosyasında DATABASE_URL tanımlı olmalı.
 */
const path = require("path");
const fs = require("fs");
try {
  const envPath = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    content.split("\n").forEach((line: string) => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
    });
  }
} catch (_) {}
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const nodeCrypto = require("crypto");

const EMAIL = "info@rozokbir.com";

function generateStrongPassword(length = 20) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%&*";
  const all = upper + lower + digits + symbols;
  let pwd = "";
  pwd += upper[nodeCrypto.randomInt(0, upper.length)];
  pwd += lower[nodeCrypto.randomInt(0, lower.length)];
  pwd += digits[nodeCrypto.randomInt(0, digits.length)];
  pwd += symbols[nodeCrypto.randomInt(0, symbols.length)];
  for (let i = 4; i < length; i++) {
    pwd += all[nodeCrypto.randomInt(0, all.length)];
  }
  return pwd
    .split("")
    .sort(() => nodeCrypto.randomInt(0, 2) - 1)
    .join("");
}

async function main() {
  const prisma = new PrismaClient();
  const deleted = await prisma.adminUser.deleteMany({
    where: { email: EMAIL },
  });
  if (deleted.count > 0) {
    console.log("Mevcut admin kullanıcısı silindi:", EMAIL);
  }
  const plainPassword = generateStrongPassword(20);
  const hashed = await bcrypt.hash(plainPassword, 10);
  await prisma.adminUser.create({
    data: {
      email: EMAIL,
      password: hashed,
      name: "Admin",
    },
  });
  console.log("\nAdmin kullanıcısı oluşturuldu.\n");
  console.log("E-posta:", EMAIL);
  console.log("Şifre:  ", plainPassword);
  console.log("\nBu şifreyi güvenli bir yere kaydedin. Bir daha gösterilmeyecektir.");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
