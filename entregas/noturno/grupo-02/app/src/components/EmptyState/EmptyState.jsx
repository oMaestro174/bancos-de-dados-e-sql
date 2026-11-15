import { FiInbox, FiAlertCircle } from 'react-icons/fi';
import './EmptyState.css';

export default function EmptyState({
  titulo = 'Nenhum resultado encontrado',
  descricao = 'Tente ajustar os filtros da busca.',
  erro = false,
}) {
  return (
    <div className="empty">
      <span className={`empty__icon ${erro ? 'empty__icon--erro' : ''}`}>
        {erro ? <FiAlertCircle /> : <FiInbox />}
      </span>
      <h3 className="empty__titulo">{titulo}</h3>
      <p className="empty__descricao">{descricao}</p>
    </div>
  );
}
