import React from 'react';

function getMediaStatus(media) {
    const valor = Number(media);
    if (Number.isNaN(valor)) return 'muted';
    if (valor >= 7) return 'success';
    if (valor >= 5) return 'warning';
    return 'danger';
}

function GradeRing({ media }) {
    const valor = Number(media);
    const pct = Number.isNaN(valor) ? 0 : Math.min(Math.max(valor, 0), 10) * 10;
    const status = getMediaStatus(media);

    return (
        <div
            className={`grade-ring status-${status}`}
            style={{ '--pct': pct }}
            title={`Média: ${Number.isNaN(valor) ? '-' : valor}`}
        >
            <div className="grade-ring-inner">
                {Number.isNaN(valor) ? '-' : valor.toFixed(1)}
            </div>
        </div>
    );
}

function AlunoTable({ alunos }) {
    return (
        <div className="table-wrap">
            <table className="aluno-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Turma</th>
                        <th>Data da matrícula</th>
                        <th className="col-center">Nota 1</th>
                        <th className="col-center">Nota 2</th>
                        <th className="col-center">Nota 3</th>
                        <th className="col-center">Média</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.length > 0 ? (
                        alunos.map((aluno) => (
                            <tr key={aluno.id_aluno}>
                                <td className="aluno-nome">{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>
                                    <span className={`turma-chip${aluno.nome_turma ? '' : ' sem-turma'}`}>
                                        {aluno.nome_turma || 'Sem turma'}
                                    </span>
                                </td>
                                <td>{new Date(aluno.data_matricula).toLocaleDateString('pt-BR')}</td>
                                <td className="nota-cell">{aluno.nota1}</td>
                                <td className="nota-cell">{aluno.nota2}</td>
                                <td className="nota-cell">{aluno.nota3}</td>
                                <td>
                                    <GradeRing media={aluno.media} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="empty-row">
                            <td colSpan="8">
                                Nenhum aluno encontrado com os filtros aplicados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AlunoTable;
