// Definição das rotas da API.
import { Router } from 'express';
import {
  listarAlunos,
  obterAluno,
  listarTurmas,
  estatisticas,
} from '../controllers/alunosController.js';
import { login, me } from '../controllers/authController.js';
import { autenticar } from '../middleware/auth.js';

const router = Router();

// --- Rotas públicas (autenticação) ---
router.post('/auth/login', login);

// --- A partir daqui, tudo exige token válido ---
router.use(autenticar);

router.get('/auth/me', me);
router.get('/alunos', listarAlunos);
router.get('/alunos/:id', obterAluno);
router.get('/turmas', listarTurmas);
router.get('/estatisticas', estatisticas);

export default router;
