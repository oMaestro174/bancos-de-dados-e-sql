# Relatório de stack 03 — Backend Express

- Data de execução: 2026-07-06
- Projeto: escola-fullstack
- Pasta do backend: grupo-01/app/backend

## Objetivo

Implementar as rotas Express para consultar alunos e turmas diretamente via Prisma contra o banco PostgreSQL.

## Arquivos criados/alterados

- grupo-01/app/backend/server.js

## Funcionalidades implementadas

- Servidor Express com CORS e middleware de log.
- Rota GET /api/alunos.
- Rota GET /api/alunos?turma=... .
- Rota GET /api/alunos?nome=... .
- Rota GET /api/turmas.

## Validação executada

As rotas foram testadas com chamadas HTTP reais ao servidor local.

### Respostas observadas

- GET /api/alunos → status 200
- GET /api/alunos?turma=BD-01 → status 200
- GET /api/alunos?nome=ana → status 200
- GET /api/turmas → status 200

## Resultado

O backend Express passou a responder com dados consultados no banco PostgreSQL através do Prisma.
