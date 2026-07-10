# Relatório de aderência ao enunciado do projeto integrador

## Escopo

Este relatório compara o estado atual do repositório com os requisitos oficiais informados pelo professor/PO, com base em leitura direta dos arquivos e em teste do backend.

> Observação: a checagem do frontend foi feita por análise do código; não houve execução visual do navegador para validar a interface em tempo real.

## Checklist item a item

| #   | Requisito                                                                          | Status        | Evidência                                                                                                                                                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Aplicação web funcional conectada a um banco de dados relacional                   | ⚠️ PARCIAL    | O backend está funcional e conecta ao PostgreSQL via Prisma em [grupo-01/app/backend/server.js](grupo-01/app/backend/server.js), mas o frontend ainda usa dados estáticos de [grupo-01/app/frontend/src/data/mockData.js](grupo-01/app/frontend/src/data/mockData.js) em [grupo-01/app/frontend/src/App.jsx](grupo-01/app/frontend/src/App.jsx).                |
| 2   | Uso da base escola_db (estrutura e dados originais preservados)                    | ✅ ATENDE     | O projeto usa o banco chamado escola_db via [grupo-01/app/backend/.env](grupo-01/app/backend/.env) e o schema Prisma mapeia as tabelas em [grupo-01/app/backend/prisma/schema.prisma](grupo-01/app/backend/prisma/schema.prisma). O script SQL está em [grupo-01/sql/escola_db_postgres.sql](grupo-01/sql/escola_db_postgres.sql).                              |
| 3   | Consulta de dados REAIS do banco (não mock, não hardcoded)                         | ⚠️ PARCIAL    | O backend consulta o banco via Prisma na rota GET /api/alunos em [grupo-01/app/backend/server.js](grupo-01/app/backend/server.js), e o teste HTTP retornou nomes reais como Adriana Nogueira, Alan Ribeiro e Aline Batista. No entanto, o frontend continua consumindo dados de mock em [grupo-01/app/frontend/src/App.jsx](grupo-01/app/frontend/src/App.jsx). |
| 4   | Exibir para cada aluno: nome, e-mail, turma, data da matrícula, notas, média final | ✅ ATENDE     | A tela de alunos renderiza estes campos em [grupo-01/app/frontend/src/components/StudentsTable.jsx](grupo-01/app/frontend/src/components/StudentsTable.jsx) e [grupo-01/app/frontend/src/components/StudentCards.jsx](grupo-01/app/frontend/src/components/StudentCards.jsx).                                                                                   |
| 5   | Filtrar alunos por turma                                                           | ✅ ATENDE     | O componente [grupo-01/app/frontend/src/components/FiltersBar.jsx](grupo-01/app/frontend/src/components/FiltersBar.jsx) possui seletor de turma, e a lógica de filtro está em [grupo-01/app/frontend/src/components/StudentsPage.jsx](grupo-01/app/frontend/src/components/StudentsPage.jsx).                                                                   |
| 6   | Pesquisar aluno por nome                                                           | ✅ ATENDE     | O campo de busca por nome existe em [grupo-01/app/frontend/src/components/FiltersBar.jsx](grupo-01/app/frontend/src/components/FiltersBar.jsx) e a filtragem é aplicada em [grupo-01/app/frontend/src/components/StudentsPage.jsx](grupo-01/app/frontend/src/components/StudentsPage.jsx).                                                                      |
| 7   | Apresentação do DER da base utilizada                                              | ✅ ATENDE     | Existe um diagrama da base em [grupo-01/der/modelorelacional.png](grupo-01/der/modelorelacional.png).                                                                                                                                                                                                                                                           |
| 8   | Apresentação da divisão de responsabilidades da equipe                             | ❌ NÃO ATENDE | O arquivo [grupo-01/docs/integrantes-e-funcoes.md](grupo-01/docs/integrantes-e-funcoes.md) existe, mas está vazio.                                                                                                                                                                                                                                              |
| 9   | Não é obrigatório: cadastro, edição ou exclusão de registros                       | ✅ ATENDE     | Como item não obrigatório, a ausência de CRUD não impede a entrega.                                                                                                                                                                                                                                                                                             |
| 10  | Busca por e-mail                                                                   | ✅ ATENDE     | Existe filtro avançado por e-mail em [grupo-01/app/frontend/src/components/FiltersBar.jsx](grupo-01/app/frontend/src/components/FiltersBar.jsx) e [grupo-01/app/frontend/src/components/StudentsPage.jsx](grupo-01/app/frontend/src/components/StudentsPage.jsx).                                                                                               |
| 11  | Busca por matrícula                                                                | ✅ ATENDE     | Existe filtro avançado por matrícula em [grupo-01/app/frontend/src/components/FiltersBar.jsx](grupo-01/app/frontend/src/components/FiltersBar.jsx) e [grupo-01/app/frontend/src/components/StudentsPage.jsx](grupo-01/app/frontend/src/components/StudentsPage.jsx).                                                                                            |
| 12  | Interface responsiva                                                               | ⚠️ PARCIAL    | Há estilos com regras de responsividade em [grupo-01/app/frontend/src/styles/global.css](grupo-01/app/frontend/src/styles/global.css), mas não há verificação visual confirmada neste ambiente.                                                                                                                                                                 |
| 13  | Ordenação dos resultados                                                           | ⚠️ PARCIAL    | Há ordenação no backend para a listagem padrão em [grupo-01/app/backend/server.js](grupo-01/app/backend/server.js), mas a interface não aplica ordenação explícita aos resultados exibidos.                                                                                                                                                                     |
| 14  | Destaque visual para médias aprovadas/reprovadas                                   | ✅ ATENDE     | Os componentes [grupo-01/app/frontend/src/components/StudentsTable.jsx](grupo-01/app/frontend/src/components/StudentsTable.jsx) e [grupo-01/app/frontend/src/components/StudentCards.jsx](grupo-01/app/frontend/src/components/StudentCards.jsx) aplicam classes visuais para média aprovada/reprovada.                                                         |
| 15  | Publicação em servidor ou nuvem                                                    | ❌ NÃO ATENDE | Não há evidência de publicação em servidor ou nuvem nos arquivos do repositório.                                                                                                                                                                                                                                                                                |
| 16  | grupo-01/app/ — aplicação (frontend + backend)                                     | ✅ ATENDE     | A pasta [grupo-01/app](grupo-01/app) existe com frontend e backend.                                                                                                                                                                                                                                                                                             |
| 17  | grupo-01/sql/ — script do banco e consultas                                        | ✅ ATENDE     | A pasta [grupo-01/sql](grupo-01/sql) existe com o script SQL.                                                                                                                                                                                                                                                                                                   |
| 18  | grupo-01/der/ — diagrama entidade-relacionamento                                   | ✅ ATENDE     | A pasta [grupo-01/der](grupo-01/der) existe.                                                                                                                                                                                                                                                                                                                    |
| 19  | grupo-01/docs/ — integrantes e divisão de responsabilidades                        | ✅ ATENDE     | A pasta [grupo-01/docs](grupo-01/docs) existe, embora o conteúdo ainda esteja incompleto.                                                                                                                                                                                                                                                                       |
| 20  | grupo-01/infra/ — informações de publicação/execução                               | ✅ ATENDE     | A pasta [grupo-01/infra](grupo-01/infra) existe.                                                                                                                                                                                                                                                                                                                |

