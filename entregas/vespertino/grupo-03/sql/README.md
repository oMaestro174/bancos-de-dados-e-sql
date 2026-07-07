# sql/ — Consultas SQL

Consultas utilizadas pela aplicação e demonstradas na apresentação do Projeto Integrador do Módulo 09 (Bancos de Dados e SQL) — ITEAM/CCTI.

Arquivo: `consultas.sql`
Base: `escola_db`

## Conteúdo

| # | Consulta | Recursos demonstrados |
|---|----------|------------------------|
| 1 | Query principal (usada pela API `/api/alunos`) | JOIN, LEFT JOIN, WHERE, LIKE, ORDER BY |
| 2 | Query de turmas (usada pela API `/api/turmas`) | SELECT simples, ORDER BY |
| 3 | Média por turma | JOIN, GROUP BY, AVG, ROUND |
| 4 | Alunos acima da média geral | JOIN, subconsulta escalar, ORDER BY |
| 5 | Ocupação das turmas | LEFT JOIN, GROUP BY, COUNT |
| 6 | Turmas com média abaixo de 6 | GROUP BY, HAVING, AVG |
| 7 | Validação da importação | Subconsultas múltiplas, COUNT |

## Como executar

No MySQL Workbench, com a base `escola_db` já importada:

```sql
USE escola_db;
```

Depois, execute cada bloco individualmente (selecione o trecho desejado e rode com Ctrl+Enter), ou o arquivo inteiro de uma vez.

## Detalhes por consulta

### 1. Query principal
Recupera alunos matriculados com turma, turno, data de matrícula e notas. É a mesma query implementada em `back/app.py`, com filtros de nome e turma parametrizados na API.

**Por que `LEFT JOIN` em `notas`:** garante que o aluno apareça mesmo sem nota lançada — com `INNER JOIN`, esse aluno desapareceria do resultado.

### 2. Turmas
Lista simples usada para popular o filtro/select no front-end.

### 3. Média por turma
Agrupa as notas por turma e calcula a média com `AVG`, arredondada com `ROUND`. Permite comparar o desempenho entre turmas.

### 4. Alunos acima da média geral
Usa uma subconsulta (`SELECT AVG(media) FROM notas`) para calcular a média geral e compara cada aluno a esse valor no `WHERE`.

### 5. Ocupação das turmas
Compara `capacidade` (cadastrada em `turmas`) com o número real de matriculados, usando `LEFT JOIN` para garantir que turmas sem matrícula também apareçam (com contagem zero).

### 6. Turmas com média abaixo de 6
Mesma lógica da consulta 3, mas com `HAVING` para filtrar o resultado **após** o agrupamento — necessário porque `WHERE` não pode filtrar sobre valores agregados como `AVG()`.

### 7. Validação da importação
Usada para conferir, logo após importar o script `escola_db.sql`, se todas as tabelas foram populadas com o número esperado de registros (6 professores, 6 cursos, 10 turmas, 70 alunos, 70 matrículas, 70 notas).

## Conceitos aplicados (resumo para a apresentação)

- **JOIN / LEFT JOIN:** relacionam tabelas seguindo as chaves estrangeiras; `LEFT JOIN` preserva registros sem correspondência na tabela relacionada.
- **WHERE + LIKE:** filtro de linhas, incluindo busca parcial de texto.
- **GROUP BY + funções de agregação (AVG, COUNT):** resumem múltiplas linhas em um valor por grupo.
- **HAVING:** filtra sobre valores agregados, aplicado depois do `GROUP BY` (diferente de `WHERE`, que filtra antes).
- **Subconsulta (subquery):** uma consulta usada como valor dentro de outra, útil para comparar cada linha a um valor calculado globalmente (ex.: média geral).

