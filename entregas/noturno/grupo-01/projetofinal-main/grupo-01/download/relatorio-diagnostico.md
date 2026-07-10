# Diagnóstico completo — Escola Fullstack

Resumo curto: o repositório está mais próximo de um protótipo frontend do que de uma aplicação fullstack pronta para apresentação. O que já existe com boa base é a interface de consulta, os filtros visuais e um DER. O que ainda falta de forma crítica é a camada de backend, o schema Prisma, a conexão real com o Supabase e os dados vindos do banco.

---

## 1. Estrutura do projeto

### Árvore atual do repositório

- README.md
- grupo-01/README.md
- grupo-01/app/frontend/package.json
- grupo-01/app/frontend/index.html
- grupo-01/app/frontend/vite.config.js
- grupo-01/app/frontend/src
  - grupo-01/app/frontend/src/App.jsx
  - grupo-01/app/frontend/src/components
  - grupo-01/app/frontend/src/data/mockData.js
  - grupo-01/app/frontend/src/styles/global.css
  - grupo-01/app/frontend/src/utils
- grupo-01/sql/consultas.sql
- grupo-01/der/modelorelacional.png
- grupo-01/docs/integrantes-e-funcoes.md
- grupo-01/infra/publicacao.md

### O que está de acordo com a estrutura esperada

- ✅ A pasta grupo-01/app existe.
- ✅ A pasta grupo-01/sql existe.
- ✅ A pasta grupo-01/der existe.
- ✅ A pasta grupo-01/docs existe.
- ✅ A pasta grupo-01/infra existe.

### O que está faltando ou fora do lugar

- ❌ Não existe backend dentro de grupo-01/app; só há frontend.
- ❌ Não existe arquivo Prisma schema, nem pasta de migrations.
- ❌ Não existe arquivo de configuração de ambiente com conexão ao banco.
- ❌ O frontend está consumindo dados mockados, não uma API real.
- ⚠️ A documentação de publicação está presente, mas vazia em grupo-01/infra/publicacao.md.

---

## 2. Banco de dados / Prisma

- [ ] Schema Prisma: ❌ faltando
  - Não existe um arquivo Prisma schema no repositório.
  - Não há modelos definidos para professores, cursos, turmas, alunos, matriculas e notas.

- [ ] Reflexo das 6 tabelas e relacionamentos: ❌ faltando
  - Não há schema Prisma nem DDL completo para validar as tabelas e FKs.
  - O que existe é um arquivo de consultas em grupo-01/sql/consultas.sql, mas ele não define a estrutura do banco.

- [ ] Conexão com Supabase via variável de ambiente: ❌ faltando
  - Não foi encontrado arquivo de ambiente com a variável de conexão.
  - Não há evidência de configuração de DATABASE_URL no repositório.

- [ ] Migrations rodadas e dados importados: ❌ faltando
  - Não há pasta de migrations.
  - Não há script de seed/import.
  - Não há evidência de que o banco no Supabase já esteja populated com os dados do projeto.

- [ ] Compatibilidade entre Prisma e SQL original: ⚠️ parcial
  - O SQL existente usa nomes como alunos, turmas, matriculas, notas e cursos, o que é compatível com o modelo esperado.
  - Porém, não existe o schema real que permita comparar tipos, colunas, nulabilidade e FKs de forma confiável.
  - O maior problema é a ausência completa da implementação do banco, não uma incompatibilidade pontual.

---

## 3. Backend (Express)

- [ ] Rotas existentes: ❌ faltando
  - Não existe backend Express no projeto atual.
  - Não há servidor, nem rotas, nem handlers HTTP.

- [ ] Rota com dados combinados de aluno + turma + matrícula + notas: ❌ faltando
  - Não existe endpoint que faça join entre as entidades e devolva os dados pedidos pelo PO.

- [ ] Suporte a query params para filtro por turma e busca por nome: ❌ faltando
  - Não existe backend para receber e processar filtros.

- [ ] Tratamento de erro e status codes: ❌ faltando
  - Como não existe backend, também não existe camada de erro HTTP consistente.

- [ ] Rotas de escrita (POST/PUT/DELETE): ✅ não aplicável/ausente
  - Não existem rotas de escrita no repositório.
  - Isso não é um bug, mas sinaliza que o backend ainda não foi implementado.

