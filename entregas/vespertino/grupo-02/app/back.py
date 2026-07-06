import mysql.connector

try:
    # Conectando ao banco de dados
    conexao = mysql.connector.connect(
        host="127.0.0.1",          # Endereço do seu banco (ex: localhost ou IP)
        user="oot",        # Seu usuário do MySQL (ex: root)
        password="Gcdo0205@",      # Sua senha do MySQL
        database="escola_db"       # Nome do banco de dados
    )

    if conexao.is_connected():
        print("Conectado ao banco com sucesso!")
        
        cursor = conexao.cursor()
        
        # Substitua 'sua_tabela' pelo nome real da sua tabela
        cursor.execute("SELECT * FROM sua_tabela LIMIT 5;")
        
        # Pega as linhas retornadas
        linhas = cursor.fetchall()
        
        print("\nDados encontrados:")
        for linha in linhas:
            print(linha)
            
except mysql.connector.Error as erro:
    print(f"Erro ao conectar ou consultar o banco: {erro}")

finally:
    # Garante que a conexão será fechada
    if 'conexao' in locals() and conexao.is_connected():
        cursor.close()
        conexao.close()
        print("\nConexão fechada.")
