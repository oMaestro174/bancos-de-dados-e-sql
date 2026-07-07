//ESSA PARTE NÃO SERÁ UTILIZADA

const db = require("../config/database");

module.exports = {
    async index(req, res) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM turmas ORDER BY nome_turma"
            );

            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                erro: "Erro ao buscar turmas"
            });
        }
    }
};