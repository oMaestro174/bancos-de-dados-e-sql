
const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Conexão com o banco de dados
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Buscar todas as turmas
app.get('/api/turmas', async (req, res) => {
    try {
        const [turmas] = await conexao.query(`
            SELECT id_turma, nome_turma, turno
            FROM turmas
            ORDER BY nome_turma
        `);

        res.json(turmas);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao buscar turmas'
        });
    }
});

// Buscar alunos com filtros por turma e nome
app.get('/api/alunos', async (req, res) => {
    try {
        const { turma = '', nome = '' } = req.query;

        const sql = `
            SELECT *
            FROM vw_boletim_escolar
            WHERE (? = '' OR id_turma = ?)
            AND (? = '' OR aluno_nome LIKE ?)
            ORDER BY aluno_nome
        `;

        const parametros = [
            turma,
            turma,
            nome,
            `%${nome}%`
        ];

        const [alunos] = await conexao.execute(
            sql,
            parametros
        );

        res.json(alunos);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: 'Erro ao buscar alunos'
        });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
