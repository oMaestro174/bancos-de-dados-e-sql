export default function EmptyState({ onClearFilters }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">⌕</div>
      <h2>Nenhum aluno encontrado</h2>
      <p>Revise os filtros informados ou limpe a busca para consultar todos os alunos.</p>
      <button type="button" className="secondary-button" onClick={onClearFilters}>
        Limpar filtros
      </button>
    </div>
  )
}
