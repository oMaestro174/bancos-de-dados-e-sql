const db = require("../config/database");

module.exports = {
    async index(req, res) {
        try {
            // JOIN para trazer o nome_turma associado ao aluno através da matrícula
            const [rows] = await db.query(
                `SELECT a.*, t.nome_turma, m.data_matricula, n.nota1, n.nota2, n.nota3, n.media 
                FROM alunos a
                INNER JOIN matriculas m ON a.id_aluno = m.id_aluno
                INNER JOIN turmas t ON m.id_turma = t.id_turma
                INNER JOIN notas n ON n.id_matricula = m.id_matricula
                ORDER BY a.nome`
            );

            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                erro: "Erro ao buscar alunos"
            });
        }
    }
};