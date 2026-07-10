# Gabarito — Consultas SQL Avançadas

## Parte 1 — WHERE e ORDER BY

1.
```sql
SELECT *
FROM alunos
ORDER BY nome ASC;
```

2.
```sql
SELECT *
FROM alunos
WHERE cidade = 'Boa Vista'
ORDER BY nome ASC;
```

3.
```sql
SELECT *
FROM turmas
WHERE periodo = '2026.1'
ORDER BY turno ASC;
```

4.
```sql
SELECT *
FROM cursos
WHERE area = 'Desenvolvimento Web'
ORDER BY nome ASC;
```

5.
```sql
SELECT *
FROM professores
WHERE area = 'Banco de Dados';
```

## Parte 2 — GROUP BY e funções agregadas

6.
```sql
SELECT id_turma, COUNT(*) AS total_alunos
FROM matriculas
GROUP BY id_turma;
```

7.
```sql
SELECT t.id_curso, COUNT(*) AS total_matriculas
FROM matriculas m
JOIN turmas t ON m.id_turma = t.id_turma
GROUP BY t.id_curso;
```

8.
```sql
SELECT t.id_turma, AVG(n.media) AS media_turma
FROM notas n
JOIN matriculas m ON n.id_matricula = m.id_matricula
JOIN turmas t ON m.id_turma = t.id_turma
GROUP BY t.id_turma;
```

9.
```sql
SELECT t.id_turma, SUM(n.media) AS soma_notas
FROM notas n
JOIN matriculas m ON n.id_matricula = m.id_matricula
JOIN turmas t ON m.id_turma = t.id_turma
GROUP BY t.id_turma;
```

10.
```sql
SELECT t.id_turma,
       MAX(n.media) AS maior_nota,
       MIN(n.media) AS menor_nota
FROM notas n
JOIN matriculas m ON n.id_matricula = m.id_matricula
JOIN turmas t ON m.id_turma = t.id_turma
GROUP BY t.id_turma;
```

11.
```sql
SELECT cidade, COUNT(*) AS total_alunos
FROM alunos
GROUP BY cidade;
```

12.
```sql
SELECT m.id_aluno, AVG(n.media) AS media_aluno
FROM notas n
JOIN matriculas m ON n.id_matricula = m.id_matricula
GROUP BY m.id_aluno;
```

## Parte 3 — HAVING

13.
```sql
SELECT t.id_turma, AVG(n.media) AS media_turma
FROM notas n
JOIN matriculas m ON n.id_matricula = m.id_matricula
JOIN turmas t ON m.id_turma = t.id_turma
GROUP BY t.id_turma
HAVING AVG(n.media) >= 7;
```

14.
```sql
SELECT c.id_curso, COUNT(*) AS total_matriculas
FROM matriculas m
JOIN turmas t ON m.id_turma = t.id_turma
JOIN cursos c ON t.id_curso = c.id_curso
GROUP BY c.id_curso
HAVING COUNT(*) > 5;
```

15.
```sql
SELECT a.id_aluno, AVG(n.media) AS media_geral
FROM alunos a
JOIN matriculas m ON a.id_aluno = m.id_aluno
JOIN notas n ON m.id_matricula = n.id_matricula
GROUP BY a.id_aluno
HAVING AVG(n.media) >= 8;
```

16.
```sql
SELECT id_turma, COUNT(*) AS total_matriculas
FROM matriculas
GROUP BY id_turma
HAVING COUNT(*) >= 4;
```

17.
```sql
SELECT cidade, COUNT(*) AS total_alunos
FROM alunos
GROUP BY cidade
HAVING COUNT(*) > 10;
```

## Parte 4 — JOINs

18.
```sql
SELECT a.nome AS aluno, t.nome_turma, c.nome AS curso
FROM matriculas m
JOIN alunos a ON m.id_aluno = a.id_aluno
JOIN turmas t ON m.id_turma = t.id_turma
JOIN cursos c ON t.id_curso = c.id_curso;
```

19.
```sql
SELECT p.nome AS professor, c.nome AS curso
FROM turmas t
JOIN professores p ON t.id_professor = p.id_professor
JOIN cursos c ON t.id_curso = c.id_curso;
```

