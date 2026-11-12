export default function Header({ activePage, onChangePage, onLogout }) {
  return (
    <header className="header">
      <div className="header-brand">
        <img src="/logo.webp" alt="Logo ITEAM" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
        <div>
          <strong>ESCOLA ITEAM RR</strong>
          <span>Consulta acadêmica</span>
        </div>
      </div>

      <nav className="header-nav" aria-label="Navegação principal">
        <button
          type="button"
          className={activePage === 'alunos' ? 'nav-button active' : 'nav-button'}
          onClick={() => onChangePage('alunos')}
        >
          Alunos
        </button>

        <button
          type="button"
          className={activePage === 'turmas' ? 'nav-button active' : 'nav-button'}
          onClick={() => onChangePage('turmas')}
        >
          Turmas
        </button>
      </nav>

      <div className="header-user">
        <span>coordenacao@iteamrr.edu.br</span>
        <button type="button" className="ghost-button" onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  )
}
