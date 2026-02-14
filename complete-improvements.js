
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const version = "1.1.1";
  const date = new Date();
  
  const ids = ["cmlln6yb40001ju047p4iu5uk", "cmlln51100000ju04k8ulst0j"];
  
  for (const id of ids) {
    await prisma.improvement.update({
      where: { id },
      data: {
        status: 'completed',
        completedAt: date,
        completedVersion: version,
        title: {
          set: `[CONCLUÍDO ${date.toLocaleDateString('pt-BR')} v${version}] ~~` + (await prisma.improvement.findUnique({ where: { id } })).title + "~~"
        }
      },
    });
  }
  
  console.log("Melhorias marcadas como concluídas!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
