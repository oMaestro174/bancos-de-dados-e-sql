# COnsultas usadas no sistema
listar_alunos = """
    SELECT
        a.nome     AS nome,
        a.email    AS email,
        a.cidade   AS cidade,
        t.nome_turma AS turma,
        m.id_matricula AS matricula,
        DATE_FORMAT(m.data_matricula, '%%d/%%m/%%Y') AS data_matricula,
        n.nota1    AS nota1,
        n.nota2    AS nota2,
        n.nota3    AS nota3,
        n.media    AS media_final
    FROM matriculas m
    JOIN alunos a ON a.id_aluno = m.id_aluno
    JOIN turmas t ON t.id_turma = m.id_turma
    LEFT JOIN notas n ON n.id_matricula = m.id_matricula
    WHERE 1 = 1
"""

# Filtros
filtro_turma     = " AND t.nome_turma = %s"
filtro_nome      = " AND a.nome LIKE %s"
filtro_email     = " AND a.email LIKE %s"
filtro_matricula = " AND m.id_matricula = %s"

# Ordenações 
ordenar_alunos_nome  = " ORDER BY a.nome"
ordenar_alunos_media = " ORDER BY n.media DESC" # maiores medias primeiro
ordenar_alunos_data  = " ORDER BY m.data_matricula" # matriculas mais antigas primeiro
