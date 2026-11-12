const express = require("express");

const AlunoController = require("../controllers/AlunoController");
const TurmaController = require("../controllers/TurmaController");

const router = express.Router();

// Alunos
router.get("/alunos", AlunoController.index);

// Turmas
router.get("/turmas", TurmaController.index);

module.exports = router;