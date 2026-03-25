import { prisma } from "../lib/prisma";

async function main() {
  const row = await prisma.burslulukBasvuru.findFirst({
    select: {
      refNo: true,
      examDay: true,
      examSession: true,
      examTime: true,
      examDate: true,
    },
  });

  console.log(row);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});

