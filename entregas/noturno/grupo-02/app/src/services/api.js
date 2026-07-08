import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

// Interceptor de requisição: anexa o token JWT (se houver) em toda chamada.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de resposta: em caso de 401 (sessão expirada), limpa o token.
// O redirecionamento para /login é feito pelas rotas protegidas.
api.interceptors.response.use(
  (r) => r,
  (erro) => {
    if (erro.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    return Promise.reject(erro);
  }
);

// Remove filtros vazios antes de montar a query string.
function limparParams(params = {}) {
  const out = {};
  Object.entries(params).forEach(([k, v]) => {
    if (v !== '' && v !== null && v !== undefined) out[k] = v;
  });
  return out;
}

export const authService = {
  login: (email, senha) =>
    api.post('/auth/login', { email, senha }).then((r) => r.data),
};

export const alunosService = {
  listar: (filtros) =>
    api.get('/alunos', { params: limparParams(filtros) }).then((r) => r.data),

  obter: (id) => api.get(`/alunos/${id}`).then((r) => r.data),

  turmas: () => api.get('/turmas').then((r) => r.data),

  estatisticas: () => api.get('/estatisticas').then((r) => r.data),
};

export default api;
