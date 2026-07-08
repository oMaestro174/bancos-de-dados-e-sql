import { formatarData, formatarMedia } from './format';

export function exportarAlunosCsv(alunos) {
  const cabecalho = ['Nome', 'Email', 'Matrícula', 'Turma', 'Curso', 'Turno', 'Data de Matrícula', 'Média Final'];

  const linhas = alunos.map((a) => [
    a.nome,
    a.email,
    a.matricula,
    a.turma,
    a.curso,
    a.turno,
    formatarData(a.data_matricula),
    formatarMedia(a.media_final),
  ]);

  // Escapa aspas e envolve cada campo — evita quebra em nomes com vírgula.
  const csv = [cabecalho, ...linhas]
    .map((linha) => linha.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';'))
    .join('\n');

  //garante acentuação correta ao abrir no Excel.
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'alunos.csv';
  link.click();
  URL.revokeObjectURL(url);
}
