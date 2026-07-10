export default function FiltersBar({
  classes,
  searchName,
  selectedClass,
  searchEmail,
  searchEnrollment,
  showAdvanced,
  showInactive,
  onSearchName,
  onSelectClass,
  onSearchEmail,
  onSearchEnrollment,
  onToggleAdvanced,
  onToggleInactive,
  onClearFilters,
}) {
  return (
    <div className="filters-card">
      <div className="filters-main">
        <div className="field large">
          <label htmlFor="searchName">Buscar por nome</label>
          <input
            id="searchName"
            type="text"
            placeholder="Digite o nome do aluno"
            value={searchName}
            onChange={(event) => onSearchName(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="selectedClass">Turma</label>
          <select
            id="selectedClass"
            value={selectedClass}
            onChange={(event) => onSelectClass(event.target.value)}
          >
            <option value="">Todas as turmas</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="secondary-button" onClick={onToggleAdvanced}>
          Busca avançada
        </button>

        <button type="button" className="ghost-button dark" onClick={onClearFilters}>
          Limpar
        </button>
      </div>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="field">
            <label htmlFor="searchEmail">E-mail</label>
            <input
              id="searchEmail"
              type="text"
              placeholder="Buscar por e-mail"
              value={searchEmail}
              onChange={(event) => onSearchEmail(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="searchEnrollment">Matrícula</label>
            <input
              id="searchEnrollment"
              type="text"
              placeholder="Buscar por matrícula"
              value={searchEnrollment}
              onChange={(event) => onSearchEnrollment(event.target.value)}
            />
          </div>
        </div>
      )}

      <label className="checkbox-line">
        <input
          type="checkbox"
          checked={showInactive}
          onChange={onToggleInactive}
        />
        Mostrar inativos
      </label>
    </div>
  )
}
