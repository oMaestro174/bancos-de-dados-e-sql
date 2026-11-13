function SearchBar({ busca, setBusca }) {
  return (
    <>
      <div className="search-wrapper">
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Buscar por nome do aluno ou turma..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="stats">
        Mostrando <span id="count">0</span> registros
      </div>
    </>
  );
}

export default SearchBar;