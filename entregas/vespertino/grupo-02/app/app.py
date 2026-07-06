import streamlit as st
import mysql.connector

# O cache evita que o Streamlit reconecte ao banco a cada atualização da página
@st.cache_resource
def iniciar_conexao():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="sua_senha",
        database="seu_banco"
    )

conexao = iniciar_conexao()

# Exemplo de consulta
cursor = conexao.cursor(dictionary=True)
cursor.execute("SELECT * FROM sua_tabela LIMIT 5")
dados = cursor.fetchall()

# Interface visual
st.title("Meu Painel com MySQL")
st.write("Dados da tabela:")
st.dataframe(dados) # Cria uma tabela interativa automaticamente