20.
```sql
SELECT a.nome AS aluno, t.nome_turma, t.turno
FROM matriculas m
JOIN alunos a ON m.id_aluno = a.id_aluno
JOIN turmas t ON m.id_turma = t.id_turma;
```

21.
```sql
SELECT c.nome AS curso, p.nome AS professor
FROM turmas t
JOIN cursos c ON t.id_curso = c.id_curso
JOIN professores p ON t.id_professor = p.id_professor;
```

22.
```sql
SELECT a.nome AS aluno, m.status
FROM matriculas m
JOIN alunos a ON m.id_aluno = a.id_aluno;
```

23.
```sql
SELECT t.nome_turma, c.nome AS curso, p.nome AS professor
FROM turmas t
JOIN cursos c ON t.id_curso = c.id_curso
JOIN professores p ON t.id_professor = p.id_professor;
```

## Parte 5 — Subconsultas

24.
```sql
SELECT a.nome
FROM alunos a
WHERE a.id_aluno IN (
    SELECT m.id_aluno
    FROM matriculas m
    JOIN notas n ON m.id_matricula = n.id_matricula
    GROUP BY m.id_aluno
    HAVING AVG(n.media) >= (
        SELECT AVG(n2.media)
        FROM notas n2
        JOIN matriculas m2 ON n2.id_matricula = m2.id_matricula
        WHERE m2.id_turma = m.id_turma
    )
);
```

25.
```sql
SELECT DISTINCT a.nome
FROM alunos a
JOIN matriculas m ON a.id_aluno = m.id_aluno
JOIN notas n ON m.id_matricula = n.id_matricula
WHERE n.nota1 >= 9 OR n.nota2 >= 9 OR n.nota3 >= 9;
```

26.
```sql
SELECT c.nome
FROM cursos c
JOIN turmas t ON c.id_curso = t.id_curso
JOIN matriculas m ON t.id_turma = m.id_turma
GROUP BY c.nome
HAVING COUNT(*) = (
    SELECT MAX(total_matriculas)
    FROM (
        SELECT COUNT(*) AS total_matriculas
        FROM turmas t2
        JOIN matriculas m2 ON t2.id_turma = m2.id_turma
        GROUP BY t2.id_curso
    ) x
);
```

27.
```sql
SELECT a.nome
FROM alunos a
WHERE a.id_aluno IN (
    SELECT m.id_aluno
    FROM matriculas m
    WHERE m.id_turma IN (
        SELECT t.id_turma
        FROM turmas t
        JOIN cursos c ON t.id_curso = c.id_curso
        WHERE c.nome = 'Banco de Dados e SQL'
    )
);
```

28.
```sql
SELECT a.nome
FROM alunos a
WHERE a.id_aluno IN (
    SELECT m.id_aluno
    FROM matriculas m
    JOIN turmas t ON m.id_turma = t.id_turma
    WHERE t.id_professor = (
        SELECT id_professor
        FROM professores
        WHERE nome = 'Ana Paula Souza'
    )
);
```

## Desafios

29.
```sql
SELECT c.nome AS curso,
       t.nome_turma,
       COUNT(m.id_matricula) AS total_alunos,
       AVG(n.media) AS media_notas,
       MAX(n.media) AS maior_nota,
       MIN(n.media) AS menor_nota
FROM turmas t
JOIN cursos c ON t.id_curso = c.id_curso
JOIN matriculas m ON t.id_turma = m.id_turma
JOIN notas n ON m.id_matricula = n.id_matricula
GROUP BY c.nome, t.nome_turma
ORDER BY media_notas DESC;
```

30.
```sql
SELECT t.nome_turma,
       COUNT(m.id_matricula) AS total_alunos,
       AVG(n.media) AS media_turma
FROM turmas t
JOIN matriculas m ON t.id_turma = m.id_turma
JOIN notas n ON m.id_matricula = n.id_matricula
GROUP BY t.nome_turma
HAVING AVG(n.media) > 7.5
   AND COUNT(m.id_matricula) >= 5;
```
