const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.aluno.findMany({
      where: {
        matriculas: {
          some: {
            turma: {
              nome_turma: {
                contains: "BD-01",
              },
            },
          },
        },
      },
      select: {
        id_aluno: true,
        nome: true,
      },
    });

    console.log(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
