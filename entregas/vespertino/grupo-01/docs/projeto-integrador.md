# Documento de Projeto Integrador — Simulação de Solicitação do Product Owner

## Capacitação em Desenvolvimento Full Stack

## Módulo 09 — Banco de Dados e SQL

## Professor: Janei Vieira Pereira

# 1 Introdução

Este documento simula uma situação próxima ao contexto profissional, na qual uma necessidade de negócio é apresentada por um cliente e traduzida pelo Product Owner para a equipe técnica. A proposta tem como finalidade consolidar os conteúdos estudados até a Aula 7 do módulo de Banco de Dados e SQL, especialmente modelagem relacional, criação de tabelas, consultas SQL, filtros, agrupamentos, junções e subconsultas.

A apostila do módulo organiza a formação em uma sequência que passa por modelo relacional, chaves, integridade, DDL, DML, filtros, agrupamentos, JOINs e subconsultas, chegando depois ao projeto prático e revisão. Isso sustenta muito bem a ideia de encerrar este ciclo com uma aplicação que conecte banco de dados, interface, organização da equipe e publicação do sistema.

# 2 Contexto da solicitação

Uma instituição de ensino deseja uma aplicação web simples para consulta de alunos matriculados. O objetivo é permitir que a coordenação acadêmica visualize, de forma clara, os dados principais dos estudantes já cadastrados em banco, sem a necessidade de realizar novos cadastros nesta etapa.

O cliente não pediu um sistema completo de gestão escolar. A necessidade atual é uma aplicação de consulta, com foco na exibição organizada dos dados e em filtros úteis para o uso do dia a dia.

# 3 Visão do Product Owner

A seguir está a forma como o Product Owner traduz a necessidade do cliente para a equipe.

## 3.1 Problema de negócio

Atualmente, os dados acadêmicos estão no banco, mas não há uma interface simples para consulta rápida por parte da coordenação. Isso dificulta a visualização dos alunos matriculados, suas turmas e seu desempenho.

## 3.2 Objetivo do produto

Desenvolver uma aplicação web que exiba os alunos matriculados utilizando a base `escola_db`, permitindo consulta rápida por nome, e-mail, matrícula e turma.

## 3.3 Resultado esperado

Ao final do projeto, cada grupo deverá apresentar uma aplicação funcional que consulte os dados existentes e demonstre, de forma prática, a aplicação dos conhecimentos estudados em banco de dados até a Aula 7, incluindo estrutura relacional, SQL de consulta e integração com uma interface web.

# 4 Solicitação funcional para a equipe

A equipe deverá desenvolver uma aplicação web, na linguagem escolhida pelo grupo, que exiba os alunos matriculados na base `escola_db`.

A aplicação deverá exibir, no mínimo, os seguintes dados:

- Nome do aluno;
- E-mail;
- Turma à qual pertence;
- Data da matrícula;
- Notas do aluno;
- Média final.

A aplicação deverá permitir, no mínimo:

- Filtrar os alunos por turma;
- Pesquisar aluno por nome;
- Opcionalmente pesquisar por matrícula ou e-mail.

Não será obrigatório implementar cadastro de novos alunos, novas turmas ou edição de registros. Contudo, o grupo poderá incluir funcionalidades extras como diferencial.

# 5 Escopo do projeto

## 5.1 Itens obrigatórios

- Aplicação web funcional conectada ao banco de dados;
- Uso da base `escola_db`;
- Consulta de dados reais da base;
- Filtro por turma;
- Busca por nome do aluno;
- Exibição de notas e média final;
- Apresentação do DER utilizado;
- Apresentação da divisão de responsabilidades da equipe;
- Apresentação oral de até 15 minutos no dia 07/07, terça-feira.


## 5.2 Itens opcionais

- Busca por e-mail;
- Busca por matrícula;
- Interface responsiva;
- Ordenação dos resultados;
- Destaque visual para médias aprovadas e baixas;
- Publicação em servidor ou ambiente em nuvem.


# 6 Papéis da equipe

Cada grupo deverá informar claramente quem ficou responsável por cada frente de trabalho.

## 6.1 Equipe de desenvolvimento

Responsável por:

- Construção da aplicação web;
- Interface do usuário;
- Integração entre aplicação e banco;
- Implementação dos filtros e pesquisas;
- Apresentação do código-fonte.


## 6.2 Equipe de banco de dados

Responsável por:

- Estrutura do banco de dados utilizada;
- Script SQL das tabelas e consultas;
- Explicação do DER;
- Justificativa dos relacionamentos;
- Demonstração das consultas principais usadas pela aplicação.


## 6.3 Equipe de infraestrutura

Responsável por:

- Preparação do ambiente de execução;
- Configuração do servidor local ou remoto;
- Publicação da aplicação;
- Explicação de como a aplicação foi disponibilizada;
- Demonstração do endereço, máquina, container, serviço ou plataforma utilizada.


# 7 Entregáveis

Cada grupo deverá entregar ou apresentar os seguintes itens:

- Aplicação web funcionando;
- Código-fonte do projeto;
- Script SQL utilizado;
- DER da base utilizada no projeto;
- Identificação dos integrantes e suas responsabilidades;
- Explicação breve da arquitetura usada pelo grupo;
- Demonstração de execução da aplicação.


# 8 Critérios de apresentação

Cada grupo terá até 15 minutos para apresentar o projeto no dia 07/07, terça-feira.

Sugestão de divisão do tempo:

- 3 minutos: contexto e proposta da solução;
- 4 minutos: demonstração da aplicação;
- 4 minutos: banco de dados, DER e SQL;
- 2 minutos: infraestrutura e publicação;
- 2 minutos: fechamento e divisão das responsabilidades.


# 9 Critérios de avaliação

A avaliação poderá considerar os seguintes aspectos:

- Funcionamento da aplicação;
- Clareza da interface;
- Correção das consultas SQL;
- Coerência entre DER e banco implementado;
- Organização da equipe;
- Clareza na apresentação;
- Evidência de participação dos diferentes papéis do grupo.


# 10 Mensagem do Product Owner para a equipe

Equipe,

precisamos entregar uma aplicação web simples, funcional e clara para consulta de alunos matriculados. O cliente quer visualizar informações acadêmicas já existentes na base `escola_db`, sem foco em cadastros neste momento. O valor do produto está em permitir consulta rápida, organização dos dados e boa apresentação das informações.

A expectativa é que a solução demonstre integração entre aplicação, banco de dados e ambiente de publicação. Cada área deverá apresentar sua contribuição: desenvolvimento mostrará a aplicação e o código, banco de dados mostrará o DER e o SQL, e infraestrutura explicará como a solução foi disponibilizada para uso.

Mais do que entregar telas, a equipe deve mostrar capacidade de transformar uma necessidade de negócio em solução técnica organizada.

# 11 Orientações finais ao aluno

Esta atividade é uma proposta pedagógica para aproximar o conteúdo de banco de dados da realidade de desenvolvimento de sistemas. A própria apostila prevê, após os conteúdos centrais de SQL, um momento de projeto prático e revisão com base em um sistema acadêmico, envolvendo modelagem, criação de tabelas, inserção de dados e consultas mais elaboradas.

Mesmo sendo uma disciplina de banco de dados, uma aplicação de consulta é coerente com o percurso do módulo, pois permite ao aluno conectar SQL, modelo relacional e uso real dos dados em uma interface. Isso também ajuda a dar sentido ao DER, às consultas com JOIN e ao papel de cada membro da equipe no processo de construção de um sistema.


