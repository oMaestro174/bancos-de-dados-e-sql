### `app/`

# Sistema de Consulta do Projeto Integrador - Escola_DB

Esta aplicação web, desenvolvida com **Streamlit**, **Python** e **MySQL**, permite a consulta de dados acadêmicos conectados ao banco de dados `escola_db`.

## Funcionalidades
O sistema permite realizar as seguintes operações:
- Exibição de dados: Nome do aluno, E-mail, Turma, Data de matrícula, Notas e Média final.
- Filtrar alunos por turma.
- Pesquisar alunos por nome.

## Tecnologias e Dependências
Para rodar este projeto, garantimos a utilização das seguintes bibliotecas:
* **Interface**: `streamlit`
* **Backend/API**: `fastapi`, `uvicorn`
* **Banco de Dados**: `HeidiSQL`
* **Validação de Dados**: `pydantic`

## Como Executar
Para rodar a aplicação em sua máquina local, siga os passos abaixo:

1. **Pré-requisitos:**
   - Python instalado.
   - Bibliotecas necessárias instaladas (`pip install -r requirements.txt`).

2. **Configuração do Banco:**
   - Certifique-se de que o arquivo do banco de dados `escola_db` está acessível conforme as configurações do projeto.

3. **Execução:**
   ```bash
   streamlit run app.py