# Atividade Prática — Consultas SQL Avançadas

**Curso:** Capacitação em Desenvolvimento Full Stack  
**Disciplina:** Banco de Dados e SQL  
**Conteúdo:** WHERE, ORDER BY, GROUP BY, HAVING, funções agregadas, JOINs e subconsultas  
**Base de dados:** `escola_db`

## Objetivo
Praticar consultas SQL avançadas em uma base de dados relacional simulando um ambiente acadêmico.

## Instruções gerais
1. Execute o script da base `escola_db`.
2. Não altere os dados iniciais.
3. Resolva cada questão com uma consulta SQL.
4. Entregue apenas o arquivo com as respostas ou cole as consultas em um documento.
5. Teste as consultas uma por uma antes de finalizar.

## Parte 1 — WHERE e ORDER BY

1. Liste todos os alunos em ordem alfabética pelo nome.
2. Liste os alunos da cidade de Boa Vista em ordem alfabética.
3. Mostre as turmas do período `2026.1` ordenadas pelo turno.
4. Liste os cursos da área de Desenvolvimento Web em ordem crescente de nome.
5. Mostre os professores da área Banco de Dados.

## Parte 2 — GROUP BY e funções agregadas

6. Conte quantos alunos estão matriculados em cada turma.
7. Conte quantas matrículas existem por curso.
8. Mostre a média das notas por turma.
9. Mostre a soma das notas por turma.
10. Mostre a maior e a menor nota por turma.
11. Liste a quantidade de alunos por cidade.
12. Mostre a média de notas por aluno.

## Parte 3 — HAVING

13. Liste as turmas com média de notas maior ou igual a 7.
14. Mostre os cursos com mais de 5 matrículas.
15. Liste os alunos cuja média geral seja maior ou igual a 8.
16. Mostre as turmas com pelo menos 4 matrículas.
17. Liste as cidades que possuem mais de 10 alunos cadastrados.

## Parte 4 — JOINs

18. Mostre o nome do aluno, a turma e o curso em que ele está matriculado.
19. Liste o nome do professor e o curso que ele ministra.
20. Mostre alunos, turmas e turnos em uma única consulta.
21. Liste os cursos com seus respectivos professores.
22. Mostre os alunos com seus status de matrícula.
23. Liste todas as turmas com nome do curso e nome do professor.

## Parte 5 — Subconsultas

24. Mostre os alunos com média maior ou igual à média geral da turma.
25. Liste os alunos com nota maior ou igual a 9 em pelo menos uma avaliação.
26. Mostre os cursos cuja quantidade de matrículas é igual ao maior número de matrículas entre os cursos.
27. Liste os alunos matriculados em turmas do curso Banco de Dados e SQL usando subconsulta.
28. Mostre os alunos que estão em turmas ministradas pela professora Ana Paula Souza.

## Desafios

29. Crie uma consulta única que mostre o nome do curso, nome da turma, total de alunos, média das notas, maior nota e menor nota, ordenado pela média da turma do maior para o menor.
30. Crie uma consulta que mostre apenas as turmas com média acima de 7,5 e pelo menos 5 alunos matriculados.
