import { useEffect, useState } from 'react';
import { alunosService } from '../services/api';

export function useTurmas() {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    alunosService
      .turmas()
      .then(setTurmas)
      .catch(() => setTurmas([]));
  }, []);

  return { turmas };
}
