const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const counts = {
    professores: await prisma.professor.count(),
    cursos: await prisma.curso.count(),
    turmas: await prisma.turma.count(),
    alunos: await prisma.aluno.count(),
    matriculas: await prisma.matricula.count(),
    notas: await prisma.nota.count(),
  };

  console.log("Contagens das tabelas:");
  Object.entries(counts).forEach(([table, count]) => {
    console.log(`${table}: ${count}`);
  });
}

main()
  .catch((error) => {
    console.error("Erro ao conectar ao banco:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
