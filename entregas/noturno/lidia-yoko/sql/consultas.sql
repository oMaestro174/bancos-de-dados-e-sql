
-- Projeto: Consulta de Alunos Matriculados
-- Banco de dados: escola_db

USE escola_db;

-- 1. Consultar todos os alunos matriculados
SELECT
    a.nome,
    a.email,
    t.nome_turma,
    m.data_matricula,
    n.nota1,
    n.nota2,
    n.nota3,
    n.media
FROM alunos a
         INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
         INNER JOIN turmas t ON m.id_turma = t.id_turma
         LEFT JOIN notas n ON m.id_matricula = n.id_matricula
ORDER BY a.nome;

-- 2. Consultar alunos pelo nome
SELECT
    a.nome,
    a.email,
    t.nome_turma,
    n.media
FROM alunos a
         INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
         INNER JOIN turmas t ON m.id_turma = t.id_turma
         LEFT JOIN notas n ON m.id_matricula = n.id_matricula
WHERE a.nome LIKE '%Maria%'
ORDER BY a.nome;

-- 3. Consultar alunos por turma
SELECT
    a.nome,
    a.email,
    t.nome_turma,
    n.media
FROM alunos a
         INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
         INNER JOIN turmas t ON m.id_turma = t.id_turma
         LEFT JOIN notas n ON m.id_matricula = n.id_matricula
WHERE t.id_turma = 1
ORDER BY a.nome;

-- 4. Consultar a média final dos alunos
SELECT
    a.nome,
    t.nome_turma,
    n.media
FROM alunos a
         INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
         INNER JOIN turmas t ON m.id_turma = t.id_turma
         LEFT JOIN notas n ON m.id_matricula = n.id_matricula
ORDER BY a.nome;
