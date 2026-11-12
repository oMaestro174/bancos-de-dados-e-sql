const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Executando Teste SQL: Alunos com turma, notas e média (Consulta 1)");
  
  const resultados = await prisma.$queryRaw`
    SELECT 
        a.nome AS nome_aluno,
        t.nome_turma,
        n.nota1,
        n.nota2,
        n.nota3,
        n.media
    FROM alunos a
    JOIN matriculas m ON a.id_aluno = m.id_aluno
    JOIN turmas t ON m.id_turma = t.id_turma
    JOIN notas n ON m.id_matricula = n.id_matricula
    LIMIT 5;
  `;
  
  console.table(resultados);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
