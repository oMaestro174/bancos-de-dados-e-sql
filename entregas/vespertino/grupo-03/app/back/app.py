from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

@app.get("/api/turmas")
def turmas():
    con = get_connection()
    cur = con.cursor(dictionary=True)
    cur.execute("SELECT id_turma, nome_turma, turno FROM turmas ORDER BY nome_turma")
    dados = cur.fetchall()
    cur.close()
    con.close()
    return jsonify(dados)

@app.get("/api/alunos")
def alunos():
    turma = request.args.get("turma")
    nome = request.args.get("nome", "")

    sql = """
        SELECT a.nome, a.email, t.nome_turma, t.turno,
               m.data_matricula, n.nota1, n.nota2, n.nota3, n.media
        FROM alunos a
        JOIN matriculas m ON m.id_aluno = a.id_aluno
        JOIN turmas t     ON t.id_turma = m.id_turma
        LEFT JOIN notas n ON n.id_matricula = m.id_matricula
        WHERE a.nome LIKE %s
    """
    params = [f"%{nome}%"]

    if turma:
        sql += " AND t.id_turma = %s"
        params.append(turma)

    sql += " ORDER BY a.nome"

    con = get_connection()
    cur = con.cursor(dictionary=True)
    cur.execute(sql, params)
    dados = cur.fetchall()
    cur.close()
    con.close()
    
    # serializar Decimal e date
    for d in dados:
        if d["data_matricula"]:
            d["data_matricula"] = d["data_matricula"].isoformat()
        for campo in ["nota1", "nota2", "nota3", "media"]:
            if d[campo] is not None:
                d[campo] = float(d[campo])

    return jsonify(dados)

if __name__ == "__main__":
    app.run(port=5000, debug=True)