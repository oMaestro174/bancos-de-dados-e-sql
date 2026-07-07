# escola-db-back

API de consulta de alunos matriculados — back-end do Projeto Integrador do Módulo 09 (Bancos de Dados e SQL) do curso Full Stack CCTI/ITEAM.

API **somente leitura** (GET) que conecta ao banco `escola_db` e expõe os dados para o front-end via JSON.

## Stack

- **Python 3.12**
- **Flask** — microframework web
- **flask-cors** — permite requisições do front (porta diferente)
- **mysql-connector-python** — conexão com o MySQL
- **python-dotenv** — variáveis de ambiente

## Estrutura

```
escola-db-back/
├── venv/              # ambiente virtual (não versionado)
├── app.py             # rotas da API
├── db.py              # conexão com o MySQL
├── .env                # credenciais locais (não versionado)
├── .env.example        # modelo de variáveis de ambiente
├── .gitignore
└── requirements.txt
```

## Como executar

**1. Criar e ativar o ambiente virtual**
```bash
python -m venv venv
source venv/bin/activate      # Linux/Mac/Git Bash
venv\Scripts\activate         # Windows (cmd/powershell)
```

**2. Instalar dependências**
```bash
pip install -r requirements.txt
```

**3. Configurar variáveis de ambiente**

Copie `.env.example` para `.env` e preencha com as credenciais do seu MySQL local:
```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=escola_db
```

**4. Importar a base**

No MySQL Workbench, execute o script `escola_db.sql` (disponível no repositório do professor, pasta `base/`).

**5. Rodar o servidor**
```bash
python app.py
```

Servidor sobe em `http://127.0.0.1:5000`.

## Endpoints

### `GET /api/turmas`

Lista todas as turmas, para popular o filtro do front.

**Resposta:**
```json
[
  { "id_turma": 1, "nome_turma": "BD-01", "turno": "Manhã" }
]
```

### `GET /api/alunos`

Lista os alunos matriculados, com filtros opcionais.

**Parâmetros de query (opcionais):**
| Parâmetro | Tipo   | Descrição                          |
|-----------|--------|-------------------------------------|
| `nome`    | string | Busca parcial pelo nome do aluno    |
| `turma`   | int    | Filtra por `id_turma`               |

**Exemplo:** `/api/alunos?nome=ana&turma=1`

**Resposta:**
```json
[
  {
    "nome": "Adriana Nogueira",
    "email": "adriana.nogueira1@email.com",
    "nome_turma": "BD-01",
    "turno": "Manhã",
    "data_matricula": "2026-01-02",
    "nota1": 6.5,
    "nota2": 6.5,
    "nota3": 5.8,
    "media": 6.27
  }
]
```

## A query principal

```sql
SELECT a.nome, a.email, t.nome_turma, t.turno,
       m.data_matricula, n.nota1, n.nota2, n.nota3, n.media
FROM alunos a
JOIN matriculas m ON m.id_aluno = a.id_aluno
JOIN turmas t     ON t.id_turma = m.id_turma
LEFT JOIN notas n ON n.id_matricula = m.id_matricula
WHERE a.nome LIKE %s
  AND t.id_turma = %s   -- aplicado só se o parâmetro turma for enviado
ORDER BY a.nome;
```

**Por que `LEFT JOIN` em `notas`:** garante que um aluno sem notas lançadas ainda apareça na listagem (com campos de nota como `null`), em vez de desaparecer, como aconteceria com `INNER JOIN`.

## Decisões técnicas

- **Parâmetros na query (`%s`), nunca concatenação de string:** previne SQL Injection.
- **Serialização manual de `Decimal` e `date`:** o MySQL Connector retorna esses tipos, que não são serializáveis diretamente em JSON — são convertidos explicitamente (`float()` e `.isoformat()`) antes da resposta.
- **CORS habilitado globalmente:** necessário porque o front roda em outra porta (5173) e o navegador bloqueia requisições cross-origin por padrão.
- **Credenciais fora do código:** usando `.env`, nunca hardcoded — cada membro da equipe usa a própria senha local do MySQL, mantendo apenas nome de usuário e banco padronizados.

## Integração com o front

O contrato acima foi fechado com a equipe de front-end antes da implementação. Nenhum campo deve ser renomeado, removido ou adicionado sem avisar a equipe — mudanças quebram o consumo já implementado no React.
