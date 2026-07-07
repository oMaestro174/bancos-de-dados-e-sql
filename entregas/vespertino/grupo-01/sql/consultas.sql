-- ============================================================================
--  consultas.sql  ->  Consultas SQL PRINCIPAIS usadas pela aplicacao.
--
--  Documenta, de forma limpa, as consultas que o back-end (app/queries.py)
--  executa. Serve para a apresentacao da parte de Banco de Dados.
--
--  Base: escola_db. Rode no MySQL Workbench com o banco selecionado.
--
--  OBS: aqui a data usa DATE_FORMAT(..., '%d/%m/%Y') com UM sinal de %.
--  No arquivo Python (queries.py) ele aparece dobrado ('%%d/%%m/%%Y') so por
--  causa da biblioteca PyMySQL. O resultado no banco e o mesmo: 07/01/2026.
-- ============================================================================

USE escola_db;


-- ----------------------------------------------------------------------------
-- CONSULTA PRINCIPAL: listar TODOS os alunos com todos os dados exibidos.
-- Mostra: nome, e-mail, cidade, turma, data da matricula, as 3 notas e a media.
-- Junta 4 tabelas: matriculas + alunos + turmas + notas.
-- LEFT JOIN em notas: o aluno aparece mesmo que ainda nao tenha nota lancada.
-- ----------------------------------------------------------------------------
SELECT  a.nome     AS nome,
        a.email    AS email,
        a.cidade   AS cidade,
        t.nome_turma AS turma,
        m.id_matricula AS matricula,
        DATE_FORMAT(m.data_matricula, '%d/%m/%Y') AS data_matricula,
        n.nota1    AS nota1,
        n.nota2    AS nota2,
        n.nota3    AS nota3,
        n.media    AS media_final
FROM       matriculas m
JOIN       alunos  a ON a.id_aluno     = m.id_aluno
JOIN       turmas  t ON t.id_turma     = m.id_turma
LEFT JOIN  notas   n ON n.id_matricula = m.id_matricula
ORDER BY   a.nome;


-- ----------------------------------------------------------------------------
-- FILTRO por TURMA (requisito obrigatorio).
-- O filtro compara pelo NOME da turma, porque e isso que o <select> da pagina
-- envia (ex.: 'BD-01'). No app, esse valor entra de forma segura via %s.
-- ----------------------------------------------------------------------------
SELECT  a.nome AS nome, a.email AS email, a.cidade AS cidade,
        t.nome_turma AS turma, n.media AS media_final
FROM       matriculas m
JOIN       alunos  a ON a.id_aluno     = m.id_aluno
JOIN       turmas  t ON t.id_turma     = m.id_turma
LEFT JOIN  notas   n ON n.id_matricula = m.id_matricula
WHERE      t.nome_turma = 'BD-01'
ORDER BY   a.nome;


-- ----------------------------------------------------------------------------
-- BUSCA por NOME (requisito obrigatorio).
-- LIKE '%ana%' encontra qualquer nome que CONTENHA "ana" (Ana, Adriana...).
-- ----------------------------------------------------------------------------
SELECT  a.nome AS nome, a.email AS email, a.cidade AS cidade,
        t.nome_turma AS turma, n.media AS media_final
FROM       matriculas m
JOIN       alunos  a ON a.id_aluno     = m.id_aluno
JOIN       turmas  t ON t.id_turma     = m.id_turma
LEFT JOIN  notas   n ON n.id_matricula = m.id_matricula
WHERE      a.nome LIKE '%ana%'
ORDER BY   a.nome;


-- ----------------------------------------------------------------------------
-- BUSCA por E-MAIL (opcional).
-- ----------------------------------------------------------------------------
SELECT  a.nome AS nome, a.email AS email, t.nome_turma AS turma
FROM       matriculas m
JOIN       alunos a ON a.id_aluno = m.id_aluno
JOIN       turmas t ON t.id_turma = m.id_turma
WHERE      a.email LIKE '%gmail%'
ORDER BY   a.nome;


-- ----------------------------------------------------------------------------
-- BUSCA por MATRICULA (opcional).
-- ----------------------------------------------------------------------------
SELECT  a.nome AS nome, a.email AS email, t.nome_turma AS turma,
        m.id_matricula AS matricula, n.media AS media_final
FROM       matriculas m
JOIN       alunos  a ON a.id_aluno     = m.id_aluno
JOIN       turmas  t ON t.id_turma     = m.id_turma
LEFT JOIN  notas   n ON n.id_matricula = m.id_matricula
WHERE      m.id_matricula = 5;


-- ----------------------------------------------------------------------------
-- ORDENACAO por MEDIA (as maiores medias primeiro).
-- E a opcao "Média" do seletor de ordenacao da pagina.
-- ----------------------------------------------------------------------------
SELECT  a.nome AS nome, t.nome_turma AS turma, n.media AS media_final
FROM       matriculas m
JOIN       alunos  a ON a.id_aluno     = m.id_aluno
JOIN       turmas  t ON t.id_turma     = m.id_turma
LEFT JOIN  notas   n ON n.id_matricula = m.id_matricula
ORDER BY   n.media DESC;


-- ----------------------------------------------------------------------------
-- ORDENACAO por DATA DA MATRICULA (as mais antigas primeiro).
-- E a opcao "Data da matricula" do seletor de ordenacao da pagina.
-- Ordena pela coluna de data real (m.data_matricula), nao pelo texto formatado,
-- para a ordem cronologica sair correta.
-- ----------------------------------------------------------------------------
SELECT  a.nome AS nome, t.nome_turma AS turma,
        m.id_matricula AS matricula,
        DATE_FORMAT(m.data_matricula, '%d/%m/%Y') AS data_matricula
FROM       matriculas m
JOIN       alunos  a ON a.id_aluno     = m.id_aluno
JOIN       turmas  t ON t.id_turma     = m.id_turma
ORDER BY   m.data_matricula;
