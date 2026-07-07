import React from 'react';

function FilterBar({ filterNome, setFilterNome, filterTurma, setFilterTurma, turmasDisponiveis }) {
    return (
        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center' }}>
            <div>
                <label htmlFor="busca-nome" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Pesquisar por Nome:</label>
                <input
                    id="busca-nome"
                    type="text"
                    placeholder="Digite o nome do aluno..."
                    value={filterNome}
                    onChange={(e) => setFilterNome(e.target.value)}
                    style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <div>
                <label htmlFor="busca-turma" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filtrar por Turma:</label>
                <select
                    id="busca-turma"
                    value={filterTurma}
                    onChange={(e) => setFilterTurma(e.target.value)}
                    style={{ padding: '8px', width: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Todas as Turmas</option>
                    {turmasDisponiveis.map((turma) => (
                        <option key={turma} value={turma}>
                            {turma}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default FilterBar;