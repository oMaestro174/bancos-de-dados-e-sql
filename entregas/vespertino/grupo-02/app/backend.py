import database
import models
from fastapi import FastAPI, HTTPException

app = FastAPI(title="CRUD de Escola", description="API para manipulação de banco de dados escolar")

@app.get("/alunos", response_model=list[models.CompleteStudentResponse])
def get_students():
    students = database.list_students_with_class_score_media()
    return students