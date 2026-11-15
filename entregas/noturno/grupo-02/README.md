# 🎓 Portal Acadêmico — Consulta de Alunos (`escola_db`)

Projeto Integrador do **Módulo 09 — Banco de Dados e SQL**.
Aplicação Full Stack para consulta dos alunos matriculados, com **React JS**,
**API Node.js/Express** e banco **MySQL**, seguindo princípios de UI/UX e um
Design System próprio.

![stack](https://img.shields.io/badge/React-18-61dafb) ![stack](https://img.shields.io/badge/Node.js-Express-3c873a) ![stack](https://img.shields.io/badge/MySQL-8-4479a1) ![stack](https://img.shields.io/badge/Vite-6-646cff)

---

## ✨ Funcionalidades

**Obrigatórias**
- 🔎 Buscar aluno por nome
- 🏷️ Filtrar alunos por turma
- 📝 Exibir as notas (Nota 1, Nota 2, Nota 3)
- 📊 Exibir média final
- ⚡ Atualização dinâmica da interface (sem recarregar a página)

**Diferenciais implementados**
- 🔐 **Login** com autenticação **JWT** e rotas protegidas
- 📈 **Dashboard** com estatísticas e gráfico de média por turma
- 🌗 **Dark Mode** (tema claro/escuro persistente)
- ↕️ Ordenação por qualquer coluna
- 📥 Exportação dos resultados em **CSV**
- 💀 **Skeleton loading**, **Toasts** e **Empty States**
- 📱 Layout **totalmente responsivo** (desktop, tablet e smartphone)

---

## 🗂️ Estrutura do repositório

```text
projeto-integrador/
├── app/     → Front-end React (Vite)
├── api/     → API REST (Node.js + Express + MySQL2)
├── sql/     → Scripts do banco (schema, seed, consultas)
├── der/     → Diagrama Entidade-Relacionamento
├── docs/    → Documentação (design system, guia de uso)
├── infra/   → Configurações de deploy (Vercel / Render)
└── README.md
```

---

## 🚀 Como executar (passo a passo)

> 📘 **Configurando em uma máquina nova?** Veja o guia completo, do zero
> (instalar Node/MySQL/HeidiSQL, importar o banco e solucionar erros comuns):
> **[`docs/INSTALACAO.md`](docs/INSTALACAO.md)**.

### Pré-requisitos
- [Node.js 18+](https://nodejs.org)
- MySQL 8+ em execução (gerenciado pelo **HeidiSQL**)

### 1) Criar o banco de dados

No **HeidiSQL**, abra uma aba de query e execute, **nesta ordem**:

1. `escola_db.sql` — cria o banco `escola_db` com os dados acadêmicos reais
   (professores, cursos, turmas, 70 alunos, matrículas e notas). *(Uma cópia
   também está em `sql/escola_db.sql`.)*
2. `sql/usuarios.sql` — cria a tabela `usuarios` do login (script **aditivo**,
   não altera os dados acadêmicos) e o usuário admin.

> Dica: em *File → Load SQL file...* você abre cada script; depois pressione **F9** para executar.
> As consultas de demonstração estão em `sql/consultas.sql`.

### 2) Subir a API

```bash
cd api
npm install
cp .env.example .env      # Windows: copy .env.example .env
```

Edite o `api/.env` com os dados da sua conexão MySQL (os mesmos do HeidiSQL —
atenção ao `DB_PASSWORD`). Depois:

```bash
npm run dev
```

A API sobe em **http://localhost:3001**.

### 3) Subir o Front-end

```bash
cd app
npm install
npm run dev
```

O site abre em **http://localhost:5173**.

### 4) Entrar

Use as credenciais de demonstração (também mostradas na tela de login):

| E-mail                 | Senha      |
|------------------------|------------|
| `admin@escola.edu.br`  | `admin123` |

---

## 🔐 Sobre o login

- A senha é armazenada como **hash bcrypt** (nunca em texto puro).
- O login devolve um **token JWT** guardado no navegador; ele é enviado
  automaticamente em cada requisição à API.
- As rotas de dados (`/api/alunos`, `/api/estatisticas`...) são **protegidas**:
  sem token válido, retornam `401`.
- Se a tabela `usuarios` estiver vazia, a própria API cria o admin padrão na
  inicialização (ver `api/src/seedAdmin.js`).

---

## 🧱 Design System

Tokens centralizados em [`app/src/styles/design-system.css`](app/src/styles/design-system.css):
paleta (primary, secondary, success, warning, error), tipografia (Inter),
espaçamento, raios e sombras — com variantes para **tema claro e escuro**.
Detalhes em [`docs/design-system.md`](docs/design-system.md).

Componentes reutilizáveis: `Button`, `SearchBar`, `Select`, `Card`, `Badge`,
`Avatar`, `StatCard`, `StudentsTable`, `Modal`, `Navbar`, `Loading/Skeleton`,
`EmptyState`, `Toast`, `ThemeToggle`.

---

## 🔌 API REST (RESTful)

A comunicação segue os princípios **REST**:

- **Recursos** no plural e no substantivo: `/alunos`, `/turmas`, `/estatisticas`, `/auth`.
- **Verbos HTTP** com semântica correta: `GET` para consulta, `POST` para login.
- **Stateless**: cada requisição carrega o token JWT no header `Authorization`.
- **Representação em JSON** e **status codes** adequados (`200`, `401`, `404`, `500`).
- Identificação de item por URL: `GET /api/alunos/:id`.

| Método | Rota                | Descrição                          |
|--------|---------------------|------------------------------------|
| POST   | `/api/auth/login`   | Autentica e devolve o token JWT    |
| GET    | `/api/auth/me`      | Usuário autenticado (protegida)    |
| GET    | `/api/alunos`       | Lista/filtra matrículas            |
| GET    | `/api/alunos/:id`   | Detalhe de uma matrícula + notas   |
| GET    | `/api/turmas`       | Lista de turmas                    |
| GET    | `/api/estatisticas` | Métricas do dashboard              |

Detalhes e filtros em [`api/README.md`](api/README.md).

## 🗄️ Banco de dados

Modelo relacional real com 6 tabelas: `professores`, `cursos`, `turmas`,
`alunos`, `matriculas`, `notas` — mais a `usuarios` (login). Veja o diagrama e o
dicionário de dados em [`der/DER.md`](der/DER.md) e as consultas comentadas
(JOINs entre as 6 tabelas) em [`sql/consultas.sql`](sql/consultas.sql).

---

## 📦 Deploy

Instruções de publicação (Vercel para o front, Render para a API) em
[`infra/DEPLOY.md`](infra/DEPLOY.md).

---

## 👥 Papéis da equipe

# Integrantes do Grupo 02

| Nome completo | Função no projeto              | Responsabilidades                                      |
|---------------|---------------------------------|----------------------------------------------------------|
| [Andre Rodrigues]| Banco de Dados / Back-end   | Modelagem, script SQL, consultas, API Express            |
| [Caue Soares] | Front-end                 | Interface web, filtros, estilização                       |
| [Ivan Bentes] | Infraestrutura / Deploy   | Publicação, ambiente, documentação de deploy               |
| [Jennison Diniz] | Infraestrutura / Deploy  | Publicação, ambiente, documentação de deploy             |
| [Marcio Henrique] | Front-end   | Interface web, filtros, estilização              |
| [Maiko Machado] | Banco de Dados / Back-end  | Modelagem, script SQL, consultas, API Express               |
| [Rafael da Silva] | Modelagem do sistema  | Modalagem do sistema, diagram de caso de uso            |
| [Elyton Moreira] | Front-end    | UX/UI Design      |
