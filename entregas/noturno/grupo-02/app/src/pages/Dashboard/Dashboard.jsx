import { useEffect, useState } from 'react';
import { FiUsers, FiLayers, FiBookOpen, FiAward } from 'react-icons/fi';
import StatCard from '../../components/StatCard/StatCard';
import Card from '../../components/Card/Card';
import { Spinner } from '../../components/Loading/Loading';
import EmptyState from '../../components/EmptyState/EmptyState';
import { alunosService } from '../../services/api';
import { formatarMedia } from '../../utils/format';
import './Dashboard.css';

export default function Dashboard() {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    alunosService
      .estatisticas()
      .then(setDados)
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <div className="container page"><Spinner texto="Carregando dashboard..." /></div>;
  if (erro || !dados)
    return (
      <div className="container page">
        <EmptyState
          erro
          titulo="Não foi possível carregar as estatísticas"
          descricao="Confirme se a API está rodando e conectada ao banco."
        />
      </div>
    );

  const { geral, porTurma } = dados;
  const maxMedia = 10;

  return (
    <div className="container page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral dos alunos matriculados na instituição.</p>
      </div>

      <div className="dash__stats">
        <StatCard icon={<FiUsers />}    valor={geral.total_alunos}       label="Alunos matriculados" cor="primary" />
        <StatCard icon={<FiLayers />}   valor={geral.total_turmas}       label="Turmas ativas"       cor="info" />
        <StatCard icon={<FiBookOpen />} valor={geral.total_cursos}       label="Cursos"              cor="warning" />
        <StatCard icon={<FiAward />}    valor={formatarMedia(geral.media_geral)} label="Média geral" cor="success" />
      </div>

      <Card className="dash__chart">
        <h2 className="dash__chart-titulo">Média final por turma</h2>
        <div className="dash__barras">
          {porTurma.map((t) => (
            <div className="dash__barra-item" key={t.turma}>
              <div className="dash__barra-info">
                <span className="dash__barra-turma">{t.turma} — {t.curso}</span>
                <span className="dash__barra-meta">
                  {t.total_alunos} aluno(s) · {t.turno}
                </span>
              </div>
              <div className="dash__barra-track">
                <div
                  className="dash__barra-fill"
                  style={{ width: `${((t.media_turma || 0) / maxMedia) * 100}%` }}
                >
                  <span className="dash__barra-valor">
                    {formatarMedia(t.media_turma)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
