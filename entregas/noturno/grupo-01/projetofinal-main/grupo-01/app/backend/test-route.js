const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const turma = "BD-01";
  const alunos = await prisma.aluno.findMany({
    where: {
      matriculas: {
        some: {
          turma: {
            nome_turma: {
              contains: turma,
            },
          },
        },
      },
    },
    select: {
      id_aluno: true,
      nome: true,
      email: true,
      matriculas: {
        select: {
          data_matricula: true,
          turma: {
            select: {
              nome_turma: true,
            },
          },
          notas: {
            select: {
              nota1: true,
              nota2: true,
              nota3: true,
              media: true,
            },
          },
        },
      },
    },
  });

  console.log(JSON.stringify(alunos, null, 2));
  await prisma.$disconnect();
}

main();
