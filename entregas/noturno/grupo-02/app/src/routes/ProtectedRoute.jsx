import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { autenticado } = useAuth();
  const location = useLocation();

  if (!autenticado) {
    // Guarda a rota de origem para voltar após o login.
    return <Navigate to="/login" replace state={{ de: location.pathname }} />;
  }
  return children;
}
