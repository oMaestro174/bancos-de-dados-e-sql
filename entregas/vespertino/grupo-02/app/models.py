from datetime import datetime

from pydantic import BaseModel, Field  # para validação automática dos dados

# Modelo para alunos
class StudentCreate(BaseModel):
    """Modelo de dados usado para validação na criação de um aluno."""
    nome: str
    email: str
    data_nascimento: datetime
    cidade: str

class StudentResponse(BaseModel):
    """Modelo de dados para resposta com objeto aluno"""
    id_aluno: int
    nome: str
    email: str
    data_nascimento: datetime
    cidade: str

class CompleteStudentResponse(BaseModel):
    """Modelo de dados para resposta com objeto aluno"""
    # Use Field para mapear o nome amigável se quiser manter o atributo como 'nome'
    # Ou mude o nome da variável direto para bater com o do banco:
    
    name: str = Field(alias="nome") # nome
    email: str
    className: str = Field(alias="nomeDaTurma")
    enrollmentDate: datetime = Field(alias="dataDaMatricula")
    firstScore: float = Field(alias="primeiraNota")
    secondScore: float = Field(alias="segundaNota")
    thirdScore: float = Field(alias="terceiraNota")
    media: float = Field(alias="mediaDasNotas")

    # Isso permite que o Pydantic leia os dados tanto pelo nome original quanto pelo alias
    model_config = {"populate_by_name": True}

# Modelo para cursos
class CourseCreate(BaseModel):
    """Modelo de dados para criação de curso"""
    # id é autoincremental
    nome: str
    carga_horaria: int
    area: str

class CourseResponse(BaseModel):
    """Modelo de dados para resposta em formato de objeto para curso"""
    id_curso: int
    nome: str
    carga_horaria: int
    area: str

# Modelo para matrículas
class EnrollmentCreate(BaseModel):
    """Modelo de dados para criação de matrícula"""
    id_aluno: int
    id_turma: int
    data_matricula: datetime
    status: str

class EnrollmentResponse(BaseModel):
    """Modelo de dados para resposta em formato de objeto para matrícula"""
    id_matricula: int
    id_aluno: int
    id_turma: int
    data_matricula: datetime
    status: str

# Modelo para notas
class ScoreCreate(BaseModel):
    """Modelo de dados para criação de notas"""
    id_matricula: int
    nota1: float
    nota2: float
    nota3: float
    media: float

class ScoreResponse(BaseModel):
    """Modelo de dados para resposta em formato de objeto para notas"""
    id_nota: int
    id_matricula: int
    nota1: float
    nota2: float
    nota3: float
    media: float

# Modelo para professores
class TeacherCreate(BaseModel):
    """Modelo de dados para criação de professores"""
    nome: str
    email: str
    area: str

class TeacherResponse(BaseModel):
    """Modelo de dados para resposta em formato de objeto para professores"""
    id_professor: int
    nome: str
    email: str
    area: str

# Modelo para turmas
class ClassCreate(BaseModel):
    """Modelo de dados para criação de turmas"""
    id_curso: int
    id_professor: int
    nome_turma: str
    turno: str
    periodo: str
    capacidade: int


class ClassResponse(BaseModel):
    """Modelo de dados para resposta em formato de objeto para turmas"""
    id_turma: int
    id_curso: int
    id_professor: int
    nome_turma: str
    turno: str
    periodo: str
    capacidade: int