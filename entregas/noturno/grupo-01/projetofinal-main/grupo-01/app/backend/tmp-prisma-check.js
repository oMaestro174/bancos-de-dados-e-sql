const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
  const counts = {
    professores: await prisma.professor.count(),
    cursos: await prisma.curso.count(),
    turmas: await prisma.turma.count(),
    alunos: await prisma.aluno.count(),
    matriculas: await prisma.matricula.count(),
    notas: await prisma.nota.count(),
  };

  console.log(JSON.stringify(counts, null, 2));

  const alunos = await prisma.aluno.findMany({
    take: 3,
    orderBy: { id_aluno: "asc" },
    select: { id_aluno: true, nome: true, email: true },
  });

  console.log("ALUNOS");
  console.log(JSON.stringify(alunos, null, 2));
})()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
