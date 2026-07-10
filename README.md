# Projeto Integrador — Banco de Dados e SQL

Repositório oficial do projeto integrador da disciplina de Banco de Dados e SQL.

A proposta deste projeto é colocar em prática os conhecimentos estudados até a Aula 7, especialmente modelagem relacional, estruturação de banco, consultas SQL, filtros, agrupamentos, `JOINs` e subconsultas. A apostila do módulo prevê justamente um momento de projeto prático e revisão com base em um sistema acadêmico relacional.

## Objetivo do projeto

Cada grupo deverá desenvolver uma aplicação web conectada à base `escola_db`, com foco em consulta de dados acadêmicos.

A aplicação deverá exibir, no mínimo:

- Nome do aluno;
- E-mail;
- Turma à qual pertence;
- Data da matrícula;
- Notas;
- Média final.

A aplicação deverá permitir, no mínimo:

- Filtrar os alunos por turma;
- Pesquisar por nome do aluno.

Como recurso opcional, o grupo poderá implementar:

- Busca por matrícula;
- Busca por e-mail;
- Melhorias visuais;
- Ordenação;
- Publicação online.

## Estrutura do repositório

```text
.
├── docs/
├── base/
└── entregas/
    ├── noturno/
    │   ├── grupo-01/
    │   ├── grupo-02/
    │   ├── grupo-03/
    │   └── grupo-04/
    └── vespertino/
        ├── grupo-01/
        ├── grupo-02/
        ├── grupo-03/
        └── grupo-04/
```

## Função de cada pasta

### `docs/`
Contém os documentos orientadores do projeto, incluindo o enunciado em formato de solicitação do Product Owner.

### `base/`
Contém o arquivo SQL da base `escola_db` que deverá ser utilizada no projeto.

### `entregas/noturno/`
Contém exclusivamente as entregas dos grupos da turma do noturno.

### `entregas/vespertino/`
Contém exclusivamente as entregas dos grupos da turma do vespertino.

## Como cada grupo deve trabalhar

1. Fazer um fork deste repositório.
2. Ler os documentos disponíveis na pasta `docs/`.
3. Importar a base de dados disponível na pasta `base/`.
4. Desenvolver a aplicação web do grupo.
5. Organizar os arquivos dentro da pasta correspondente ao turno e ao grupo.
6. Enviar ou apresentar o repositório final conforme orientação do professor.

## Organização sugerida para cada grupo

Dentro da pasta do grupo, recomenda-se a seguinte estrutura:

```text
grupo-01/
├── app/
├── sql/
├── der/
├── docs/
└── infra/
```

### `app/`
Arquivos da aplicação, front-end, back-end e instruções para execução.

### `sql/`
Script do banco, consultas SQL principais e eventuais ajustes realizados pelo grupo.

### `der/`
Diagrama Entidade-Relacionamento utilizado pelo grupo, em imagem ou PDF.

### `docs/`
Documento com os integrantes da equipe e a divisão de responsabilidades.

### `infra/`
Informações sobre publicação, servidor, ambiente, hospedagem, comandos ou prints de deploy.

## Entregáveis obrigatórios

Cada grupo deverá apresentar:

- Aplicação web funcionando;
- Código-fonte;
- Script SQL utilizado;
- DER da base utilizada;
- Documento com integrantes e funções;
- Explicação breve sobre a publicação da aplicação.

## Divisão de responsabilidades

O grupo deverá informar claramente quem ficou responsável por cada frente:

- Desenvolvimento: aplicação, interface, código e integração;
- Banco de dados: DER, modelagem, SQL e consultas;
- Infraestrutura: ambiente, publicação e disponibilização da aplicação.

## Apresentação

Cada grupo terá até **15 minutos** para apresentar sua solução no dia **07/07, terça-feira**.

Sugestão de divisão da apresentação:

- 3 minutos: problema e proposta da solução;
- 4 minutos: demonstração da aplicação;
- 4 minutos: banco de dados, DER e SQL;
- 2 minutos: infraestrutura e publicação;
- 2 minutos: equipe e responsabilidades.

## Critérios de avaliação

Serão observados aspectos como:

- Funcionamento da aplicação;
- Clareza da interface;
- Correção das consultas SQL;
- Coerência entre banco e DER;
- Organização dos arquivos;
- Divisão das responsabilidades;
- Qualidade da apresentação.

## Observação final

Este projeto busca aproximar a disciplina de Banco de Dados da prática real de desenvolvimento de sistemas, mostrando como uma necessidade de negócio pode ser transformada em solução por uma equipe composta por desenvolvimento, banco de dados e infraestrutura.
