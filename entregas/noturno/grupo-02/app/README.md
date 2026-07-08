# Front-end — Portal Acadêmico

Interface em **React 18 + Vite** para consulta dos alunos da base `escola_db`.

## Requisitos
- Node.js 18+
- API rodando (ver `../api`)

## Instalação e execução

```bash
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run dev             # http://localhost:5173
```

Ajuste `VITE_API_URL` no `.env` se a API não estiver em `http://localhost:3001`.

## Scripts
| Comando           | O que faz                          |
|-------------------|------------------------------------|
| `npm run dev`     | Servidor de desenvolvimento (HMR)  |
| `npm run build`   | Build de produção em `dist/`       |
| `npm run preview` | Serve o build localmente           |

## Organização (`src/`)
```
components/  → Design System (Button, Card, Table, Modal, Toast, ...)
pages/       → Login, Dashboard, Students
layouts/     → AppLayout (Navbar + conteúdo)
contexts/    → Auth, Theme, Toast
hooks/       → useAlunos, useTurmas, useDebounce
routes/      → ProtectedRoute
services/    → api.js (Axios + interceptors JWT)
styles/      → design-system.css, global.css
utils/       → format, exportCsv
```

Conceitos de React aplicados: componentização, props, **hooks**
(`useState`, `useEffect`, custom hooks), **Context API**, consumo de API
(Axios), estados de carregamento/erro e eventos.
