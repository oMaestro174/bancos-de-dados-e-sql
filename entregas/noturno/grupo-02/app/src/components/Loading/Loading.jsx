// Componentes de carregamento: Spinner e Skeleton (linhas da tabela).
import './Loading.css';

export function Spinner({ texto = 'Carregando...' }) {
  return (
    <div className="spinner-wrap" role="status">
      <span className="spinner" aria-hidden />
      <span className="spinner-text">{texto}</span>
    </div>
  );
}

// Esqueleto de linhas para a tabela enquanto os dados chegam.
export function TableSkeleton({ linhas = 6, colunas = 6 }) {
  return (
    <div className="skeleton-table" aria-hidden>
      {Array.from({ length: linhas }).map((_, i) => (
        <div className="skeleton-row" key={i}>
          {Array.from({ length: colunas }).map((__, j) => (
            <span className="skeleton-cell" key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}
