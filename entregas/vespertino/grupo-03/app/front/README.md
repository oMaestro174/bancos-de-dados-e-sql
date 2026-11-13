# escola-db-front

Interface web de consulta de alunos matriculados — front-end do Projeto Integrador do Módulo 09 (Bancos de Dados e SQL) do curso Full Stack CCTI/ITEAM.

Aplicação **somente leitura**: exibe alunos matriculados na base `escola_db`, com filtro por turma, busca por nome, ordenação e paginação. Não há cadastro ou edição de registros (fora do escopo solicitado).

## Stack

- **React 19** + **Vite** (com React Compiler)
- **Material UI (MUI)** — tabela com ordenação e paginação
- **Tailwind CSS v4** — layout e estilização dos controles
- Fonte: Inter (Google Fonts)

## Funcionalidades

- Tabela de alunos com: nome, e-mail, turma, turno, data de matrícula e média final
- Filtro por turma (select alimentado pela API/mock)
- Busca por nome (parcial, sem diferenciar maiúsculas)
- Ordenação clicável por qualquer coluna
- Paginação (10/25/50 por página)
- Destaque visual da média: verde ≥ 6.0 (aprovado), vermelho < 6.0
- Layout responsivo: colunas menos importantes são ocultadas em telas pequenas

## Estrutura

```
src/
├── components/
│   ├── Cabecalho.jsx      # título da página
│   ├── Container.jsx      # wrapper de layout
│   ├── Row.jsx            # linha de filtros
│   ├── Busca.jsx          # input de busca por nome
│   ├── FiltroTurma.jsx    # select de turmas
│   └── TabelaAlunos.jsx   # tabela MUI (ordenação + paginação)
├── data/
│   ├── alunos.json        # mock — mesmo formato de GET /api/alunos
│   └── turmas.json        # mock — mesmo formato de GET /api/turmas
├── App.jsx                # estado global (busca, filtro) e composição
├── main.jsx               # entry point + tema MUI
└── index.css              # Tailwind + reset + fonte
```

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Integração com a API

O front foi desenvolvido com **mocks idênticos ao contrato da API** (estratégia mock-first). Os dados vêm dos arquivos em `src/data/`, gerados a partir da base real `escola_db`.

Para integrar com o back-end (Flask, porta 5000), descomente o fetch no `useEffect` do `App.jsx`:

```jsx
useEffect(() => {
  fetch("http://localhost:5000/api/alunos")
    .then((res) => res.json())
    .then(setAlunos);

  fetch("http://localhost:5000/api/turmas")
    .then((res) => res.json())
    .then(setTurmas);
}, []);
```

Nenhum outro arquivo precisa ser alterado — o contrato dos dados é o mesmo.

### Contrato esperado

`GET /api/turmas`
```json
[{ "id_turma": 1, "nome_turma": "BD-01", "turno": "Manhã" }]
```

`GET /api/alunos`
```json
[{
  "nome": "...", "email": "...",
  "nome_turma": "...", "turno": "...",
  "data_matricula": "2026-01-02",
  "nota1": 6.5, "nota2": 6.5, "nota3": 5.8, "media": 6.27
}]
```

## Decisões técnicas

- **Filtro no cliente:** a lista completa é carregada uma vez e filtrada em memória (~70 registros). Simples e instantâneo para este volume.
- **Componentes controlados:** `Busca` e `FiltroTurma` não têm estado próprio; o `App.jsx` é a única fonte de verdade.
- **Separação de responsabilidades:** o App cuida de *o que* exibir (filtros); a tabela cuida de *como* exibir (ordenação, paginação).
