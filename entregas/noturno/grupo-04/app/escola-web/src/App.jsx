import React, { useState, useEffect } from 'react';
import api from './services/api';
import FilterBar from './components/FilterBar';
import AlunoTable from './components/AlunoTable';
import './App.css';

function App() {
    const [alunos, setAlunos] = useState([]);
    const [filterNome, setFilterNome] = useState('');
    const [filterTurma, setFilterTurma] = useState('');
    const [loading, setLoading] = useState(true);

    // Busca os alunos uma única vez ao carregar a página
    useEffect(() => {
        api.get('/alunos')
            .then((response) => {
                setAlunos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao carregar alunos:", error);
                setLoading(false);
            });
    }, []);

    // Extrai a lista de turmas dinamicamente para o Select com base nos dados recebidos
    const turmasDisponiveis = Array.from(
        new Set(alunos.map((aluno) => aluno.nome_turma).filter(Boolean))
    ).sort();

    // Lógica de filtragem executada puramente em JavaScript
    const alunosFiltrados = alunos.filter((aluno) => {
        const matchesNome = aluno.nome.toLowerCase().includes(filterNome.toLowerCase());
        const matchesTurma = filterTurma === '' || aluno.nome_turma === filterTurma;
        return matchesNome && matchesTurma;
    });

    if (loading) {
        return (
            <div className="app-loading">
                <span className="spinner" />
                Carregando dados dos alunos...
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="app-header-inner">
                    <div>
                        <div className="app-eyebrow">Sistema Escolar</div>
                        <h1 className="app-title">Consulta de Alunos</h1>
                        <p className="app-subtitle">Pesquise, filtre e acompanhe o desempenho da turma</p>
                    </div>
                </div>
            </header>

            <main className="app-content">
                <div className="card">
                    <FilterBar
                        filterNome={filterNome}
                        setFilterNome={setFilterNome}
                        filterTurma={filterTurma}
                        setFilterTurma={setFilterTurma}
                        turmasDisponiveis={turmasDisponiveis}
                        total={alunosFiltrados.length}
                    />
                </div>

                <div className="card table-card">
                    <AlunoTable alunos={alunosFiltrados} />
                </div>
            </main>
        </div>
    );
}

export default App;
