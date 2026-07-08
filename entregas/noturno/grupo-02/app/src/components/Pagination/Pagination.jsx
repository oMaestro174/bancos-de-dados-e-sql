import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Pagination.css';

// Gera a sequência de páginas a exibir (com "..." quando há muitas).
function montarPaginas(atual, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const paginas = [1];
  const inicio = Math.max(2, atual - 1);
  const fim = Math.min(total - 1, atual + 1);

  if (inicio > 2) paginas.push('...');
  for (let p = inicio; p <= fim; p++) paginas.push(p);
  if (fim < total - 1) paginas.push('...');
  paginas.push(total);
  return paginas;
}

export default function Pagination({ pagina, totalPaginas, total, limite, onMudar }) {
  if (totalPaginas <= 1) return null;

  const paginas = montarPaginas(pagina, totalPaginas);
  const primeiro = (pagina - 1) * limite + 1;
  const ultimo = Math.min(pagina * limite, total);

  return (
    <nav className="paginacao" aria-label="Paginação">
      <span className="paginacao__info">
        {primeiro}–{ultimo} de {total}
      </span>

      <div className="paginacao__controles">
        <button
          className="paginacao__btn"
          onClick={() => onMudar(pagina - 1)}
          disabled={pagina === 1}
          aria-label="Página anterior"
        >
          <FiChevronLeft />
        </button>

        {paginas.map((p, i) =>
          p === '...' ? (
            <span key={`e${i}`} className="paginacao__reticencias">…</span>
          ) : (
            <button
              key={p}
              className={`paginacao__btn ${p === pagina ? 'paginacao__btn--ativo' : ''}`}
              onClick={() => onMudar(p)}
              aria-current={p === pagina ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          className="paginacao__btn"
          onClick={() => onMudar(pagina + 1)}
          disabled={pagina === totalPaginas}
          aria-label="Próxima página"
        >
          <FiChevronRight />
        </button>
      </div>
    </nav>
  );
}
