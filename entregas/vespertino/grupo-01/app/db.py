"""#  db.py: Conexão do Python com  MySQL"""
import os   # le variaveis de ambiente
import pymysql  # a biblioteca que conecta com o MySQL
from pymysql.cursors import DictCursor  # traz os dados do banco dicionario
from dotenv import load_dotenv  # le o arquivo .env


# Carrega o arquivo .env
load_dotenv()


# Fncao que conecta com o banco 
def conectar():
  
    conexao = pymysql.connect(
        host=os.getenv("DB_HOST", "localhost"),
        port=int(os.getenv("DB_PORT", "3306")), 
        user=os.getenv("DB_USER", "root"), 
        password=os.getenv("DB_PASSWORD", ""),# senha qu vem do env
        database=os.getenv("DB_NAME", "escola_db"),  # qual banco usar
        cursorclass=DictCursor,   
        charset="utf8mb4",  
    )

    return conexao
