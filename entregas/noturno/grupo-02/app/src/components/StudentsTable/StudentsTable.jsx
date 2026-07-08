import { FiChevronUp, FiChevronDown, FiEye } from 'react-icons/fi';
import Avatar from '../Avatar/Avatar';
import Badge from '../Badge/Badge';
import { formatarData, formatarMedia, situacaoPorMedia } from '../../utils/format';
import './StudentsTable.css';

const COLUNAS = [
  { chave: 'nome', rotulo: 'Aluno' },
  { chave: 'matricula', rotulo: 'Matrícula' },
  { chave: 'turma', rotulo: 'Turma' },
  { chave: 'data', rotulo: 'Matrícula em' },
  { chave: 'media', rotulo: 'Média' },
  { chave: null, rotulo: 'Situação' },
  { chave: null, rotulo: '' },
];

export default function StudentsTable({ alunos, ordenarPor, ordem, onOrdenar, onSelecionar }) {
  const setaDe = (chave) => {
    if (chave !== ordenarPor) return null;
    return ordem === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
  };

  return (
    <div className="tabela-wrap">
      <table className="tabela">
        <thead>
          <tr>
            {COLUNAS.map((c, i) => (
              <th
                key={i}
                className={c.chave ? 'tabela__th--sort' : ''}
                onClick={() => c.chave && onOrdenar(c.chave)}
              >
                <span className="tabela__th-inner">
                  {c.rotulo} {c.chave && setaDe(c.chave)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => {
            const sit = situacaoPorMedia(a.media_final);
            return (
              <tr key={a.id_matricula} onClick={() => onSelecionar(a.id_matricula)}>
                <td data-label="Aluno">
                  <div className="tabela__aluno">
                    <Avatar nome={a.nome} size={38} />
                    <div className="tabela__aluno-info">
                      <span className="tabela__nome">{a.nome}</span>
                      <span className="tabela__email">{a.email}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Matrícula">{a.matricula}</td>
                <td data-label="Turma">
                  <span className="tabela__turma">{a.turma}</span>
                  <span className="tabela__periodo">{a.curso}</span>
                </td>
                <td data-label="Matrícula em">{formatarData(a.data_matricula)}</td>
                <td data-label="Média">
                  <strong className="tabela__media">{formatarMedia(a.media_final)}</strong>
                </td>
                <td data-label="Situação">
                  <Badge tipo={sit.tipo}>{sit.label}</Badge>
                </td>
                <td className="tabela__acao">
                  <span className="tabela__ver" title="Ver detalhes">
                    <FiEye />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
