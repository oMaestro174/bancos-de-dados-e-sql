
# Consulta de Alunos Matriculados

## Sobre o projeto

Este projeto foi desenvolvido como atividade do Módulo 09 – Banco de Dados e SQL, do curso de Capacitação em Desenvolvimento Full Stack.

O sistema permite consultar alunos matriculados, exibindo informações como nome, e-mail, turma, data da matrícula, notas e média final.

Também permite filtrar os resultados pelo nome do aluno e pela turma.

## Tecnologias utilizadas

- Python
- Flask
- MySQL
- HTML
- CSS

## Estrutura do projeto

```text
lidia-yoko/
├── README.md
├── app/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   ├── templates/
│   │   └── index.html
│   └── static/
│       └── style.css
├── sql/
└── der/
```

## Banco de dados

O projeto utiliza o banco de dados `escola_db`, criado em MySQL.

Para configurar o banco, execute o script SQL disponibilizado na pasta `sql`.

## Configuração e execução

1. Instale o Python.
2. Instale as dependências:

```bash
pip install -r app/requirements.txt
```

3. Configure as variáveis de conexão com o banco de dados em um arquivo `.env` dentro da pasta `app`:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
```

4. Execute o aplicativo a partir da pasta `app`:

```bash
python app.py
```

5. Abra o endereço abaixo no navegador:

```text
http://127.0.0.1:5000
```

## Autoria

Projeto desenvolvido individualmente por Lidia Yoko.

Curso: Capacitação em Desenvolvimento Full Stack  
Módulo: 09 – Banco de Dados e SQL
