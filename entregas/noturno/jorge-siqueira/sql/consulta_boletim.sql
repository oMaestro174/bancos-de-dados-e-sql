-- View para facilitar a consulta dos alunos, turmas e média final na aplicação web
CREATE OR REPLACE VIEW vw_boletim_escolar AS
SELECT 
    a.matricula,
    a.nome AS aluno_nome,
    a.email,
    t.nome AS turma_nome,
    a.data_matricula,
    d.nome AS disciplina_nome,
    n.nota_1,
    n.nota_2,
    ROUND((n.nota_1 + n.nota_2) / 2, 2) AS media_final
FROM alunos a
INNER JOIN turmas t ON a.turma_id = t.id
LEFT JOIN notas n ON a.id = n.aluno_id
LEFT JOIN disciplinas d ON n.disciplina_id = d.id;

-- Testando a view criada:
SELECT * FROM vw_boletim_escolar;