# API — escola_db

API REST em **Node.js + Express + MySQL2** que expõe os dados da base `escola_db`.

## Requisitos

- Node.js 18+
- MySQL 8+ com a base `escola_db` criada (ver pasta `../sql`)

## Instalação

```bash
cd api
npm install
cp .env.example .env   # no Windows: copy .env.example .env
```

Edite o `.env` com os dados da sua conexão (os mesmos usados no HeidiSQL).

## Executar

```bash
npm run dev    # com auto-reload (node --watch)
# ou
npm start
```

A API sobe em `http://localhost:3001`.

## Endpoints

| Método | Rota                 | Protegida | Descrição                                        |
|--------|----------------------|:---------:|--------------------------------------------------|
| GET    | `/`                  | não       | Health check                                     |
| POST   | `/api/auth/login`    | não       | Login — recebe `{ email, senha }`, devolve token JWT |
| GET    | `/api/auth/me`       | sim       | Dados do usuário do token                        |
| GET    | `/api/alunos`        | sim       | Lista alunos (filtros via query string)          |
| GET    | `/api/alunos/:id`    | sim       | Detalhe do aluno + notas por disciplina          |
| GET    | `/api/turmas`        | sim       | Lista de turmas (para o filtro)                  |
| GET    | `/api/estatisticas`  | sim       | Números do dashboard (totais e médias por turma) |

As rotas protegidas exigem o header `Authorization: Bearer <token>`.

### Login

```
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{ "email": "admin@escola.edu.br", "senha": "admin123" }
```

### Filtros de `/api/alunos`

| Param        | Exemplo                | Efeito                                  |
|--------------|------------------------|-----------------------------------------|
| `nome`       | `?nome=ana`            | Busca por nome (LIKE)                    |
| `turma`      | `?turma=1`             | Filtra por `id_turma`                    |
| `email`      | `?email=escola`        | Busca por e-mail (LIKE)                  |
| `matricula`  | `?matricula=2026001`   | Busca por matrícula (LIKE)               |
| `ordenarPor` | `?ordenarPor=media`    | `nome` \| `matricula` \| `turma` \| `media` \| `data` |
| `ordem`      | `?ordem=desc`          | `asc` (padrão) ou `desc`                 |

Exemplo:

```
GET http://localhost:3001/api/alunos?nome=ana&ordenarPor=media&ordem=desc
```