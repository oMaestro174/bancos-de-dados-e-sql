// Modal de detalhes do aluno: dados cadastrais + notas por disciplina.
import { useEffect, useState } from 'react';
import { FiX, FiMail, FiHash, FiCalendar, FiBookOpen, FiUser, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import Avatar from '../Avatar/Avatar';
import Badge from '../Badge/Badge';
import { Spinner } from '../Loading/Loading';
import { alunosService } from '../../services/api';
import {
  formatarData,
  formatarMedia,
  situacaoPorMedia,
} from '../../utils/format';
import './StudentModal.css';

export default function StudentModal({ alunoId, onClose }) {
  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!alunoId) return;
    setCarregando(true);
    alunosService
      .obter(alunoId)
      .then(setAluno)
      .finally(() => setCarregando(false));
  }, [alunoId]);

  // Fecha o modal com a tecla ESC.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!alunoId) return null;

  const sit = aluno ? situacaoPorMedia(aluno.media_final) : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do aluno"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Fechar">
          <FiX />
        </button>

        {carregando || !aluno ? (
          <Spinner texto="Carregando aluno..." />
        ) : (
          <>
            <div className="modal__header">
              <Avatar nome={aluno.nome} size={72} />
              <div>
                <h2 className="modal__nome">{aluno.nome}</h2>
                {sit && <Badge tipo={sit.tipo}>{sit.label}</Badge>}
              </div>
            </div>

            <div className="modal__dados">
              <div className="modal__dado">
                <FiMail /> <span>{aluno.email}</span>
              </div>
              <div className="modal__dado">
                <FiHash /> <span>Matrícula {aluno.matricula}</span>
              </div>
              <div className="modal__dado">
                <FiBookOpen /> <span>{aluno.turma} · {aluno.curso}</span>
              </div>
              <div className="modal__dado">
                <FiUser /> <span>Prof. {aluno.professor}</span>
              </div>
              <div className="modal__dado">
                <FiMapPin /> <span>{aluno.cidade}</span>
              </div>
              <div className="modal__dado">
                <FiCheckCircle /> <span>{aluno.turno} · {aluno.status}</span>
              </div>
              <div className="modal__dado">
                <FiCalendar /> <span>Matriculado em {formatarData(aluno.data_matricula)}</span>
              </div>
            </div>

            <div className="modal__notas">
              <div className="modal__notas-head">
                <h3>Notas e média final</h3>
                <div className="modal__media">
                  <span className="modal__media-label">Média final</span>
                  <span className="modal__media-valor">
                    {formatarMedia(aluno.media_final)}
                  </span>
                </div>
              </div>

              {aluno.notas.length === 0 ? (
                <p className="modal__sem-notas">Esta matrícula ainda não possui notas.</p>
              ) : (
                <ul className="modal__lista-notas">
                  {aluno.notas.map((n, i) => {
                    const notaSit = situacaoPorMedia(n.nota);
                    return (
                      <li key={i} className="modal__nota-item">
                        <span className="modal__disciplina">{n.avaliacao}</span>
                        <div className="modal__nota-barra">
                          <span
                            className={`modal__nota-fill modal__nota-fill--${notaSit.tipo}`}
                            style={{ width: `${(Number(n.nota) / 10) * 100}%` }}
                          />
                        </div>
                        <strong className="modal__nota-valor">
                          {formatarMedia(n.nota)}
                        </strong>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
