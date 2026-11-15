# Publicação (Deploy)


- **Front-end (React/Vite)** → Vercel
- **API (Node/Express)** → Render (ou Railway)
- **Banco (MySQL)** → Railway / PlanetScale / Aiven (ou o MySQL da instituição)

```
Usuário ──▶ Vercel (app) ──▶ Render (api) ──▶ MySQL (nuvem)
```

## 1) Banco de dados na nuvem

1. Crie uma instância MySQL no provedor escolhido.
2. Rode `sql/01_schema.sql` e `sql/02_seed.sql` (via HeidiSQL apontando para o host remoto).
3. Anote host, porta, usuário, senha e nome do banco.

## 2) API no Render

1. **New → Web Service**, conecte o repositório e aponte a raiz para `api/`.
2. Build Command: `npm install` · Start Command: `npm start`
3. Variáveis de ambiente (aba *Environment*):

   ```
   PORT=3001
   DB_HOST=...
   DB_PORT=3306
   DB_USER=...
   DB_PASSWORD=...
   DB_NAME=escola_db
   JWT_SECRET=<valor-longo-aleatorio>
   JWT_EXPIRES=8h
   CORS_ORIGIN=https://SEU-APP.vercel.app
   ```

4. Após o deploy, a API fica em `https://SEU-SERVICO.onrender.com`.

## 3) Front-end na Vercel

1. **Add New → Project**, selecione o repositório, *Root Directory* = `app/`.
2. Framework preset: **Vite**. Build: `npm run build` · Output: `dist`.
3. Variável de ambiente:

   ```
   VITE_API_URL=https://SEU-SERVICO.onrender.com/api
   ```

4. O `infra/vercel.json` já configura o *fallback* de SPA (todas as rotas
   servem `index.html`) — necessário para o React Router funcionar em produção.

## Checklist final

- [ ] Banco criado e populado na nuvem
- [ ] API respondendo em `/` (health check)
- [ ] `CORS_ORIGIN` da API = domínio da Vercel
- [ ] `VITE_API_URL` do front = URL da API + `/api`
- [ ] Login funcionando com `admin@escola.edu.br` / `admin123`
