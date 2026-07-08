import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-dev';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';

// POST /api/auth/login  { email, senha }
export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Informe e-mail e senha.' });
    }

    const [rows] = await pool.query(
      'SELECT id_usuario, nome, email, senha_hash FROM usuarios WHERE email = ?',
      [email]
    );

    
    const credenciaisInvalidas = () =>
      res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });

    if (rows.length === 0) return credenciaisInvalidas();

    const usuario = rows[0];
    const confere = await bcrypt.compare(senha, usuario.senha_hash);
    if (!confere) return credenciaisInvalidas();

    const token = jwt.sign(
      { id: usuario.id_usuario, nome: usuario.nome, email: usuario.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me  — retorna o usuário do token (rota protegida)
export async function me(req, res) {
  res.json({ usuario: req.usuario });
}
