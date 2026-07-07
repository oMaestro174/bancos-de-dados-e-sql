import mysql.connector
import os
from dotenv import load_dotenv

"""A aplicação deverá exibir, no mínimo:

Nome do aluno;
E-mail;
Turma à qual pertence;
Data da matrícula;
Notas;
Média final.

A aplicação deverá permitir, no mínimo:

Filtrar os alunos por turma; - Group By

SELECT t.nome_turma, COUNT(m.id_aluno) AS total_alunos
FROM turmas t
INNER JOIN matriculas m 
ON t.id_turma = m.id_turma
WHERE m.status = "Ativa"
GROUP BY t.id_turma;

Pesquisar por nome do aluno.
Como recurso opcional, o grupo poderá implementar:

Busca por matrícula;
Busca por e-mail;
"""

load_dotenv()

db_connection = mysql.connector.connect(
    host = os.getenv("DB_HOST"),
    user = os.getenv("DB_USER"),
    password = os.getenv("DB_PASSWORD"),
    database = os.getenv("DB_NAME")
)

# Busca individual SELECT - WHERE:
def search_student_by_name():
    pass

def search_student_by_matricula():
    pass

def search_student_by_email():
    pass

# 
def list_students_with_class_score_media():
    """Exibir alunos com turma vinculada, notas e média"""
    with db_connection as connection:
        cursor = connection.cursor()
        cursor.execute(
            """SELECT a.nome, a.email, nome_turma, data_matricula, nota1, nota2, nota3, media 
FROM alunos a
INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
INNER JOIN turmas t ON m.id_turma = t.id_turma
INNER JOIN notas n ON m.id_matricula = n.id_nota"""
        )
        rows = cursor.fetchall()
   
    students = []
    for row in rows:
        students.append(
            {
                "name": row[0],
                "email": row[1],
                "classroomName": row[2],
                "enrollmentDate": row[3],
                "firstScore": row[4],
                "secondScore": row[5],
                "thirdScore": row[6],
                "media": row[7]
            }
        )
    return students

# Agrupamento JOIN - GROUP BY
def filter_active_students_by_class():
    """Filtra a quantidade de alunos por turma"""
    with db_connection as connection:
        cursor = connection.cursor()
        cursor.execute(
            """SELECT t.nome_turma, COUNT(m.id_aluno) AS total_alunos
                FROM turmas t
                INNER JOIN matriculas m 
                ON t.id_turma = m.id_turma
                WHERE m.status = "Ativa"
                GROUP BY t.id_turma;"""
        )

        rows = cursor.fetchall()
    
    # organiza os dados obtidos em um dict
    quantity_by_classroom = []
    for row in rows:
        quantity_by_classroom.append(
            {
                "classroomName": row[0],
                "studentsQuantity": row[1]
            }
        )

    # retorna os dados
    return quantity_by_classroom