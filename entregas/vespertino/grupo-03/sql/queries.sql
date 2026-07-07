-- =====================================================
-- Projeto Integrador — Módulo 09: Banco de Dados e SQL
-- Consultas utilizadas na aplicação e demonstradas na apresentação
-- Base: escola_db
-- =====================================================

USE escola_db;

-- ---------------------------------------------------
-- 1. QUERY PRINCIPAL — usada pela API (/api/alunos)
-- Lista alunos matriculados com turma, turno e notas.
-- Suporta filtro por turma e busca parcial por nome.
-- ---------------------------------------------------
SELECT a.nome, a.email, t.nome_turma, t.turno,
       m.data_matricula, n.nota1, n.nota2, n.nota3, n.media
FROM alunos a
JOIN matriculas m ON m.id_aluno = a.id_aluno
JOIN turmas t     ON t.id_turma = m.id_turma
LEFT JOIN notas n ON n.id_matricula = m.id_matricula
WHERE a.nome LIKE '%ana%'          -- filtro de busca (parametrizado na API)
  -- AND t.id_turma = 1            -- filtro de turma (opcional, parametrizado na API)
ORDER BY a.nome;

-- Por que LEFT JOIN em notas: garante que o aluno apareça mesmo
-- sem nota lançada (INNER JOIN o faria desaparecer da lista).


-- ---------------------------------------------------
-- 2. QUERY AUXILIAR — usada pela API (/api/turmas)
-- Popula o filtro/select de turmas no front-end.
-- ---------------------------------------------------
SELECT id_turma, nome_turma, turno
FROM turmas
ORDER BY nome_turma;


-- ---------------------------------------------------
-- 3. MÉDIA POR TURMA (GROUP BY + agregação)
-- Demonstra domínio de agrupamento e funções agregadas.
-- ---------------------------------------------------
SELECT t.nome_turma,
       ROUND(AVG(n.media), 2) AS media_turma,
       COUNT(*) AS qtd_alunos
FROM notas n
JOIN matriculas m ON m.id_matricula = n.id_matricula
JOIN turmas t     ON t.id_turma = m.id_turma
GROUP BY t.nome_turma
ORDER BY media_turma DESC;


-- ---------------------------------------------------
-- 4. ALUNOS ACIMA DA MÉDIA GERAL (subconsulta)
-- Demonstra uso de subquery escalar no WHERE.
-- ---------------------------------------------------
SELECT a.nome, n.media
FROM notas n
JOIN matriculas m ON m.id_matricula = n.id_matricula
JOIN alunos a     ON a.id_aluno = m.id_aluno
WHERE n.media > (SELECT AVG(media) FROM notas)
ORDER BY n.media DESC;


-- ---------------------------------------------------
-- 5. OCUPAÇÃO DAS TURMAS (LEFT JOIN + GROUP BY)
-- Compara capacidade da turma com nº de matriculados.
-- ---------------------------------------------------
SELECT t.nome_turma, t.capacidade,
       COUNT(m.id_matricula) AS matriculados
FROM turmas t
LEFT JOIN matriculas m ON m.id_turma = t.id_turma
GROUP BY t.id_turma, t.nome_turma, t.capacidade
ORDER BY t.nome_turma;


-- ---------------------------------------------------
-- 6. TURMAS COM MÉDIA ABAIXO DE 6 (GROUP BY + HAVING)
-- Demonstra filtro pós-agregação com HAVING.
-- ---------------------------------------------------
SELECT t.nome_turma, ROUND(AVG(n.media), 2) AS media_turma
FROM notas n
JOIN matriculas m ON m.id_matricula = n.id_matricula
JOIN turmas t     ON t.id_turma = m.id_turma
GROUP BY t.nome_turma
HAVING AVG(n.media) < 6
ORDER BY media_turma ASC;


-- ---------------------------------------------------
-- 7. VALIDAÇÃO DE IMPORTAÇÃO (contagem de registros)
-- Usada para conferir se a base foi importada corretamente.
-- ---------------------------------------------------
SELECT
  (SELECT COUNT(*) FROM alunos)      AS total_alunos,
  (SELECT COUNT(*) FROM professores) AS total_professores,
  (SELECT COUNT(*) FROM cursos)      AS total_cursos,
  (SELECT COUNT(*) FROM turmas)      AS total_turmas,
  (SELECT COUNT(*) FROM matriculas)  AS total_matriculas,
  (SELECT COUNT(*) FROM notas)       AS total_notas;

  