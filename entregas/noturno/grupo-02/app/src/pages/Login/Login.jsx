import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.de || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const user = await login(email, senha);
      showToast(`Bem-vindo(a), ${user.nome.split(' ')[0]}!`, 'success');
      navigate(destino, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.mensagem ||
        'Não foi possível entrar. Verifique a API e os dados.';
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login">
      <div className="login__toggle">
        <ThemeToggle />
      </div>

      <aside className="login__brand">
        <div className="login__brand-content">
          <span className="login__brand-logo">🎓</span>
          <h1>Portal Acadêmico</h1>
          <p>
            Consulta rápida e intuitiva dos alunos matriculados da instituição.
          </p>
        </div>
      </aside>

      <main className="login__form-wrap">
        <form className="login__form" onSubmit={handleSubmit}>
          <h2 className="login__titulo">Entrar</h2>
          <p className="login__subtitulo">Acesse com suas credenciais da coordenação.</p>

          {erro && (
            <div className="login__erro" role="alert">
              <FiAlertCircle /> <span>{erro}</span>
            </div>
          )}

          <div className="login__campo">
            <label htmlFor="email">E-mail</label>
            <div className="login__input">
              <FiMail aria-hidden />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@escola.edu.br"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login__campo">
            <label htmlFor="senha">Senha</label>
            <div className="login__input">
              <FiLock aria-hidden />
              <input
                id="senha"
                type={verSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="login__olho"
                onClick={() => setVerSenha((v) => !v)}
                aria-label={verSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {verSenha ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            icon={<FiLogIn />}
            disabled={carregando}
            className="login__submit"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </Button>

          <p className="login__dica">
            <strong>Acesso de demonstração</strong><br />
            admin@escola.edu.br &nbsp;·&nbsp; admin123
          </p>
        </form>
      </main>
    </div>
  );
}
