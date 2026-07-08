import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiLogOut } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Avatar from '../Avatar/Avatar';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <div className="navbar__brand">
          <span className="navbar__logo">🎓</span>
          <span className="navbar__title">Portal Acadêmico</span>
        </div>

        <nav className="navbar__links" aria-label="Navegação principal">
          <NavLink to="/" end className="navbar__link">
            <FiGrid /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/alunos" className="navbar__link">
            <FiUsers /> <span>Alunos</span>
          </NavLink>
        </nav>

        <div className="navbar__actions">
          <ThemeToggle />
          {usuario && (
            <div className="navbar__user">
              <Avatar nome={usuario.nome} size={34} />
              <span className="navbar__username">{usuario.nome}</span>
              <button
                className="navbar__logout"
                onClick={logout}
                aria-label="Sair"
                title="Sair"
              >
                <FiLogOut />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
