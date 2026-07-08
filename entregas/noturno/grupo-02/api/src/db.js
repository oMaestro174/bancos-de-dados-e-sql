// Pool de conexões com o MySQL usando mysql2 (driver com suporte a Promises).
import mysql from 'mysql2/promise';
import 'dotenv/config';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'escola_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
  charset: 'utf8mb4_unicode_ci',
});

// Testa a conexão na inicialização e loga um aviso amigável em caso de falha.
export async function testConnection() {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
}