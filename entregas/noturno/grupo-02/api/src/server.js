// Ponto de entrada da API REST (Express).
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes/index.js';
import { testConnection } from './db.js';
import { seedAdmin } from './seedAdmin.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middlewares globais
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Rota de saúde (útil para o deploy / monitoramento)
app.get('/', (_req, res) => {
  res.json({ status: 'ok', api: 'escola_db', versao: '1.0.0' });
});

// Rotas da aplicação sob o prefixo /api
app.use('/api', routes);

// 404 para rotas não mapeadas
app.use((_req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

// Tratamento centralizado de erros
app.use((err, _req, res, _next) => {
  console.error('[ERRO]', err.message);
  res.status(500).json({
    mensagem: 'Erro interno no servidor.',
    detalhe: err.message,
  });
});

// Sobe o servidor apenas após validar a conexão com o banco.
async function start() {
  try {
    await testConnection();
    console.log('✅ Conectado ao MySQL (escola_db).');
    await seedAdmin();
  } catch (err) {
    console.warn('⚠️  Não foi possível conectar ao MySQL:', err.message);
    console.warn('    Verifique o arquivo .env e se o banco está no ar.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
  });
}

start();