import React from 'react';

function FilterBar({ filterNome, setFilterNome, filterTurma, setFilterTurma, turmasDisponiveis, total }) {
    return (
        <div className="filter-bar">
            <div className="filter-field">
                <label htmlFor="busca-nome" className="filter-label">Pesquisar por nome</label>
                <input
                    id="busca-nome"
                    type="text"
                    placeholder="Digite o nome do aluno..."
                    value={filterNome}
                    onChange={(e) => setFilterNome(e.target.value)}
                    className="filter-input"
                />
            </div>

            <div className="filter-field">
                <label htmlFor="busca-turma" className="filter-label">Filtrar por turma</label>
                <select
                    id="busca-turma"
                    value={filterTurma}
                    onChange={(e) => setFilterTurma(e.target.value)}
                    className="filter-select"
                >
                    <option value="">Todas as turmas</option>
                    {turmasDisponiveis.map((turma) => (
                        <option key={turma} value={turma}>
                            {turma}
                        </option>
                    ))}
                </select>
            </div>

            {typeof total === 'number' && (
                <div className="filter-count">
                    <strong>{total}</strong> aluno{total === 1 ? '' : 's'} encontrado{total === 1 ? '' : 's'}
                </div>
            )}
        </div>
    );
}

export default FilterBar;
