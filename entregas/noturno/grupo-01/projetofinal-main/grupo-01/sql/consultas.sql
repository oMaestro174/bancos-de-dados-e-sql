-- =========================================================================
-- SCRIPT DE CONSULTAS RELATÓRIOS: escola_db
-- ARQUIVO: sql/consultas.sql
-- =========================================================================

-- 1. Listar alunos com turma, notas e média (usando JOIN)
-- Exibe a relação completa do desempenho dos alunos e suas respectivas turmas.
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
JOIN notas n ON m.id_matricula = n.id_matricula;


-- 2. Filtrar alunos por turma
-- Retorna a lista de chamada de uma turma específica (Exemplo: 'BD-01').
SELECT 
    t.nome_turma,
    a.id_aluno,
    a.nome AS nome_aluno,
    m.status
FROM alunos a
JOIN matriculas m ON a.id_aluno = m.id_aluno
JOIN turmas t ON m.id_turma = t.id_turma
WHERE t.nome_turma = 'BD-01';


-- 3. Buscar aluno por nome
-- Utiliza o operador LIKE para permitir buscas por partes do nome (Exemplo: 'Adriana').
SELECT 
    id_aluno,
    nome,
    email,
    cidade
FROM alunos
WHERE nome LIKE '%Adriana%';


-- 4. Consulta com GROUP BY (Média de notas por turma)
-- Agrupa os dados por turma e calcula a média geral de todos os alunos pertencentes a ela.
SELECT 
    t.nome_turma,
    c.nome AS nome_curso,
    ROUND(AVG(n.media), 2) AS media_geral_da_turma,
    COUNT(m.id_matricula) AS total_alunos
FROM turmas t
JOIN cursos c ON t.id_curso = c.id_curso
JOIN matriculas m ON t.id_turma = m.id_turma
JOIN notas n ON m.id_matricula = n.id_matricula
GROUP BY t.id_turma, t.nome_turma, c.nome;


-- 5. Consulta com Subconsulta (Subquery)
-- Seleciona todos os alunos que possuem a média final MAIOR do que a média geral de toda a escola.
SELECT 
    a.nome AS nome_aluno,
    n.media AS media_aluno
FROM alunos a
JOIN matriculas m ON a.id_aluno = m.id_aluno
JOIN notas n ON m.id_matricula = n.id_matricula
WHERE n.media > (SELECT AVG(media) FROM notas)
ORDER BY n.media DESC;

-- Opcional 1: Busca por número de Matrícula
-- Retorna os dados do aluno, a turma e o status atual filtrando pelo ID da matrícula.
SELECT 
    m.id_matricula,
    a.nome AS nome_aluno,
    t.nome_turma,
    c.nome AS nome_curso,
    m.data_matricula,
    m.status
FROM matriculas m
JOIN alunos a ON m.id_aluno = a.id_aluno
JOIN turmas t ON m.id_turma = t.id_turma
JOIN cursos c ON t.id_curso = c.id_curso
WHERE m.id_matricula = 11; -- Substitua pelo ID da matrícula que deseja buscar


-- Opcional 2: Busca por E-mail do Aluno
-- Localiza o histórico completo de notas de um aluno utilizando o e-mail cadastrado.
SELECT 
    a.nome AS nome_aluno,
    a.email,
    t.nome_turma,
    n.nota1,
    n.nota2,
    n.nota3,
    n.media,
    m.status
FROM alunos a
JOIN matriculas m ON a.id_aluno = m.id_aluno
JOIN turmas t ON m.id_turma = t.id_turma
JOIN notas n ON m.id_matricula = n.id_matricula
WHERE a.email = 'alan.ribeiro2@email.com';
