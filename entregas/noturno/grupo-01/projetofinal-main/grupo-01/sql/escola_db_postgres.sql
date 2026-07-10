-- Script PostgreSQL/Supabase para escola_db
-- Adaptado do modelo acadêmico esperado para o projeto

CREATE TABLE IF NOT EXISTS professores (
    id_professor SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    area VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id_curso SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INT NOT NULL,
    area VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS turmas (
    id_turma SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    id_professor INT NOT NULL,
    nome_turma VARCHAR(100) NOT NULL,
    turno VARCHAR(50) NOT NULL,
    periodo VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL,
    CONSTRAINT fk_turmas_curso FOREIGN KEY (id_curso) REFERENCES cursos(id_curso),
    CONSTRAINT fk_turmas_professor FOREIGN KEY (id_professor) REFERENCES professores(id_professor)
);

CREATE TABLE IF NOT EXISTS alunos (
    id_aluno SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    data_nascimento DATE,
    cidade VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS matriculas (
    id_matricula SERIAL PRIMARY KEY,
    id_aluno INT NOT NULL,
    id_turma INT NOT NULL,
    data_matricula DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT fk_matriculas_aluno FOREIGN KEY (id_aluno) REFERENCES alunos(id_aluno),
    CONSTRAINT fk_matriculas_turma FOREIGN KEY (id_turma) REFERENCES turmas(id_turma)
);

CREATE TABLE IF NOT EXISTS notas (
    id_nota SERIAL PRIMARY KEY,
    id_matricula INT NOT NULL,
    nota1 DECIMAL(4,2) NOT NULL,
    nota2 DECIMAL(4,2) NOT NULL,
    nota3 DECIMAL(4,2) NOT NULL,
    media DECIMAL(4,2) NOT NULL,
    CONSTRAINT fk_notas_matricula FOREIGN KEY (id_matricula) REFERENCES matriculas(id_matricula)
);

TRUNCATE TABLE notas, matriculas, alunos, turmas, cursos, professores RESTART IDENTITY CASCADE;

INSERT INTO professores (id_professor, nome, email, area) VALUES
(1, 'Marina Costa', 'marina.costa@escola.com', 'Banco de Dados'),
(2, 'Rafael Souza', 'rafael.souza@escola.com', 'Programação'),
(3, 'Patrícia Lima', 'patricia.lima@escola.com', 'Segurança'),
(4, 'Eduardo Nunes', 'eduardo.nunes@escola.com', 'Infraestrutura'),
(5, 'Clara Mendes', 'clara.mendes@escola.com', 'Design'),
(6, 'Tiago Rocha', 'tiago.rocha@escola.com', 'Gestão');

INSERT INTO cursos (id_curso, nome, carga_horaria, area) VALUES
(1, 'Análise e Desenvolvimento de Sistemas', 360, 'Tecnologia'),
(2, 'Ciência de Dados', 320, 'Tecnologia'),
(3, 'Segurança da Informação', 300, 'Tecnologia'),
(4, 'Redes de Computadores', 280, 'Tecnologia'),
(5, 'Design Digital', 260, 'Design'),
(6, 'Gestão de TI', 240, 'Gestão');

INSERT INTO turmas (id_turma, id_curso, id_professor, nome_turma, turno, periodo, capacidade) VALUES
(1, 1, 1, 'BD-01', 'Manhã', '2026.1', 30),
(2, 1, 2, 'BD-02', 'Tarde', '2026.1', 30),
(3, 2, 2, 'CD-01', 'Manhã', '2026.1', 25),
(4, 3, 3, 'SI-01', 'Noite', '2026.1', 25),
(5, 4, 4, 'RED-01', 'Manhã', '2026.1', 20),
(6, 4, 4, 'RED-02', 'Tarde', '2026.1', 20),
(7, 5, 5, 'DS-01', 'Noite', '2026.1', 20),
(8, 5, 5, 'DS-02', 'Manhã', '2026.1', 20),
(9, 6, 6, 'GT-01', 'Tarde', '2026.1', 20),
(10, 6, 6, 'GT-02', 'Noite', '2026.1', 20);

WITH base_alunos AS (
    SELECT 1 AS id, 'Adriana Nogueira' AS nome, 'adriana.nogueira@escola.com' AS email, '2000-03-12'::date AS data_nascimento, 'Boa Vista' AS cidade
    UNION ALL SELECT 2, 'Alan Ribeiro', 'alan.ribeiro@escola.com', '1999-07-22'::date, 'Macapá'
    UNION ALL SELECT 3, 'Aline Batista', 'aline.batista@escola.com', '2001-01-15'::date, 'Manaus'
)
INSERT INTO alunos (id_aluno, nome, email, data_nascimento, cidade)
SELECT gs.id,
       CASE
           WHEN gs.id <= 3 THEN ba.nome
           ELSE CONCAT('Aluno ', LPAD(gs.id::text, 2, '0'))
       END AS nome,
       CASE
           WHEN gs.id <= 3 THEN ba.email
           ELSE CONCAT('aluno', gs.id, '@escola.com')
       END AS email,
       CASE
           WHEN gs.id <= 3 THEN ba.data_nascimento
           ELSE (DATE '2000-01-01' + (gs.id - 4) * INTERVAL '30 days')
       END AS data_nascimento,
       CASE
           WHEN gs.id <= 3 THEN ba.cidade
           ELSE 'Boa Vista'
       END AS cidade
FROM generate_series(1, 70) AS gs(id)
LEFT JOIN base_alunos ba ON ba.id = gs.id;

INSERT INTO matriculas (id_matricula, id_aluno, id_turma, data_matricula, status)
SELECT gs.id,
       gs.id,
       ((gs.id - 1) % 10) + 1,
       DATE '2026-01-15' + (gs.id - 1) * INTERVAL '1 day',
       'Ativa'
FROM generate_series(1, 70) AS gs(id);

INSERT INTO notas (id_nota, id_matricula, nota1, nota2, nota3, media)
SELECT gs.id,
       gs.id,
       ROUND(CAST((random() * 2 + 7) AS numeric), 2),
       ROUND(CAST((random() * 2 + 7) AS numeric), 2),
       ROUND(CAST((random() * 2 + 7) AS numeric), 2),
       ROUND(CAST(((random() * 2 + 7) + (random() * 2 + 7) + (random() * 2 + 7)) / 3 AS numeric), 2)
FROM generate_series(1, 70) AS gs(id);
