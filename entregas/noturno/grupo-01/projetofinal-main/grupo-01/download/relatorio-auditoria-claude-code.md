# Relatório de auditoria — sessão Claude Code (07/07/2026)

## Contexto

Entre a última sessão com o Claude Code e esta, o projeto foi editado pelo GitHub Copilot sem supervisão direta. Esta auditoria releu o estado atual do zero (código + testes ao vivo contra o backend rodando), sem assumir que nada estava certo só por já existir.

---

## 1. Diff geral

- `grupo-01/app/backend/` inteiro era novo/não commitado no início da sessão.
- `grupo-01/download/` (relatórios anteriores de diagnóstico do próprio Copilot) e `grupo-01/sql/escola_db_postgres.sql` também não commitados.
- Frontend com mudanças não commitadas em `App.jsx`, `StudentModal.jsx`, `StudentsPage.jsx`, `StudentsTable.jsx`, `StudentCards.jsx`, `vite.config.js`.
- `server.js` foi o último arquivo tocado pelo Copilot, depois de todos os relatórios em `download/` — ou seja, os relatórios antigos já estavam desatualizados quando a auditoria começou (ex.: `relatorio-aderencia-enunciado.md` dizia que o frontend "ainda usa mock", o que não era mais verdade).

## 2. Backend — rotas (verificado lendo o código E testando ao vivo contra o Postgres real)

| Rota | Status | Evidência |
| --- | --- | --- |
| GET /api/alunos | ✅ | Usa Prisma real, suporta `?turma=` e `?nome=` (contains, case-insensitive). Testado ao vivo. |
| GET /api/turmas | ✅ | Testado ao vivo, retornou as 10 turmas reais do banco. |
| POST /api/alunos | ✅ | Valida nome/e-mail/cidade, normaliza e-mail, retorna **409** em e-mail duplicado (confirmado com request real). |
| PUT /api/alunos/:id | ✅ | Retorna **404** se o aluno não existe (confirmado com id inexistente), 409 se e-mail duplicado de outro aluno. |
| DELETE /api/alunos/:id | ✅ | Bloqueia com **409** se houver matrícula vinculada (confirmado com aluno matriculado). |

Nenhuma rota nova "estranha" foi introduzida pelo Copilot. Sem SQL concatenado, sem CORS `*` (restrito a `localhost:5173`/`127.0.0.1:5173`), sem stack trace vazando pro cliente. `.env` e `node_modules` corretamente cobertos pelo `.gitignore` raiz.

## 3. Schema Prisma

Os 6 models (Professor, Curso, Turma, Aluno, Matricula, Nota) batem com o esperado, campos e relações intactos. `npx prisma validate` → **schema válido**. `@prisma/client` gerado e funcional.

## 4. Frontend

- `App.jsx` não usa mais `mockData.js` — confirmado por grep, nenhum arquivo do frontend importa mais o mock.
- Fetch real para `/api/alunos` e `/api/turmas`, com proxy do Vite (`vite.config.js`) para `http://localhost:3001`.
- `StudentModal` valida nome/e-mail/cidade no cliente antes de enviar.
- Tabela e cards tratam média/notas ausentes sem quebrar (`calculateAverage` retorna 0 se não há notas).

## 5. Pontos de atenção identificados (não são bugs, mas decisões que valem revisão)

1. **Escopo além do pedido pelo PO**: o próprio relatório do Copilot (`relatorio-aderencia-enunciado.md`) registra que cadastro/edição/exclusão **não são obrigatórios**. Mesmo assim, o CRUD completo foi implementado (frontend + backend). Funciona, mas é superfície extra de risco no dia da apresentação.
2. **Filtro do backend não é usado pelo frontend**: `StudentsPage.jsx` carrega todos os alunos uma vez e filtra 100% no cliente. Os query params `?turma=`/`?nome=` do backend existem e funcionam, mas nunca são chamados pela UI atual.
3. **Campo `media` no banco não bate com a média real de `nota1/2/3`** em alguns registros testados (ex.: notas [8.06, 7.32, 7.17] deveriam dar 7.52, banco retorna 7.83). Vem do dado seedado, não do código — vale confirmar se é proposital antes da apresentação.
4. **Arquivos de debug soltos na raiz do backend** (`debug-filter.js`, `test-connection.js`, `test-route.js`, `tmp-prisma-check.js`) — não afetam a aplicação, mas são lixo de sessão de debug do Copilot.
5. **Documento de equipe vazio** (`grupo-01/docs/integrantes-e-funcoes.md`) e **sem publicação em nuvem** — pendências já sinalizadas antes, seguem pendentes.

## 6. Correções aplicadas nesta sessão

- **Botões de ação (Editar/Excluir)** trocados de texto para ícones (lápis e lixeira) em `StudentsTable.jsx` e `StudentCards.jsx`, com componente novo `icons.jsx` e classes `.icon-button`/`.row-actions` em `global.css`. `npm run build` validado sem erros.
- Investigado o erro "não foi possível carregar os alunos": **não é bug de código** — é o serviço Windows `postgresql-x64-18` parado na máquina, confirmado pelo log real do backend (`PrismaClientInitializationError: Can't reach database server at 127.0.0.1:5432`).

## 7. Bloqueio identificado: serviço PostgreSQL parado

- O serviço `postgresql-x64-18` está **parado** e a conta Windows em uso (`nti567901\nti`) **não é administradora** (`IsInRole(Administrator) = False`), então `net start` sem elevação falha com "Erro de sistema 5 — Acesso negado".
- Enquanto o serviço estiver parado, toda rota do backend que toca o banco (GET/POST/PUT/DELETE) responde 500, e é exatamente esse 500 que dispara o alerta "Não foi possível carregar os alunos." no frontend.
- Ação pendente do usuário: iniciar o serviço com uma conta administradora (`net start postgresql-x64-18` num terminal elevado, ou via `services.msc`).

## 8. Status no fim desta sessão

- Backend (`node server.js`, porta 3001) e frontend (`npm run dev`, porta 5173) sobem sem erro de inicialização.
- Falta apenas o Postgres voltar a rodar para o fluxo de consulta/CRUD funcionar de ponta a ponta antes da apresentação de 07/07.
