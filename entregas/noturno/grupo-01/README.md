# 🎓 Sistema de Consulta de Alunos

![Status](https://img.shields.io/badge/Status-Concluído-success)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-Framework-black?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)

---

# 📖 Sobre o Projeto

O **Sistema de Consulta de Alunos** é uma aplicação web desenvolvida para realizar consultas de informações acadêmicas dos estudantes.

A plataforma permite visualizar dados como:

- 👤 Nome
- 📧 E-mail
- 🏫 Turma
- 🆔 Matrícula
- 📝 Notas
- 📊 Média Final

Além disso, oferece mecanismos de pesquisa por nome, matrícula e e-mail, bem como filtros por turma para facilitar a localização dos registros cadastrados.

---

# 🎯 Objetivo

Este projeto foi desenvolvido com o objetivo de aplicar os conhecimentos adquiridos nas disciplinas de:

- Banco de Dados
- Modelagem Relacional
- SQL
- Desenvolvimento Web
- Integração Front-end e Back-end
- APIs REST
- Persistência de Dados

---

# ✨ Funcionalidades

✔️ Listagem de alunos cadastrados

✔️ Consulta de informações acadêmicas

✔️ Busca por nome

✔️ Busca por matrícula

✔️ Busca por e-mail

✔️ Filtro por turma

✔️ Cálculo automático da média

✔️ Interface Web responsiva

✔️ Integração com banco de dados PostgreSQL

---

# 🛠 Tecnologias Utilizadas

## 🎨 Front-end

- React
- Vite
- JavaScript
- CSS

---

## ⚙️ Back-end

- Node.js
- Express

---

## 🗄 Banco de Dados

- PostgreSQL
- Supabase
- SQL

---

# 📂 Estrutura do Projeto

```text
grupo-01/
│
├── app/
│   ├── frontend/            # Interface React + Vite
│   └── backend/             # API Node.js + Express
│
├── sql/
│   ├── schema.sql           # Estrutura do banco
│   └── consultas.sql        # Consultas SQL
│
├── der/
│   └── modelorelacional.png # DER
│
├── docs/
│   ├── integrantes-e-funcoes.md
│   └── roteiro-apresentacao.md
│
└── infra/
    └── publicacao.md
```

---

# 🗄 Banco de Dados

O banco de dados utilizado chama-se:

```text
escola_db
```

Responsável pelo armazenamento das informações dos alunos:

- Nome
- Matrícula
- Turma
- Notas
- Média
- Dados pessoais

### Arquivos

Estrutura do banco

```text
sql/schema.sql
```

Consultas SQL

```text
sql/consultas.sql
```

---

## 📌 Consultas Implementadas

- SELECT
- WHERE
- ORDER BY
- GROUP BY
- JOIN
- COUNT()
- SUM()
- Subconsultas

---

# 📈 Modelo Entidade-Relacionamento (DER)

O DER apresenta toda a estrutura relacional do banco de dados.

Arquivo:

```text
der/modelorelacional.png
```

---

# 🚀 Como Executar o Projeto

## 1️⃣ Criar o Banco de Dados

Execute:

```bash
psql -U postgres -f sql/schema.sql
```

---

## 2️⃣ Executar o Back-end

Entre na pasta:

```bash
cd app/backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Configure as credenciais do PostgreSQL no arquivo `.env`.

Execute:

```bash
npm start
```

---

## 3️⃣ Executar o Front-end

Abra outro terminal.

Entre na pasta:

```bash
cd app/frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

A aplicação ficará disponível no endereço informado pelo Vite.

Exemplo:

```text
http://localhost:5173
```

---

# 📊 Resultado Esperado

Após iniciar a aplicação, será possível:

- Consultar alunos cadastrados
- Visualizar informações acadêmicas
- Filtrar por turma
- Pesquisar por nome
- Pesquisar por matrícula
- Pesquisar por e-mail
- Visualizar notas e médias

---

# 📚 Aprendizados

Durante o desenvolvimento foram aplicados conceitos de:

- Banco de Dados Relacional
- SQL
- PostgreSQL
- React
- Node.js
- Express
- APIs REST
- Integração Full Stack
- Organização de projetos
- Documentação técnica

---

# 👥 Equipe do Projeto

## 🗄 Modelagem do Banco de Dados

**Integrantes**

- Denym Queiroz
- Stephany Olivia

**Atividades**

- Modelo relacional
- Chaves primárias
- Chaves estrangeiras
- Relacionamentos
- Estrutura das tabelas

---

## 💾 Banco de Dados e SQL

**Integrantes**

- Denym Queiroz
- Stephany Olivia

**Atividades**

- Criação das tabelas
- Inserção de dados
- Consultas SQL
- DER
- JOIN
- GROUP BY
- Subconsultas

---

## 🎨 Front-end

**Integrantes**

- Geandria
- Larissa

**Atividades**

- Interface React
- Componentes
- CSS
- Busca
- Filtros
- Responsividade

---

## ⚙️ Back-end

**Integrantes**

- Nelson
- Wendenmara

**Atividades**

- API REST
- Express
- Integração com PostgreSQL
- Rotas de consulta

---

## 🏗 Infraestrutura

**Integrantes**

- Wendenmara
- Nelson

**Atividades**

- Organização do projeto
- Dependências
- Configuração do ambiente
- Publicação

---

## 🧪 Testes e Documentação

**Integrantes**

- Luiza Eduarda
- Ana Caroline

**Atividades**

- Testes
- Revisão
- README
- Documentação
- CRUD completo de alunos

---

# 👨‍💻 Integrantes

| Integrante | Responsabilidade |
|------------|------------------|
| Ana Caroline dos Santos | Documentação |
| Antônia Larissa Amorim | Front-end |
| Denym Andrade Queiroz | Modelagem, Infraestrutura e SQL |
| Geandria de Menezes Pereira | Front-end |
| Luiza Eduarda Lopes | Documentação |
| Nelson Loureiro da Cruz | Backend, Infraestrutura |
| Ruan Pereira Malheiros | — |
| Stephany Olivia da Silva Pereira | Modelagem, SQL e DER |
| Wendenmara Aparecida da Silva Gomes | Infraestrutura |

---

# 📌 Conclusão

O desenvolvimento deste projeto possibilitou aplicar conceitos fundamentais de banco de dados, modelagem relacional, consultas SQL e desenvolvimento Full Stack.

A integração entre **React**, **Node.js**, **Express** e **PostgreSQL** permitiu construir uma aplicação capaz de consultar informações acadêmicas de forma organizada, intuitiva e eficiente.

---

## ⭐ Projeto Acadêmico

Desenvolvido para fins de aprendizagem e aplicação prática dos conceitos de Banco de Dados e Desenvolvimento Web.
