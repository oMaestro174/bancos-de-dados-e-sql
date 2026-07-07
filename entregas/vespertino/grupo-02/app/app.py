import streamlit as st
import requests
import pandas as pd

st.title("Sistema de Consulta do Projeto Integrador - Escola_DB")

@st.cache_data
def carregar_dados():
    try:
        response = requests.get("http://127.0.0.1:8000/alunos")
        response.raise_for_status()
        return pd.DataFrame(response.json())
    except:
        st.error("Erro ao conectar com a API FastAPI.")
        return pd.DataFrame()

df = carregar_dados()

if not df.empty:
    st.sidebar.header("Filtros de Busca")
    
    # 1. Filtro por Turma usando o alias 'nomeDaTurma'
    turmas_disponiveis = ["Todas"] + list(df["nomeDaTurma"].unique())
    turma_selecionada = st.sidebar.selectbox("Filtrar por Turma:", turmas_disponiveis)
    
    # 2. Pesquisa por Nome
    busca_nome = st.sidebar.text_input("Pesquisar por Nome:")

    # Aplicando os filtros no DataFrame
    if turma_selecionada != "Todas":
        df = df[df["nomeDaTurma"] == turma_selecionada]
    
    if busca_nome:
        # Busca usando o alias 'nome'
        df = df[df["nome"].str.contains(busca_nome, case=False, na=False)]

    # Renomeando as colunas retornadas pelos aliases do modelo
    df_exibicao = df.rename(columns={
        "nome": "Nome",
        "email": "E-mail",
        "nomeDaTurma": "Turma",
        "dataDaMatricula": "Data da Matrícula",
        "primeiraNota": "Nota 1",
        "segundaNota": "Nota 2",
        "terceiraNota": "Nota 3",
        "mediaDasNotas": "Média Final"
    })

    # Exibindo os dados na tela
    st.dataframe(df_exibicao, hide_index=True)
else:
    st.warning("Nenhum aluno encontrado.")