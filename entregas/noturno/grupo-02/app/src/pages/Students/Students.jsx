import { useEffect, useMemo, useState } from 'react';
import { FiDownload, FiUsers } from 'react-icons/fi';
import SearchBar from '../../components/SearchBar/SearchBar';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import StudentsTable from '../../components/StudentsTable/StudentsTable';
import StudentModal from '../../components/Modal/StudentModal';
import EmptyState from '../../components/EmptyState/EmptyState';
import Pagination from '../../components/Pagination/Pagination';
import { TableSkeleton } from '../../components/Loading/Loading';
import { useAlunos } from '../../hooks/useAlunos';
import { useDebounce } from '../../hooks/useDebounce';
import { useTurmas } from '../../hooks/useTurmas';
import { useToast } from '../../contexts/ToastContext';
import { exportarAlunosCsv } from '../../utils/exportCsv';
import './Students.css';

export default function Students() {
  const LIMITE = 10; // registros por página

  const [busca, setBusca] = useState('');
  const [turma, setTurma] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('nome');
  const [ordem, setOrdem] = useState('asc');
  const [pagina, setPagina] = useState(1);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  const buscaDebounced = useDebounce(busca, 400);
  const { turmas } = useTurmas();
  const { showToast } = useToast();

  // Ao mudar qualquer filtro/ordenação, volta para a primeira página.
  useEffect(() => {
    setPagina(1);
  }, [buscaDebounced, turma, ordenarPor, ordem]);

  const filtros = useMemo(
    () => ({ nome: buscaDebounced, turma, ordenarPor, ordem, pagina, limite: LIMITE }),
    [buscaDebounced, turma, ordenarPor, ordem, pagina]
  );
  const { alunos, paginacao, carregando, erro } = useAlunos(filtros);

  const opcoesTurma = [
    { value: '', label: 'Todas as turmas' },
    ...turmas.map((t) => ({ value: String(t.id_turma), label: t.nome })),
  ];

  // Clique no cabeçalho: alterna a direção ou troca a coluna de ordenação.
  const handleOrdenar = (coluna) => {
    if (coluna === ordenarPor) {
      setOrdem((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrdenarPor(coluna);
      setOrdem('asc');
    }
  };

  const handleExportar = () => {
    if (!alunos.length) {
      showToast('Não há alunos para exportar.', 'info');
      return;
    }
    exportarAlunosCsv(alunos);
    showToast('Arquivo alunos.csv gerado com sucesso!', 'success');
  };

  return (
    <div className="container page">
      <div className="page-header students__header">
        <div>
          <h1>Alunos matriculados</h1>
          <p>Consulte, filtre e visualize os detalhes de cada aluno.</p>
        </div>
        <Button variant="secondary" icon={<FiDownload />} onClick={handleExportar}>
          Exportar CSV
        </Button>
      </div>

      <Card className="students__filtros">
        <div className="students__filtro-busca">
          <SearchBar
            label="Buscar por nome"
            value={busca}
            onChange={setBusca}
            placeholder="Digite o nome do aluno..."
          />
        </div>
        <Select
          id="filtro-turma"
          label="Filtrar por turma"
          value={turma}
          onChange={setTurma}
          options={opcoesTurma}
        />
        <Select
          id="ordenar"
          label="Ordenar por"
          value={ordenarPor}
          onChange={setOrdenarPor}
          options={[
            { value: 'nome', label: 'Nome' },
            { value: 'matricula', label: 'Matrícula' },
            { value: 'turma', label: 'Turma' },
            { value: 'media', label: 'Média final' },
            { value: 'data', label: 'Data de matrícula' },
          ]}
        />
      </Card>

      <div className="students__resumo">
        <FiUsers />
        <span>
          {carregando
            ? 'Buscando...'
            : `${paginacao.total} aluno(s) encontrado(s)`}
        </span>
      </div>

      <Card className="students__tabela-card">
        {carregando ? (
          <TableSkeleton linhas={7} colunas={6} />
        ) : erro ? (
          <EmptyState
            erro
            titulo="Não foi possível carregar os alunos"
            descricao="Verifique se a API está no ar e tente novamente."
          />
        ) : alunos.length === 0 ? (
          <EmptyState
            titulo="Nenhum aluno encontrado"
            descricao="Ajuste a busca ou o filtro de turma."
          />
        ) : (
          <>
            <StudentsTable
              alunos={alunos}
              ordenarPor={ordenarPor}
              ordem={ordem}
              onOrdenar={handleOrdenar}
              onSelecionar={setAlunoSelecionado}
            />
            <Pagination
              pagina={paginacao.pagina}
              totalPaginas={paginacao.totalPaginas}
              total={paginacao.total}
              limite={paginacao.limite}
              onMudar={setPagina}
            />
          </>
        )}
      </Card>

      <StudentModal
        alunoId={alunoSelecionado}
        onClose={() => setAlunoSelecionado(null)}
      />
    </div>
  );
}
