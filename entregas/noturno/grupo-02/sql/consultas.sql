USE escola_db;


-- 1) Listagem de ALUNOS MATRICULADOS (uma linha por matrícula)
SELECT
    m.id_matricula,
    a.nome,
    a.email,
    LPAD(m.id_matricula, 6, '0')              AS matricula,
    t.nome_turma                              AS turma,
    t.turno,
    t.periodo,
    c.nome                                    AS curso,
    p.nome                                    AS professor,
    DATE_FORMAT(m.data_matricula, '%d/%m/%Y') AS data_matricula,
    m.status,
    n.nota1, n.nota2, n.nota3,
    n.media                                   AS media_final
FROM matriculas m
INNER JOIN alunos a      ON a.id_aluno      = m.id_aluno
INNER JOIN turmas t      ON t.id_turma      = m.id_turma
INNER JOIN cursos c      ON c.id_curso      = t.id_curso
INNER JOIN professores p ON p.id_professor  = t.id_professor
LEFT  JOIN notas n       ON n.id_matricula  = m.id_matricula
ORDER BY a.nome;


-- 2) Buscar aluno por nome (LIKE) — funcionalidade obrigatória

SELECT a.nome, a.email, t.nome_turma AS turma, n.media
FROM matriculas m
INNER JOIN alunos a ON a.id_aluno = m.id_aluno
INNER JOIN turmas t ON t.id_turma = m.id_turma
LEFT  JOIN notas  n ON n.id_matricula = m.id_matricula
WHERE a.nome LIKE '%ana%'
ORDER BY a.nome;


-- 3) Filtrar por turma — funcionalidade obrigatória

SELECT a.nome, a.email, t.nome_turma AS turma, n.media
FROM matriculas m
INNER JOIN alunos a ON a.id_aluno = m.id_aluno
INNER JOIN turmas t ON t.id_turma = m.id_turma
LEFT  JOIN notas  n ON n.id_matricula = m.id_matricula
WHERE m.id_turma = 1
ORDER BY a.nome;


-- 4) Notas detalhadas de uma matrícula

SELECT n.nota1, n.nota2, n.nota3, n.media
FROM notas n
WHERE n.id_matricula = 1;


-- 5) Estatísticas do Dashboard

-- Totais gerais e média geral da escola
SELECT
    (SELECT COUNT(*) FROM matriculas) AS total_alunos,
    (SELECT COUNT(*) FROM turmas)     AS total_turmas,
    (SELECT COUNT(*) FROM cursos)     AS total_cursos,
    ROUND(AVG(n.media), 2)            AS media_geral
FROM notas n;

-- Média por turma (com curso e quantidade de alunos)
SELECT
    t.nome_turma          AS turma,
    c.nome                AS curso,
    t.turno,
    COUNT(m.id_matricula) AS total_alunos,
    ROUND(AVG(n.media), 2) AS media_turma
FROM turmas t
INNER JOIN cursos c     ON c.id_curso = t.id_curso
LEFT  JOIN matriculas m ON m.id_turma = t.id_turma
LEFT  JOIN notas n      ON n.id_matricula = m.id_matricula
GROUP BY t.id_turma, t.nome_turma, c.nome, t.turno
ORDER BY media_turma DESC;


-- 6) Ranking dos melhores alunos (HAVING)

SELECT a.nome, t.nome_turma AS turma, n.media
FROM matriculas m
INNER JOIN alunos a ON a.id_aluno = m.id_aluno
INNER JOIN turmas t ON t.id_turma = m.id_turma
INNER JOIN notas  n ON n.id_matricula = m.id_matricula
WHERE n.media >= 8.0
ORDER BY n.media DESC;
