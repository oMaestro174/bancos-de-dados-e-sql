-- ============================================================================
-- consultas.sql
--
-- Consultas SQL utilizadas no Projeto Integrador.
--
-- Este arquivo reúne as principais consultas responsáveis por consultar
-- as informações dos alunos cadastrados no sistema acadêmico.
--
-- As consultas apresentadas permitem:
-- • Listar todos os alunos matriculados;
-- • Exibir turma, data da matrícula, notas e média final;
-- • Realizar pesquisas por nome do aluno ou nome da turma.
--
-- Banco de Dados: PostgreSQL (Supabase)
-- ============================================================================


-- ============================================================================
-- CONSULTA PRINCIPAL
--
-- Lista todos os alunos cadastrados juntamente com suas informações
-- de matrícula, turma, notas e média final.
--
-- Tabelas utilizadas:
-- • alunos
-- • matriculas
-- • turmas
-- • notas
--
-- LEFT JOIN na tabela "notas" foi utilizado para garantir que alunos
-- sem notas cadastradas também sejam exibidos na consulta.
-- ============================================================================

SELECT
    a.nome            AS aluno,
    a.email           AS email,
    t.nome_turma      AS turma,
    m.data_matricula  AS data_matricula,
    n.nota1,
    n.nota2,
    n.nota3,
    n.media           AS media_final
FROM alunos a
JOIN matriculas m
    ON m.id_aluno = a.id_aluno
JOIN turmas t
    ON t.id_turma = m.id_turma
LEFT JOIN notas n
    ON n.id_matricula = m.id_matricula
ORDER BY a.nome;


-- ============================================================================
-- CONSULTA COM FILTRO
--
-- Permite pesquisar alunos utilizando o nome do aluno ou o nome da turma.
--
-- O operador ILIKE realiza uma comparação sem diferenciar letras
-- maiúsculas e minúsculas.
--
-- Para testar a consulta, substitua o termo 'BD' pelo valor desejado.
--
-- Exemplos:
-- • '%BD%'
-- • '%ADS%'
-- • '%João%'
-- • '%Maria%'
-- ============================================================================

SELECT
    a.nome            AS aluno,
    a.email           AS email,
    t.nome_turma      AS turma,
    m.data_matricula  AS data_matricula,
    n.nota1,
    n.nota2,
    n.nota3,
    n.media           AS media_final
FROM alunos a
JOIN matriculas m
    ON m.id_aluno = a.id_aluno
JOIN turmas t
    ON t.id_turma = m.id_turma
LEFT JOIN notas n
    ON n.id_matricula = m.id_matricula
WHERE a.nome ILIKE '%BD%'
   OR t.nome_turma ILIKE '%BD%'
ORDER BY a.nome;