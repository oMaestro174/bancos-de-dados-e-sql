import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('coordenacao@iteamrr.edu.br')
  const [password, setPassword] = useState('iteam2026')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Informe o e-mail e a senha para acessar o sistema.')
      return
    }

    setError('')
    onLogin()
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-block">
          <img src="/logo.webp" alt="Logo ITEAM" style={{ height: '56px', width: 'auto', objectFit: 'contain' }} />
          <div>
            <strong>ESCOLA ITEAM RR</strong>
            <span>Acesso da coordenação</span>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <p className="form-error">{error}</p>}

          <a className="forgot-link" href="#recuperar-senha">
            Esqueci minha senha
          </a>

          <button type="submit" className="primary-button full-width">
            Entrar
          </button>
        </form>

        <p className="demo-access">
          Demo: coordenacao@iteamrr.edu.br · iteam2026
        </p>
      </section>
    </main>
  )
}
