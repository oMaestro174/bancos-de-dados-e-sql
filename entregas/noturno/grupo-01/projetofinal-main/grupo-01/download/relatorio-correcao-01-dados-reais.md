# Relatório de correção 01 — Dados reais do backend

## 1. Referência a mock no backend

Não havia referência ao arquivo mockData.js no backend. O arquivo [grupo-01/app/backend/server.js](grupo-01/app/backend/server.js) consulta diretamente o Prisma Client e não importa nenhum array fixo, mock ou dado hardcoded para responder as rotas.

## 2. JSON bruto retornado por /api/alunos

O servidor Express foi testado com a rota GET http://localhost:3001/api/alunos e a resposta bruta retornada foi:

```json
[
  {
    "id_aluno": 1,
    "nome": "Adriana Nogueira",
    "email": "adriana.nogueira@escola.com",
    "turma": "BD-01",
    "data_matricula": "2026-01-15T00:00:00.000Z",
    "notas": [7.32, 7.34, 7.54],
    "media": 7.93
  },
  {
    "id_aluno": 2,
    "nome": "Alan Ribeiro",
    "email": "alan.ribeiro@escola.com",
    "turma": "BD-02",
    "data_matricula": "2026-01-16T00:00:00.000Z",
    "notas": [8.18, 8.84, 8.48],
    "media": 7.8
  },
  {
    "id_aluno": 3,
    "nome": "Aline Batista",
    "email": "aline.batista@escola.com",
    "turma": "CD-01",
    "data_matricula": "2026-01-17T00:00:00.000Z",
    "notas": [7.62, 7.01, 8.68],
    "media": 7.32
  }
]
```

## 3. Validação de integridade do banco

A consulta direta via Prisma retornou as contagens abaixo:

```json
{
  "professores": 6,
  "cursos": 6,
  "turmas": 10,
  "alunos": 70,
  "matriculas": 70,
  "notas": 70
}
```

## 4. Conclusão

Os nomes retornados pela rota batem com os dados reais presentes no banco local PostgreSQL, e a implementação do backend agora está baseada no Prisma consultando as tabelas reais da base.
