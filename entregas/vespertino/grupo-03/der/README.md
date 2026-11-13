# der/ — Diagrama Entidade-Relacionamento

Modelo relacional da base `escola_db`, gerado a partir do script de criação — Projeto Integrador do Módulo 09 (Bancos de Dados e SQL) — ITEAM/CCTI.

## Tabelas

| Tabela | Chave primária | Descrição |
|---|---|---|
| `professores` | `id_professor` | Corpo docente: nome, e-mail (único) e área de atuação |
| `cursos` | `id_curso` | Cursos oferecidos: nome, carga horária e área |
| `turmas` | `id_turma` | Ofertas concretas de um curso, ministradas por um professor, em um turno/período |
| `alunos` | `id_aluno` | Alunos cadastrados: nome, e-mail (único), nascimento e cidade |
| `matriculas` | `id_matricula` | Vínculo entre aluno e turma, com data e status |
| `notas` | `id_nota` | Notas parciais e média de cada matrícula |

## Relacionamentos


```
professores ─┐
             ├──< turmas >──┐
   cursos ───┘              │
                             ├──< matriculas >──< notas
                    alunos ──┘
```

- **`professores` 1:N `turmas`** — um professor ministra várias turmas; cada turma tem um professor.
- **`cursos` 1:N `turmas`** — um curso pode ter várias turmas (ofertas); cada turma pertence a um curso.
- **`alunos` N:N `turmas`**, resolvida por **`matriculas`** — um aluno pode estar em várias turmas, e uma turma tem vários alunos. A tabela associativa carrega os atributos próprios do vínculo (`data_matricula`, `status`).
- **`matriculas` 1:1 `notas`** — cada matrícula tem um único registro de notas (nota1, nota2, nota3 e média).

## Por que a tabela `matriculas` existe

Relações N:N não podem ser representadas por uma chave estrangeira simples — exigem uma tabela intermediária. Além de resolver o relacionamento, `matriculas` armazena informação que não pertence nem ao aluno nem à turma isoladamente: a **data** em que aquele vínculo específico começou e o **status** da matrícula.

## Por que `notas` referencia `matriculas`, e não `alunos`

A nota é resultado do desempenho do aluno **naquela turma específica**, não do aluno em abstrato. Se `notas` referenciasse `alunos` diretamente, um aluno matriculado em duas turmas não poderia ter dois boletins distintos. Ao referenciar `matriculas`, cada combinação aluno+turma tem seu próprio conjunto de notas.

## Chaves e integridade

- Todas as tabelas têm chave primária `INT` autoincrementável.
- Chaves estrangeiras (`id_curso`, `id_professor` em `turmas`; `id_aluno`, `id_turma` em `matriculas`; `id_matricula` em `notas`) garantem integridade referencial — não é possível matricular um aluno inexistente ou lançar nota de uma matrícula que não existe.
- `email` é `UNIQUE` em `professores` e `alunos`, prevenindo cadastros duplicados.
- Campos `NN` (`NOT NULL`) marcam atributos obrigatórios em cada tabela.

## Observação sobre a coluna `media`

O campo `media` em `notas` é um valor derivado — tecnicamente calculável a partir de `nota1`, `nota2` e `nota3`. Sua presença como coluna própria é uma desnormalização proposital, comum em sistemas reais para simplificar consultas de leitura (evita recalcular a média a cada consulta).

## Ferramenta utilizada

Diagrama gerado com [dbdiagram.io](https://dbdiagram.io) a partir da estrutura de tabelas do script `escola_db.sql`.