## A) Tabela resumo

| Item | Status        | Evidência resumida                                                         |
| ---- | ------------- | -------------------------------------------------------------------------- |
| 1    | ⚠️ PARCIAL    | Backend conectado ao banco, mas frontend ainda usa mock.                   |
| 2    | ✅ ATENDE     | Banco escola_db configurado e schema Prisma presente.                      |
| 3    | ⚠️ PARCIAL    | Backend retorna dados reais, mas a interface ainda não consome essa fonte. |
| 4    | ✅ ATENDE     | UI exibe nome, e-mail, turma, data, notas e média.                         |
| 5    | ✅ ATENDE     | Filtro por turma implementado na interface.                                |
| 6    | ✅ ATENDE     | Busca por nome implementada.                                               |
| 7    | ✅ ATENDE     | DER disponível como imagem.                                                |
| 8    | ❌ NÃO ATENDE | Documento de equipe está vazio.                                            |
| 9    | ✅ ATENDE     | CRUD não é obrigatório.                                                    |
| 10   | ✅ ATENDE     | Busca por e-mail disponível.                                               |
| 11   | ✅ ATENDE     | Busca por matrícula disponível.                                            |
| 12   | ⚠️ PARCIAL    | Há tentativa de responsividade, mas sem validação visual completa.         |
| 13   | ⚠️ PARCIAL    | Há ordenação parcial no backend, não na UI.                                |
| 14   | ✅ ATENDE     | Destaque visual para média aprovado/reprovado.                             |
| 15   | ❌ NÃO ATENDE | Sem publicação em nuvem/servidor.                                          |
| 16   | ✅ ATENDE     | Estrutura da aplicação presente.                                           |
| 17   | ✅ ATENDE     | Estrutura de SQL presente.                                                 |
| 18   | ✅ ATENDE     | Estrutura DER presente.                                                    |
| 19   | ✅ ATENDE     | Estrutura docs presente.                                                   |
| 20   | ✅ ATENDE     | Estrutura infra presente.                                                  |

## B) Veredito geral

O projeto ATENDE PARCIALMENTE ao mínimo obrigatório para apresentação amanhã, porque há backend e dados reais no banco, mas a interface ainda não está conectada ao backend e a documentação de equipe está incompleta.

## C) Ações restantes

### Prioridade alta (obrigatórios)

1. Conectar o frontend ao backend real para que a tela de alunos consuma /api/alunos em vez de [grupo-01/app/frontend/src/data/mockData.js](grupo-01/app/frontend/src/data/mockData.js). Estimativa: 1-2 horas.
2. Preencher o documento de divisão de responsabilidades em [grupo-01/docs/integrantes-e-funcoes.md](grupo-01/docs/integrantes-e-funcoes.md). Estimativa: 30-45 minutos.
3. Ajustar a apresentação do DER e da execução/implantação para demonstrar o fluxo completo de forma clara. Estimativa: 30 minutos.

### Não bloqueiam a entrega

- Implementar busca por e-mail/matrícula já está presente na interface; pode ser refinada se quiser.
- Melhorar responsividade visual.
- Adicionar ordenação mais explícita na interface.
- Adicionar destaque visual mais refinado para médias.
- Publicar em servidor ou nuvem.

## D) Conclusão

Para apresentação amanhã, o ponto mais crítico é a integração do frontend com o backend real. O restante já está bem encaminhado, mas a entrega fica mais convincente se a tela de alunos mostrar dados do banco e não dos mocks.
