# Projeto Integrador - Consulta de Alunos Matriculados (`escola_db`)

## Identificação

- **Nome completo:** Amanda Karolina Vasques Nascimento
- **Turno:** Noturno
- **Instituição:** ITEAM (Boa Vista / RR)
- **Professor:** Janei Vieira Pereira
- **Módulo:** Capacitação em Desenvolvimento Full Stack (Banco de Dados e SQL)

---

## 1. Objetivo do Projeto

Desenvolver uma aplicação web para consultar os alunos matriculados no banco de dados `escola_db`, permitindo visualizar seus dados pessoais, turma, data da matrícula, notas e média final.

A aplicação também permite pesquisar alunos pelo nome e filtrar os resultados por turma.

## 2. Tecnologias Utilizadas

- **Banco de dados:** MySQL
- **Gerenciador:** HeidiSQL
- **Backend:** Node.js e Express
- **Conexão com banco:** mysql2
- **Configuração:** dotenv
- **Frontend:** HTML5, CSS3 e JavaScript
- **Comunicação:** Fetch API

## 3. Funcionalidades

- Listagem dos alunos matriculados.
- Exibição de nome e e-mail.
- Exibição da turma e data da matrícula.
- Exibição das três notas e média final.
- Pesquisa de alunos pelo nome.
- Filtro de alunos por turma.

## 4. Estrutura do Projeto

```text
amanda-karolina/
├── README.md
├── app/
│   ├── public/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── sql/
│   └── consultas.sql
└── der/
    └── der_escola_db.png
```

## 5. Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- MySQL instalado e funcionando.
- Banco de dados `escola_db` importado no MySQL.

### Configuração do banco de dados

1. Abra o HeidiSQL.
2. Importe o arquivo `base/escola_db.sql`.
3. Verifique se o banco `escola_db` está disponível.

### Configuração da aplicação

1. Abra a pasta `app` no terminal.
2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com os dados de conexão do seu MySQL, seguindo as variáveis utilizadas no `server.js`.

4. Inicie o servidor:

```bash
npm start
```

5. Acesse a aplicação pelo navegador:

```text
http://localhost:3000
```

## 6. Consultas SQL

Foi criada a view `vw_boletim_escolar`, responsável por reunir os dados dos alunos, matrículas, turmas, cursos e notas.

A aplicação utiliza essa view para apresentar as informações do boletim escolar.

Também foi criada uma consulta para listar as turmas disponíveis no filtro da aplicação.

## 7. Diagrama Entidade-Relacionamento (DER)

O projeto contém o diagrama entidade-relacionamento do banco de dados `escola_db`, localizado na pasta `der`.

---

**Projeto desenvolvido individualmente como atividade do Módulo 09 - Banco de Dados e SQL.**