# 📚 Escola DB

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue?logo=postgresql)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-Academic-lightgrey)](#-licença)

Projeto Integrador da disciplina de **Banco de Dados e SQL** que desenvolve uma **aplicação web full-stack** para gerenciamento e consulta de informações acadêmicas armazenadas em um banco de dados PostgreSQL.

## 🎯 Objetivo Principal

Criar uma plataforma integrada que combine:
- **Frontend moderno** (React + Vite) para visualização de dados
- **Backend robusto** (Node.js + Express) com APIs RESTful
- **Banco de dados relacional** (PostgreSQL) com views otimizadas

Permitindo que usuários consultem informações completas dos alunos de forma rápida e intuitiva.

## ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| 📋 **Listagem de Alunos** | Visualize todos os alunos cadastrados |
| 🔍 **Busca por Nome** | Encontre alunos filtrando pelo nome |
| 🏫 **Filtro por Turma** | Organize alunos por turma |
| 📊 **Visualização de Notas** | Consulte notas e média final |
| ⚡ **Atualização Dinâmica** | Interface reativa em tempo real |
| 🔗 **Buscas Combinadas** | Combine múltiplos filtros simultaneamente |

---

## 🛠 Tecnologias Utilizadas

### Frontend
| Tecnologia | Versão | Propósito |
|---|---|---|
| **React** | 18+ | Framework de UI |
| **Vite** | 5+ | Build tool e dev server |
| **JavaScript (ES6+)** | - | Lógica da aplicação |
| **CSS** | 3 | Estilização |
| **Fetch API** | - | Requisições HTTP |

### Backend
| Tecnologia | Versão | Propósito |
|---|---|---|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express** | 4.18+ | Framework web |
| **Supabase JS Client** | - | Client para PostgreSQL |
| **CORS** | - | Segurança entre domínios |
| **Dotenv** | - | Variáveis de ambiente |
| **Nodemon** | - | Auto-reload em desenvolvimento |

### Banco de Dados
| Tecnologia | Versão | Propósito |
|---|---|---|
| **PostgreSQL** | 14+ | SGBD relacional |
| **Supabase** | - | Platform as a Service |

---

## 📁 Estrutura do Projeto

```
grupo-03/
├── README.md                    # Documentação principal
├── .gitignore                   # Arquivos ignorados pelo Git
│
├── apps/
│   └── escola-db/               # Aplicação principal
│       ├── eslint.config.js
│       ├── vite.config.js
│       ├── package.json
│       ├── index.html
│       │
│       ├── src/                 # Código-fonte React
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   ├── index.css
│       │   ├── assets/
│       │   ├── components/      # Componentes reutilizáveis
│       │   │   ├── Header.jsx
│       │   │   ├── SearchBar.jsx
│       │   │   ├── StudentsTable.jsx
│       │   │   ├── StudentRow.jsx
│       │   │   └── Footer.jsx
│       │   ├── data/
│       │   │   └── alunos.js    # Dados mockados (opcional)
│       │   └── styles/
│       │       └── App.css
│       │
│       └── backend/             # Servidor Express (futuro)
│           ├── src/
│           │   ├── config/      # Configurações (Supabase, etc)
│           │   ├── controllers/ # Lógica de requisições
│           │   ├── routes/      # Definição de rotas
│           │   ├── services/    # Lógica de banco de dados
│           │   └── server.js    # Entrada da aplicação
│           ├── .env
│           └── package.json
│
├── sql/                         # Scripts e queries SQL
│   ├── schema.sql              # Definição do banco
│   ├── consultas.sql           # Queries úteis
│   └── view.sql                # Criação da view vw_alunos
│
├── der/                         # Diagrama Entidade-Relacionamento
│   └── der.png
│
├── docs/                        # Documentação complementar
│   └── integrantes-e-funcoes.md
│
└── infra/                       # Configurações de infraestrutura
```

---

## 🏗 Arquitetura

A aplicação foi desenvolvida seguindo uma **arquitetura cliente-servidor em três camadas**:

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA APRESENTAÇÃO                       │
│                                                              │
│  React (Frontend)  →  UI Interativa  →  Fetch API          │
└────────────────────────────────┬────────────────────────────┘
                                 │
                            HTTP/REST
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA APLICAÇÃO                          │
│                                                              │
│  Express (API)  →  Routes  →  Controllers  →  Services     │
└────────────────────────────────┬────────────────────────────┘
                                 │
                           SQL Queries
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DADOS                              │
│                                                              │
│  PostgreSQL (Supabase)  →  View vw_alunos  →  JSON         │
└─────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
1. Usuário interage com interface
        ↓
2. React dispara Fetch API
        ↓
3. Express recebe requisição GET
        ↓
4. Controller processa a requisição
        ↓
5. Service executa query SQL
        ↓
6. PostgreSQL retorna dados
        ↓
7. Service formata resposta JSON
        ↓
8. Controller retorna ao Frontend
        ↓
9. React renderiza tabela atualizada
```

---

## 📂 Organização do Backend

O backend foi estruturado em camadas para facilitar manutenção, teste e escalabilidade.

### `src/config/`
Responsável pela **inicialização e configuração** de dependências externas.

```javascript
// Exemplo: Conexão com Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### `src/services/`
Contém a **lógica de acesso ao banco de dados**. Isola as queries SQL e tratamento de erros.

```javascript
// Exemplo: Buscar alunos
export const getAlunos = async (busca, turma) => {
  let query = supabase.from('vw_alunos').select('*')
  
  if (busca) query = query.ilike('aluno', `%${busca}%`)
  if (turma) query = query.eq('turma', turma)
  
  return query
}
```

### `src/controllers/`
Recebem as **requisições HTTP** e orquestram a resposta usando services.

```javascript
// Exemplo: Controller para GET /api/alunos
export const listAlunos = async (req, res) => {
  const { busca, turma } = req.query
  const { data, error } = await getAlunos(busca, turma)
  
  if (error) return res.status(500).json({ error })
  return res.json(data)
}
```

### `src/routes/`
Define os **endpoints disponíveis** e mapeia para controllers.

```javascript
// Exemplo: Rotas
router.get('/alunos', listAlunos)
router.get('/alunos/:id', getAlunoById)
```

---

## 🎨 Organização do Frontend

O frontend foi estruturado em componentes reutilizáveis seguindo boas práticas de React.

| Componente | Propósito | Props |
|---|---|---|
| **Header** | Cabeçalho da aplicação | - |
| **SearchBar** | Campo de busca e filtros | `onSearch`, `onFilter` |
| **StudentsTable** | Tabela com lista de alunos | `alunos`, `loading` |
| **StudentRow** | Linha individual da tabela | `aluno` (objeto) |
| **Footer** | Rodapé com informações | - |

### Fluxo de Dados nos Componentes

```
App.jsx (estado global)
    ├── Header
    ├── SearchBar (atualiza estado)
    │   └── fetch() → Backend
    ├── StudentsTable
    │   └── StudentRow (para cada aluno)
    └── Footer
```

---

## 🗄 Banco de Dados

### Modelagem

O banco foi desenvolvido utilizando **PostgreSQL com modelo relacional normalizado**.

**Tabelas principais:**
- `alunos` - Dados pessoais dos alunos
- `turmas` - Informações das turmas
- `matriculas` - Vínculo aluno-turma
- `notas` - Registros de avaliações

### View: `vw_alunos`

Uma **view SQL otimizada** que centraliza as informações necessárias:

```sql
CREATE VIEW vw_alunos AS
SELECT 
  a.id,
  a.nome as aluno,
  a.email,
  t.nome as turma,
  m.data_matricula,
  n.nota1,
  n.nota2,
  n.nota3,
  ROUND((n.nota1 + n.nota2 + n.nota3) / 3, 2) as media_final
FROM alunos a
JOIN matriculas m ON a.id = m.aluno_id
JOIN turmas t ON m.turma_id = t.id
LEFT JOIN notas n ON a.id = n.aluno_id
ORDER BY t.nome, a.nome;
```

**Benefícios da View:**
- ✅ Simplifica a lógica do backend
- ✅ Reutiliza cálculos (média final)
- ✅ Reduz complexidade de JOINs no backend
- ✅ Melhora performance com índices

---

## 🌐 API REST

A API segue padrões RESTful com respostas em JSON.

### Endpoints

#### 📋 Listar todos os alunos
```http
GET /api/alunos
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "aluno": "João Silva",
    "email": "joao@email.com",
    "turma": "BD-01",
    "data_matricula": "2026-01-02",
    "nota1": 8.5,
    "nota2": 7.8,
    "nota3": 8.2,
    "media_final": 8.17
  },
  {
    "id": 2,
    "aluno": "Maria Santos",
    "email": "maria@email.com",
    "turma": "BD-02",
    "data_matricula": "2026-01-05",
    "nota1": 9.0,
    "nota2": 8.9,
    "nota3": 9.1,
    "media_final": 9.0
  }
]
```

---

#### 🔍 Buscar aluno por nome
```http
GET /api/alunos?busca=João
```

---

#### 🏫 Filtrar por turma
```http
GET /api/alunos?turma=BD-01
```

---

#### 🔗 Busca e filtro combinados
```http
GET /api/alunos?busca=João&turma=BD-01
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "aluno": "João Silva",
    "email": "joao@email.com",
    "turma": "BD-01",
    "data_matricula": "2026-01-02",
    "nota1": 8.5,
    "nota2": 7.8,
    "nota3": 8.2,
    "media_final": 8.17
  }
]
```

---

#### ❌ Erros Comuns

| Código | Descrição | Causa |
|--------|-----------|-------|
| 400 | Bad Request | Parâmetros inválidos |
| 404 | Not Found | Nenhum aluno encontrado |
| 500 | Server Error | Erro ao conectar BD |

---

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se que você possui:

- ✅ Node.js 18+ ([Download](https://nodejs.org/))
- ✅ npm ou yarn instalado
- ✅ Git para clonar o repositório
- ✅ Conta no [Supabase](https://supabase.com) com um projeto criado
- ✅ Banco de dados PostgreSQL populado com os dados de alunos

---

## 📦 Instalação e Configuração

### 1️⃣ Clonar o Repositório

```bash
git clone <url-do-repositório>
cd grupo-03
```

### 2️⃣ Configurar o Backend

**Entrar na pasta:**
```bash
cd apps/escola-db
```

**Instalar dependências:**
```bash
npm install
```

**Criar arquivo `.env` com as credenciais do Supabase:**

Crie um arquivo `.env` na raiz do projeto backend:
```env
# Supabase Configuration
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua_chave_anon_aqui

# Server
PORT=3000
NODE_ENV=development
```

> ⚠️ **Dica**: As credenciais encontram-se em `Supabase Dashboard → Settings → API`

**Iniciar o servidor:**
```bash
npm run dev
```

✅ Servidor rodando em: `http://localhost:3000`

### 3️⃣ Configurar o Frontend

**Em outro terminal, entrar na pasta:**
```bash
cd apps/escola-db/src
```

**Instalar dependências:**
```bash
npm install
```

**Iniciar o desenvolvimento:**
```bash
npm run dev
```

✅ Aplicação disponível em: `http://localhost:5173`

### 4️⃣ Verificar Conexão

Teste se tudo está funcionando:

1. Abra a aplicação no navegador (`localhost:5173`)
2. Você deve ver a tabela de alunos preenchida
3. Tente fazer uma busca para confirmar a integração

---

## 🔄 Fluxo de Funcionamento Completo

```
┌─────────────────────────────────────────────────────┐
│  Usuário acessa http://localhost:5173              │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
         ┌──────────────────────┐
         │ React App carrega    │
         │ Fetch /api/alunos    │
         └──────────────┬───────┘
                        │
                        ▼
              ┌──────────────────────┐
              │ Express recebe GET   │
              │ Controller processa  │
              └──────────────┬───────┘
                             │
                             ▼
                   ┌──────────────────────┐
                   │ Service executa      │
                   │ SELECT * FROM        │
                   │ vw_alunos            │
                   └──────────────┬───────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │ PostgreSQL retorna   │
                        │ dados dos alunos     │
                        └──────────────┬───────┘
                                       │
                                       ▼
                            ┌──────────────────────┐
                            │ Resposta JSON        │
                            │ enviada ao Frontend  │
                            └──────────────┬───────┘
                                          │
                                          ▼
                            ┌──────────────────────┐
                            │ React renderiza      │
                            │ tabela com alunos    │
                            └──────────────────────┘
```

---

## 🐛 Troubleshooting

| Problema | Solução |
|---|---|
| **"Cannot GET /api/alunos"** | Certifique-se que o backend está rodando na porta 3000 |
| **"SUPABASE_URL is missing"** | Adicione as variáveis de ambiente no arquivo `.env` |
| **"Error: connect ECONNREFUSED"** | PostgreSQL não está conectado. Verifique credenciais do Supabase |
| **"CORS error no console"** | Verifique se CORS está habilitado no Express |
| **Tabela vazia** | Verifique se a view `vw_alunos` foi criada no banco |

---

## 📝 Variáveis de Ambiente

Todas as variáveis necessárias no `.env`:

```env
# Conexão com o Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua_chave_publica_aqui
SUPABASE_SECRET_KEY=sua_chave_secreta_aqui (opcional)

# Configuração do servidor
PORT=3000
NODE_ENV=development

# CORS (se necessário)
ALLOWED_ORIGINS=http://localhost:5173
```

---

## 📚 Exemplos de Resposta

### Sucesso (200 OK)
```json
[
  {
    "id": 1,
    "aluno": "Adriana Nogueira",
    "email": "adriana.nogueira@email.com",
    "turma": "BD-01",
    "data_matricula": "2026-01-02",
    "nota1": 6.5,
    "nota2": 6.5,
    "nota3": 5.8,
    "media_final": 6.27
  }
]
```

### Erro (500 Server Error)
```json
{
  "error": "Failed to connect to Supabase",
  "message": "SUPABASE_KEY is missing"
}
```

---

## 👥 Equipe de Desenvolvimento

| Nome | Função |
|---|---|
| Kelvin Araújo | Banco de Dados — criação do schema no Supabase |
| Jéssica Iany e Letícia Alves | Banco de Dados — query principal com filtro |
| Gabriel Farias e Letícia Alves | Aplicação — tela de listagem/busca |
| Rafael Nóbrega | Aplicação — integração com Supabase |
| Ryan Kayky | DER e Infraestrutura |
| Letícia Alves | Documentação e apresentação |

---

## 📚 Disciplina e Contexto

**Projeto Integrador** desenvolvido para a disciplina de **Banco de Dados e SQL** com foco em aplicar:

- ✅ Modelagem relacional e normalização (até 3FN)
- ✅ Consultas SQL avançadas (JOINs, subconsultas, aggregations)
- ✅ Views e stored procedures
- ✅ Relacionamentos entre tabelas
- ✅ Integração entre banco de dados, backend e frontend
- ✅ Boas práticas em desenvolvimento full-stack

**Instituição:** [Sua Instituição]  
**Semestre:** 2026 - Noturno  
**Docente:** [Nome do Professor]

---

## 📄 Licença

```
Este projeto foi desenvolvido exclusivamente para fins acadêmicos
como requisito da disciplina de Banco de Dados e SQL.

Não é permitido uso comercial, redistribuição ou modificação
sem permissão explícita dos autores.

© 2026 - Todos os direitos reservados
```

---

## 🤝 Como Contribuir

Este é um projeto acadêmico, mas sugestões de melhorias são bem-vindas!

### Reportar Bugs

Encontrou um problema? Abra uma [issue](https://github.com) descrevendo:
- O que esperava que acontecesse
- O que realmente aconteceu
- Passos para reproduzir

### Sugerir Melhorias

Melhorias podem ser sugeridas via:
- Issues com o label `enhancement`
- Pull requests com clara descrição das mudanças

### Pull Requests

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

- 📧 **Email**: [seu-email@instituição.edu.br](mailto:seu-email@instituição.edu.br)
- 💬 **Discussões**: [GitHub Discussions](https://github.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com)

---

## 📖 Recursos Úteis

- [Documentação PostgreSQL](https://www.postgresql.org/docs/)
- [Documentação React](https://react.dev/)
- [Guia Express.js](https://expressjs.com/)
- [Documentação Supabase](https://supabase.com/docs)
- [RESTful API Best Practices](https://restfulapi.net/)

---

**Última atualização:** Julho de 2026