> Observação importante: a aplicação atual é apenas um frontend com dados locais, sem integração com API.

---

## 4. Frontend (React)

- [ ] Componentes/páginas existentes: ✅ feito
  - Há uma tela principal com grupo-01/app/frontend/src/App.jsx e componentes como:
    - grupo-01/app/frontend/src/components/StudentsPage.jsx
    - grupo-01/app/frontend/src/components/FiltersBar.jsx
    - grupo-01/app/frontend/src/components/StudentsTable.jsx
    - grupo-01/app/frontend/src/components/StudentCards.jsx
    - grupo-01/app/frontend/src/components/ClassesPage.jsx
    - grupo-01/app/frontend/src/components/LoginPage.jsx
    - grupo-01/app/frontend/src/components/StudentModal.jsx

- [ ] Tela de listagem de alunos consumindo a API: ❌ faltando
  - Existe a tela de listagem, mas ela consome dados mockados em grupo-01/app/frontend/src/data/mockData.js.
  - Não há integração real com backend.

- [ ] Filtros por turma e busca por nome: ⚠️ parcial
  - A interface existe e funciona localmente no frontend.
  - Porém, ela opera sobre dados estáticos, não sobre uma API real.

- [ ] Destaque visual de média aprovado/reprovado: ✅ feito
  - A UI já aplica destaque visual para média, com classes de aprovado/reprovado em grupo-01/app/frontend/src/components/StudentsTable.jsx e grupo-01/app/frontend/src/components/StudentCards.jsx.

- [ ] Estados de loading e “nenhum resultado encontrado”: ✅ feito
  - Há componentes de loading e empty state em grupo-01/app/frontend/src/components/LoadingRows.jsx e grupo-01/app/frontend/src/components/EmptyState.jsx.

- [ ] Layout responsivo: ✅ feito
  - O CSS em grupo-01/app/frontend/src/styles/global.css já inclui breakpoints responsivos.

> Verificação técnica: o frontend compila corretamente após instalar dependências com npm install e rodar npm run build.

---

## 5. Gaps críticos para amanhã (07/07)

### Obrigatório até amanhã

1. Implementar o backend mínimo com Express e uma rota de consulta de alunos.
2. Definir o schema Prisma e criar as tabelas no banco do Supabase.
3. Conectar o frontend à API real e remover o uso de dados mockados.
4. Garantir que a listagem mostre: nome, e-mail, turma, data da matrícula, notas e média final.
5. Implementar filtro por turma e busca por nome no backend/frontend de forma funcional.
6. Validar o fluxo completo com dados reais antes da apresentação.

### Seria bom ter, mas não é obrigatório

- Busca por e-mail ou matrícula.
- Ordenação dos resultados.
- Publicação em nuvem.
- Refinamentos visuais extras.

> Se o tempo estiver curto, o melhor caminho é entregar uma versão simples, estável e 100% funcional do fluxo principal de consulta, em vez de tentar implementar recursos extras.

---

## 6. Riscos técnicos

- ⚠️ Falta completa de backend e Prisma, então a aplicação não atende ao requisito de “conectada ao banco” no estado atual.
- ⚠️ Não há configuração de ambiente com DATABASE_URL, então a conexão com o Supabase não funcionará sem esse passo.
- ⚠️ Sem migrations e seed/import, o banco pode estar vazio ou inconsistente na hora da demonstração.
- ⚠️ O frontend atualmente depende de dados mockados, então a apresentação pode parecer visualmente boa, mas não será uma demonstração real do banco.
- ⚠️ Se a máquina do apresentador não tiver dependências instaladas, o frontend pode falhar até rodar npm install.
- ⚠️ Quando o frontend começar a consumir um backend real, será preciso cuidar de CORS e da URL base da API.
- ⚠️ A presença de elementos de cadastro/edição no protótipo pode confundir a apresentação, porque o PO pediu uma aplicação só de consulta.

---

## Conclusão objetiva

O projeto está em um estado de protótipo frontend com boa interface, mas ainda não está pronto para cumprir o escopo obrigatório do PO. O trabalho mais urgente é transformar a aplicação de mock para uma aplicação real com backend, banco, Prisma e conexão ao Supabase.
