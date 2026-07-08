// Middleware de autenticação: valida o token JWT enviado no header
//   Authorization: Bearer <token>
// Bloqueia o acesso às rotas protegidas quando o token é inválido/ausente.
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-dev';

export function autenticar(req, res, next) {
  const header = req.headers.authorization || '';
  const [tipo, token] = header.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.usuario = { id: payload.id, nome: payload.nome, email: payload.email };
    next();
  } catch {
    return res.status(401).json({ mensagem: 'Sessão expirada ou token inválido.' });
  }
}
