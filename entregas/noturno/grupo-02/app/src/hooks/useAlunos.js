import { useEffect, useState } from 'react';
import { alunosService } from '../services/api';

const PAGINACAO_INICIAL = { total: 0, pagina: 1, limite: 10, totalPaginas: 1 };

export function useAlunos(filtros) {
  const [alunos, setAlunos] = useState([]);
  const [paginacao, setPaginacao] = useState(PAGINACAO_INICIAL);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro(null);

    alunosService
      .listar(filtros)
      .then((resp) => {
        if (!ativo) return;
        setAlunos(resp.dados);
        setPaginacao({
          total: resp.total,
          pagina: resp.pagina,
          limite: resp.limite,
          totalPaginas: resp.totalPaginas,
        });
      })
      .catch((e) => {
        if (ativo) setErro(e.message || 'Falha ao carregar alunos.');
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [JSON.stringify(filtros)]);

  return { alunos, paginacao, carregando, erro };
}
