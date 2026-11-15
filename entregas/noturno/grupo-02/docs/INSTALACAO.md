# 🛠️ Guia de Instalação — Configurar o projeto em outra máquina

Passo a passo completo para rodar o **Portal Acadêmico** (front-end React + API
Node.js + banco MySQL) em um computador novo, do zero. Tempo estimado: ~15 min.

---

## 1. Pré-requisitos (instalar uma vez)

Baixe e instale, nesta ordem:

| Programa      | Para quê                         | Link                                   |
|---------------|----------------------------------|----------------------------------------|
| **Node.js 18+** (LTS) | Rodar a API e o front-end | https://nodejs.org                     |
| **MySQL 8+**  | Banco de dados                   | https://dev.mysql.com/downloads/installer/ |
| **HeidiSQL**  | Gerenciar o banco (importar SQL) | https://www.heidisql.com/download.php  |
| **Git**       | Baixar o código                  | https://git-scm.com/downloads          |

> No instalador do **MySQL**, anote o **usuário** (geralmente `root`) e a **senha**
> que você definir — serão usados no `.env` da API.

Confira se o Node ficou instalado (abra o **PowerShell** ou **CMD**):

```bash
node --version   # deve mostrar v18 ou superior
npm --version
```

---

## 2. Baixar o projeto

```bash
# escolha uma pasta e clone o repositório
git clone https://github.com/TomD4vs/project-escola.git "Portal Academico"
cd "Portal Academico"
```

> Se você recebeu o projeto como **.zip**, apenas extraia e abra a pasta.
> A estrutura deve conter: `app/`, `api/`, `sql/`, `der/`, `docs/`, `escola_db.sql`.

---

## 3. Criar e importar o banco de dados (HeidiSQL)

1. Abra o **HeidiSQL** e crie/abra uma sessão de conexão:
   - **Rede:** `MariaDB or MySQL (TCP/IP)`
   - **Hostname/IP:** `127.0.0.1`
   - **Usuário:** `root`
   - **Senha:** a que você definiu ao instalar o MySQL
   - **Porta:** `3306`
   - Clique em **Abrir**.

2. Importe os **dados acadêmicos**:
   - Menu **Arquivo → Carregar arquivo SQL...**
   - Selecione **`escola_db.sql`** (na raiz do projeto).
   - Pressione **F9** (ou ▶) para executar.
   - Isso cria o banco `escola_db` com professores, cursos, turmas, 70 alunos,
     matrículas e notas.

3. Crie a tabela de **login** (script aditivo, não altera os dados acadêmicos):
   - **Arquivo → Carregar arquivo SQL...** → selecione **`sql/usuarios.sql`** → **F9**.

4. Confirme: na árvore à esquerda, clique com o botão direito em `escola_db` →
   **Atualizar**. Devem aparecer 7 tabelas: `alunos`, `cursos`, `matriculas`,
   `notas`, `professores`, `turmas`, `usuarios`.

---

## 4. Configurar e rodar a API

```bash
cd api
npm install                 # baixa as dependências (uma vez)
copy .env.example .env       # Windows (PowerShell/CMD)
# no Git Bash/Linux/Mac:  cp .env.example .env
```

Abra o arquivo **`api/.env`** e ajuste os dados do banco:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=SUA_SENHA_DO_MYSQL      # <<< coloque a senha do seu MySQL aqui
DB_NAME=escola_db
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=troque-por-um-valor-aleatorio-longo
JWT_EXPIRES=8h
```

Suba a API (deixe este terminal **aberto**):

```bash
npm run dev
```

✅ Sucesso quando aparecer:

```
✅ Conectado ao MySQL (escola_db).
🚀 API rodando em http://localhost:3001
```

> Teste no navegador: abra http://localhost:3001 — deve mostrar
> `{"status":"ok","api":"escola_db","versao":"1.0.0"}`.

---

## 5. Configurar e rodar o Front-end

Abra um **segundo terminal** (o da API continua rodando):

```bash
cd app
npm install                 # baixa as dependências (uma vez)
copy .env.example .env       # Windows   |   cp .env.example .env  (Linux/Mac)
npm run dev
```

O navegador abre em **http://localhost:5173**.

> O `app/.env` só precisa mudar se a API não estiver em `localhost:3001`:
> ```env
> VITE_API_URL=http://localhost:3001/api
> ```

---

## 6. Entrar no sistema

| E-mail                | Senha      |
|-----------------------|------------|
| `admin@escola.edu.br` | `admin123` |

Pronto! Você verá o **Dashboard**, e em **Alunos** poderá buscar, filtrar por
turma, ordenar, paginar, ver detalhes e exportar em CSV.

---

## ⚠️ Resumo mental (sempre que for usar)

São **dois terminais rodando ao mesmo tempo**:

```
Terminal 1:  cd api && npm run dev     →  http://localhost:3001  (deixe aberto)
Terminal 2:  cd app && npm run dev     →  http://localhost:5173
```

Se fechar o Terminal 1, o **login para de funcionar** (o front fica sem API).

---

## 🚑 Solução de problemas

### "Erro ao fazer login" / a tela de alunos não carrega
A **API não está rodando** ou não conectou no banco. Verifique o Terminal 1:
deve mostrar `🚀 API rodando...`. Se mostrar erro de conexão, revise
`DB_PASSWORD` no `api/.env`.

### `EADDRINUSE: address already in use :::3001`
Já existe uma API rodando nessa porta (ou sobrou um processo antigo). No
PowerShell, encerre o processo que está na porta 3001:

```powershell
Get-NetTCPConnection -LocalPort 3001 -State Listen |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

Depois rode `npm run dev` de novo. (Alternativa: mude `PORT=3002` no `.env` da
API **e** `VITE_API_URL=http://localhost:3002/api` no `.env` do app.)

### `Access denied for user 'root'@'localhost'`
Senha errada no `api/.env`. Confirme a senha do MySQL (a mesma que você usa no
HeidiSQL) e ajuste `DB_PASSWORD`.

### `Unknown database 'escola_db'`
O banco não foi importado. Volte ao **passo 3** e execute o `escola_db.sql`.

### `Token não fornecido` / `Sessão expirada`
Faça **logout e login** novamente. O token expira após 8h (configurável em
`JWT_EXPIRES`).

### A porta 5173 abre mas fica em branco
Confira o console do navegador (F12). Geralmente é `VITE_API_URL` errado ou a
API fora do ar.

---

## 🔁 Atualizar o projeto depois (git)

```bash
git pull                       # baixa as novidades
cd api && npm install          # caso tenham entrado novas dependências
cd ../app && npm install
```

---

## 📦 Gerar a versão de produção do front-end (opcional)

```bash
cd app
npm run build                  # gera a pasta dist/
npm run preview                # testa o build localmente
```

Para publicar na nuvem (Vercel + Render), veja
[`../infra/DEPLOY.md`](../infra/DEPLOY.md).
