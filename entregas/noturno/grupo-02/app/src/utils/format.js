export function formatarData(iso) {
  if (!iso) return '—';
  const [ano, mes, dia] = iso.split('T')[0].split('-');
  return `${dia}/${mes}/${ano}`;
}

// Formata a média com 1 casa decimal e vírgula (padrão pt-BR).
export function formatarMedia(valor) {
  if (valor === null || valor === undefined) return '—';
  return Number(valor).toFixed(1).replace('.', ',');
}

// Classifica a situação do aluno a partir da média final.
export function situacaoPorMedia(media) {
  if (media === null || media === undefined) return { label: 'Sem notas', tipo: 'neutro' };
  const m = Number(media);
  if (m >= 7) return { label: 'Aprovado', tipo: 'success' };
  if (m >= 5) return { label: 'Recuperação', tipo: 'warning' };
  return { label: 'Reprovado', tipo: 'error' };
}

// Iniciais para o avatar (ex.: "Ana Beatriz Souza" -> "AS").
export function iniciais(nome = '') {
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}
