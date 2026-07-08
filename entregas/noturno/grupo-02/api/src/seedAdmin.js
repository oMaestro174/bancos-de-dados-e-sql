// Cria automaticamente um usuário administrador na primeira execução,
// caso a tabela "usuarios" esteja vazia.
import bcrypt from 'bcryptjs';
import { pool } from './db.js';

export async function seedAdmin() {
  const [[{ total }]] = await pool.query(
    'SELECT COUNT(*) AS total FROM usuarios'
  );
  if (total > 0) return;

  const nome = process.env.ADMIN_NOME || 'Coordenação Acadêmica';
  const email = process.env.ADMIN_EMAIL || 'admin@escola.edu.br';
  const senha = process.env.ADMIN_SENHA || 'admin123';
  const hash = await bcrypt.hash(senha, 10);

  await pool.query(
    'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, hash]
  );

  console.log(`👤 Usuário administrador criado: ${email} (senha: ${senha})`);
}
