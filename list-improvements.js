
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const improvements = await prisma.improvement.findMany({
    where: { status: 'pending', deletedAt: null },
    orderBy: { createdAt: 'desc' },
  });
  console.log(JSON.stringify(improvements, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
