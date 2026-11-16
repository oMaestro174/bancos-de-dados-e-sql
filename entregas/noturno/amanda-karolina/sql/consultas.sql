USE escola_db;

-- 1. Criação da View solicitada para listar o boletim dos alunos
CREATE OR REPLACE VIEW vw_boletim_escolar AS
SELECT 
    a.id_aluno,
    a.nome AS aluno_nome,
    a.email AS aluno_email,
    t.id_turma,
    t.nome_turma,
    c.nome AS curso_nome,
    m.data_matricula,
    n.nota1,
    n.nota2,
    n.nota3,
    n.media
FROM alunos a
JOIN matriculas m ON a.id_aluno = m.id_aluno
JOIN turmas t ON m.id_turma = t.id_turma
JOIN cursos c ON t.id_curso = c.id_curso
JOIN notas n ON m.id_matricula = n.id_matricula;

-- 2. Consulta para popular o filtro de turmas no front-end
SELECT id_turma, nome_turma, turno FROM turmas;