
from flask import Flask, render_template, request
from database import conectar

app = Flask(__name__)

@app.route("/")
def inicio():
    nome = request.args.get("nome", "").strip()
    turma_id = request.args.get("turma", "0")

    try:
        turma_id = int(turma_id)
        if turma_id < 0:
            turma_id = 0
    except ValueError:
        turma_id = 0

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            a.nome,
            a.email,
            t.nome_turma,
            m.data_matricula,
            n.nota1,
            n.nota2,
            n.nota3,
            n.media
        FROM alunos a
        INNER JOIN matriculas m
            ON a.id_aluno = m.id_aluno
        INNER JOIN turmas t
            ON m.id_turma = t.id_turma
        LEFT JOIN notas n
            ON m.id_matricula = n.id_matricula
        WHERE a.nome LIKE %s
          AND (%s = 0 OR t.id_turma = %s)
        ORDER BY a.nome
    """, (f"%{nome}%", turma_id, turma_id))

    alunos = cursor.fetchall()

    cursor.execute("""
        SELECT id_turma, nome_turma
        FROM turmas
        ORDER BY nome_turma
    """)

    turmas = cursor.fetchall()

    cursor.close()
    conexao.close()

    return render_template(
        "index.html",
        alunos=alunos,
        turmas=turmas,
        nome=nome,
        turma_id=turma_id
    )

if __name__ == "__main__":
    app.run(debug=True)
