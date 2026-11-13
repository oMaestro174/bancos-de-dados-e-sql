# app — Consulta de Alunos Matriculados

Aplicação full stack de consulta desenvolvida para o Projeto Integrador do Módulo 09 (Bancos de Dados e SQL) — curso Full Stack CCTI/ITEAM.

Sistema **somente leitura** (sem cadastro ou edição) que permite à coordenação acadêmica consultar alunos matriculados na base `escola_db`, com filtro por turma, busca por nome, ordenação e visualização de notas/média final.

## Arquitetura

```
[ NAVEGADOR ]  ──HTTP/JSON──▶  [ API PYTHON/FLASK ]  ──SQL──▶  [ MYSQL: escola_db ]
   front/                          back/                      6 tabelas, dados reais
 (React + MUI                  (2 endpoints,
  + Tailwind)                   query com JOINs)
```

O front consome a API via `fetch`; a API consulta o MySQL e devolve JSON; nenhuma lógica de negócio fica no front além de filtro/busca/ordenação de exibição.

## Estrutura deste diretório

```
app/
├── front/          → interface React (ver front/README.md)
└── back/           → API Flask (ver back/README.md)
```

Cada subpasta tem seu próprio README com instruções detalhadas de setup. Este documento cobre apenas a **integração entre as duas partes**.

## Contrato da API (fronteira front ↔ back)

Este é o acordo que permite que front e back sejam desenvolvidos e executados de forma independente. Nenhum campo deve ser renomeado, removido ou adicionado sem alinhar as duas equipes.

### `GET /api/turmas`
```json
[{ "id_turma": 1, "nome_turma": "BD-01", "turno": "Manhã" }]
```

### `GET /api/alunos?turma=&nome=`
Parâmetros opcionais: `turma` (id da turma) e `nome` (busca parcial).
```json
[{
  "nome": "Adriana Nogueira",
  "email": "adriana.nogueira1@email.com",
  "nome_turma": "BD-01",
  "turno": "Manhã",
  "data_matricula": "2026-01-02",
  "nota1": 6.5, "nota2": 6.5, "nota3": 5.8, "media": 6.27
}]
```

## Como executar o sistema completo

**1. Banco de dados**
- MySQL rodando localmente
- Importar `escola_db.sql` (repositório do professor, pasta `base/`)
- Validar: `SELECT COUNT(*) FROM alunos;` → deve retornar 70

**2. Back-end** (porta `5000`)
```bash
cd back
python -m venv venv
source venv/bin/activate      # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
cp .env.example .env           # preencher com a senha do seu MySQL
python app.py
```
Testar: `http://localhost:5000/api/turmas` deve retornar JSON.

**3. Front-end** (porta `5173`)
```bash
cd front
npm install
npm run dev
```
Acessar: `http://localhost:5173`

**Ordem de execução:** o back precisa estar rodando antes do front carregar os dados (o front faz `fetch` ao montar a página). Se o back não estiver no ar, a tabela aparece vazia.

## Estratégia de desenvolvimento (mock-first)

O front foi desenvolvido de forma independente do back, usando arquivos mock (`front/src/data/*.json`) gerados a partir da própria base `escola_db`, no formato exato do contrato acima. Isso permitiu que front e back trabalhassem em paralelo sem bloqueio mútuo. A integração final consistiu em trocar a leitura dos mocks por chamadas `fetch` reais — nenhuma lógica de exibição, filtro ou ordenação precisou ser alterada.

## Pontos de integração testados

- [ ] Back-end sobe sem erro e responde nos dois endpoints
- [ ] Front-end carrega a lista completa de alunos ao abrir a página
- [ ] Filtro por turma reflete dados reais do banco (não hardcoded)
- [ ] Busca por nome funciona com dados reais
- [ ] CORS não bloqueia as requisições (testado em navegador, não só via Insomnia/curl)
- [ ] Aplicação testada em máquina diferente da de desenvolvimento (ver `infra/como-executar.md`)

## Documentação relacionada

- `front/README.md` — detalhes da interface, componentes e decisões de UI
- `back/README.md` — endpoints, query principal, decisões de segurança
- `sql/consultas.sql` — todas as queries SQL usadas no projeto, comentadas
- `der/` — diagrama entidade-relacionamento da base
- `infra/como-executar.md` — roteiro de subida do ambiente completo