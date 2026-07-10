const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

function formatDateOnly(value) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
}

function buildAlunoPayload(aluno) {
  const matricula = aluno.matriculas?.[0] || null;
  const nota = matricula?.notas?.[0] || null;

  return {
    id_aluno: aluno.id_aluno,
    nome: aluno.nome,
    email: aluno.email,
    cidade: aluno.cidade ?? null,
    data_nascimento: formatDateOnly(aluno.data_nascimento),
    turma: matricula?.turma?.nome_turma ?? null,
    data_matricula: matricula?.data_matricula
      ? formatDateOnly(matricula.data_matricula)
      : null,
    notas: nota
      ? [Number(nota.nota1), Number(nota.nota2), Number(nota.nota3)]
      : [],
    media: nota ? Number(nota.media) : null,
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateAlunoPayload(payload) {
  const nome = typeof payload.nome === "string" ? payload.nome.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const cidade =
    typeof payload.cidade === "string" ? payload.cidade.trim() : "";

  if (!nome) {
    return { ok: false, error: "O campo nome é obrigatório." };
  }

  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "O campo email deve ser um endereço válido." };
  }

  if (!cidade) {
    return { ok: false, error: "O campo cidade é obrigatório." };
  }

  return {
    ok: true,
    data: {
      nome,
      email: email.toLowerCase(),
      cidade,
      data_nascimento: payload.data_nascimento
        ? new Date(payload.data_nascimento)
        : null,
    },
  };
}

app.get("/api/alunos", async (req, res) => {
  try {
    const { turma, nome } = req.query;

    let alunos;

    if (turma && typeof turma === "string") {
      console.log("Filtro por turma recebido:", turma);
      alunos = await prisma.aluno.findMany({
        where: {
          matriculas: {
            some: {
              turma: {
                nome_turma: {
                  contains: turma,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        select: {
          id_aluno: true,
          nome: true,
          email: true,
          cidade: true,
          data_nascimento: true,
          matriculas: {
            select: {
              data_matricula: true,
              turma: {
                select: {
                  nome_turma: true,
                },
              },
              notas: {
                select: {
                  nota1: true,
                  nota2: true,
                  nota3: true,
                  media: true,
                },
              },
            },
          },
        },
      });
      console.log("Resultado filtro turma:", alunos.length);
    } else if (nome && typeof nome === "string") {
      alunos = await prisma.aluno.findMany({
        where: {
          nome: {
            contains: nome,
            mode: "insensitive",
          },
        },
        select: {
          id_aluno: true,
          nome: true,
          email: true,
          cidade: true,
          data_nascimento: true,
          matriculas: {
            select: {
              data_matricula: true,
              turma: {
                select: {
                  nome_turma: true,
                },
              },
              notas: {
                select: {
                  nota1: true,
                  nota2: true,
                  nota3: true,
                  media: true,
                },
              },
            },
          },
        },
      });
    } else {
      alunos = await prisma.aluno.findMany({
        orderBy: {
          id_aluno: "asc",
        },
        select: {
          id_aluno: true,
          nome: true,
          email: true,
          cidade: true,
          data_nascimento: true,
          matriculas: {
            select: {
              data_matricula: true,
              turma: {
                select: {
                  nome_turma: true,
                },
              },
              notas: {
                select: {
                  nota1: true,
                  nota2: true,
                  nota3: true,
                  media: true,
                },
              },
            },
          },
        },
      });
    }

    const payload = alunos.map(buildAlunoPayload);
    res.json(payload);
  } catch (error) {
    console.error("Erro em GET /api/alunos:", error);
    res.status(500).json({ error: "Erro ao consultar alunos." });
  }
});

app.post("/api/alunos", async (req, res) => {
  try {
    const validation = validateAlunoPayload(req.body || {});

    if (!validation.ok) {
      return res.status(400).json({ error: validation.error });
    }

    const existingAluno = await prisma.aluno.findFirst({
      where: { email: validation.data.email },
    });

    if (existingAluno) {
      return res
        .status(409)
        .json({ error: "Já existe um aluno com este e-mail." });
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome: validation.data.nome,
        email: validation.data.email,
        cidade: validation.data.cidade,
        data_nascimento: validation.data.data_nascimento,
      },
      select: {
        id_aluno: true,
        nome: true,
        email: true,
        cidade: true,
        data_nascimento: true,
        matriculas: {
          select: {
            data_matricula: true,
            turma: {
              select: {
                nome_turma: true,
              },
            },
            notas: {
              select: {
                nota1: true,
                nota2: true,
                nota3: true,
                media: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json(buildAlunoPayload(aluno));
  } catch (error) {
    console.error("Erro em POST /api/alunos:", error);
    return res.status(500).json({ error: "Erro ao criar aluno." });
  }
});

app.put("/api/alunos/:id_aluno", async (req, res) => {
  try {
    const id = Number(req.params.id_aluno);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "id_aluno inválido." });
    }

    const validation = validateAlunoPayload(req.body || {});

    if (!validation.ok) {
      return res.status(400).json({ error: validation.error });
    }

    const existingAluno = await prisma.aluno.findFirst({
      where: { email: validation.data.email },
    });

    if (existingAluno && existingAluno.id_aluno !== id) {
      return res
        .status(409)
        .json({ error: "Já existe um aluno com este e-mail." });
    }

    const aluno = await prisma.aluno.update({
      where: { id_aluno: id },
      data: {
        nome: validation.data.nome,
        email: validation.data.email,
        cidade: validation.data.cidade,
        data_nascimento: validation.data.data_nascimento,
      },
      select: {
        id_aluno: true,
        nome: true,
        email: true,
        cidade: true,
        data_nascimento: true,
        matriculas: {
          select: {
            data_matricula: true,
            turma: {
              select: {
                nome_turma: true,
              },
            },
            notas: {
              select: {
                nota1: true,
                nota2: true,
                nota3: true,
                media: true,
              },
            },
          },
        },
      },
    });

    return res.json(buildAlunoPayload(aluno));
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    console.error("Erro em PUT /api/alunos/:id_aluno:", error);
    return res.status(500).json({ error: "Erro ao atualizar aluno." });
  }
});

app.delete("/api/alunos/:id_aluno", async (req, res) => {
  try {
    const id = Number(req.params.id_aluno);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: "id_aluno inválido." });
    }

    const matriculas = await prisma.matricula.count({
      where: { id_aluno: id },
    });

    if (matriculas > 0) {
      return res.status(409).json({
        error:
          "Não é possível remover este aluno porque ele possui matrículas vinculadas.",
      });
    }

    await prisma.aluno.delete({
      where: { id_aluno: id },
    });

    return res.json({ message: "Aluno removido com sucesso.", id_aluno: id });
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }

    console.error("Erro em DELETE /api/alunos/:id_aluno:", error);
    return res.status(500).json({ error: "Erro ao remover aluno." });
  }
});

app.get("/api/turmas", async (_req, res) => {
  try {
    const turmas = await prisma.turma.findMany({
      select: {
        id_turma: true,
        nome_turma: true,
      },
      orderBy: {
        nome_turma: "asc",
      },
    });

    res.json(turmas);
  } catch (error) {
    console.error("Erro em GET /api/turmas:", error);
    res.status(500).json({ error: "Erro ao consultar turmas." });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada." });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
