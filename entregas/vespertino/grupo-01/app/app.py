from flask import Flask, request, render_template  # render_template monta as paginas
from db import conectar # conexao com o banco
import queries #consultas SQL 

app = Flask(__name__)


# Funcao aux, roda um SQL e devolve o resultado como lista de dicionarios
#necessario para separar a logica de consulta do resto do app, para nao misturar
def consultar(sql, params=None):
    conexao = conectar()
    try:
        with conexao.cursor() as cursor:
            cursor.execute(sql, params or ())
            return cursor.fetchall()
    finally:
        conexao.close()   # fecha a conexao sempre, mesmo se der erro


# rota principal, mostra o HTML da capa 
@app.route("/")
def inicio():
    return render_template("index.html")


# consulta de alunos
@app.route("/consulta")
def consulta():
    # le os filtros; se o campo veio vazio, fica None e nao filtra
    turma     = request.args.get("turma")
    nome      = request.args.get("nome")
    email     = request.args.get("email")
    matricula = request.args.get("matricula")
    ordenar   = request.args.get("ordenar")

    # comeca da consulta base e vai colando so os filtros preenchidos
    sql = queries.listar_alunos
    params = []

    if turma:
        sql += queries.filtro_turma
        params.append(turma)

    if nome:
        sql += queries.filtro_nome
        params.append(f"%{nome}%")   # nomes que contem o texto

    if email:
        sql += queries.filtro_email
        params.append(f"%{email}%")

    if matricula:
        sql += queries.filtro_matricula
        params.append(matricula)

    # ordenacao s
    if ordenar == "media":
        sql += queries.ordenar_alunos_media
    elif ordenar == "data":
        sql += queries.ordenar_alunos_data
    else:
        sql += queries.ordenar_alunos_nome   # padrao: ordem alfabetica por nome

    alunos = consultar(sql, params)

    # entrega a lista para a pagina; la o {% for aluno in alunos %} desenha a tabela
    return render_template("banco_de_dados.html", alunos=alunos)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
