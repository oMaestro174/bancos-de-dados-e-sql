import { pool } from '../db.js';

// Cláusula FROM + JOINs reutilizada pelo SELECT e pelo COUNT (paginação).
const FROM_JOINS = `
  FROM matriculas m
  INNER JOIN alunos a       ON a.id_aluno     = m.id_aluno
  INNER JOIN turmas t       ON t.id_turma     = m.id_turma
  INNER JOIN cursos c       ON c.id_curso     = t.id_curso
  INNER JOIN professores p  ON p.id_professor = t.id_professor
  LEFT  JOIN notas n        ON n.id_matricula = m.id_matricula
`;

// SELECT base: junta as 6 tabelas e traz os campos exibidos na tela.
const SELECT_BASE = `
  SELECT
    m.id_matricula,
    a.id_aluno,
    a.nome,
    a.email,
    a.cidade,
    a.data_nascimento,
    LPAD(m.id_matricula, 6, '0') AS matricula,
    m.data_matricula,
    m.status,
    t.id_turma,
    t.nome_turma AS turma,
    t.turno,
    t.periodo,
    c.nome       AS curso,
    p.nome       AS professor,
    n.nota1, n.nota2, n.nota3,
    n.media      AS media_final
  ${FROM_JOINS}
`;

// Colunas permitidas para ordenação (whitelist evita injeção via ORDER BY).
const ORDENAVEIS = {
  nome: 'a.nome',
  matricula: 'm.id_matricula',
  turma: 't.nome_turma',
  media: 'media_final',
  data: 'm.data_matricula',
};

// GET /api/alunos  — lista paginada com filtros opcionais
export async function listarAlunos(req, res, next) {
  try {
    const { nome, turma, email, matricula, status, ordenarPor, ordem } = req.query;

    const where = [];
    const params = [];

    if (nome) {
      where.push('a.nome LIKE ?');
      params.push(`%${nome}%`);
    }
    if (turma) {
      where.push('m.id_turma = ?');
      params.push(turma);
    }
    if (email) {
      where.push('a.email LIKE ?');
      params.push(`%${email}%`);
    }
    if (matricula) {
      where.push('m.id_matricula LIKE ?');
      params.push(`%${matricula}%`);
    }
    if (status) {
      where.push('m.status = ?');
      params.push(status);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const coluna = ORDENAVEIS[ordenarPor] || 'a.nome';
    const direcao = String(ordem).toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const orderSql = `ORDER BY ${coluna} ${direcao}`;

    const pagina = Math.max(1, parseInt(req.query.pagina, 10) || 1);
    const limite = Math.min(100, Math.max(1, parseInt(req.query.limite, 10) || 10));
    const offset = (pagina - 1) * limite;

    // 1) Total de registros que casam com o filtro (para calcular as páginas).
    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total ${FROM_JOINS} ${whereSql}`,
      params
    );

    const [dados] = await pool.query(
      `${SELECT_BASE} ${whereSql} ${orderSql} LIMIT ${limite} OFFSET ${offset}`,
      params
    );

    res.json({
      dados,
      total,
      pagina,
      limite,
      totalPaginas: Math.max(1, Math.ceil(total / limite)),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/alunos/:id  — detalhe de uma matrícula (aluno + notas)
export async function obterAluno(req, res, next) {
  try {
    const { id } = req.params; // id = id_matricula
    const [rows] = await pool.query(
      `${SELECT_BASE} WHERE m.id_matricula = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Matrícula não encontrada.' });
    }

    const aluno = rows[0];
    // Monta a lista de avaliações para exibição uniforme no front-end.
    aluno.notas = [
      { avaliacao: 'Nota 1', nota: aluno.nota1 },
      { avaliacao: 'Nota 2', nota: aluno.nota2 },
      { avaliacao: 'Nota 3', nota: aluno.nota3 },
    ].filter((n) => n.nota !== null && n.nota !== undefined);

    res.json(aluno);
  } catch (err) {
    next(err);
  }
}

// GET /api/turmas  — lista de turmas (para o filtro do front-end)
export async function listarTurmas(_req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT t.id_turma, t.nome_turma AS nome, t.turno, t.periodo, c.nome AS curso
         FROM turmas t
         INNER JOIN cursos c ON c.id_curso = t.id_curso
        ORDER BY t.nome_turma`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// GET /api/estatisticas  — dados para o Dashboard
export async function estatisticas(_req, res, next) {
  try {
    const [[geral]] = await pool.query(
      `SELECT
         (SELECT COUNT(*) FROM matriculas) AS total_alunos,
         (SELECT COUNT(*) FROM turmas)     AS total_turmas,
         (SELECT COUNT(*) FROM cursos)     AS total_cursos,
         ROUND(AVG(n.media), 2)            AS media_geral
       FROM notas n`
    );

    const [porTurma] = await pool.query(
      `SELECT
         t.nome_turma          AS turma,
         c.nome                AS curso,
         t.turno,
         COUNT(m.id_matricula) AS total_alunos,
         ROUND(AVG(n.media), 2) AS media_turma
       FROM turmas t
       INNER JOIN cursos c     ON c.id_curso = t.id_curso
       LEFT  JOIN matriculas m ON m.id_turma = t.id_turma
       LEFT  JOIN notas n      ON n.id_matricula = m.id_matricula
       GROUP BY t.id_turma, t.nome_turma, c.nome, t.turno
       ORDER BY media_turma DESC`
    );

    res.json({ geral, porTurma });
  } catch (err) {
    next(err);
  }
}
