export default function FiltroTurma({ turmas, selecionada, onChange }) {
  return (
    <select
      value={selecionada}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-64 rounded-md border border-slate-300 bg-white px-4 py-2"
    >
      <option value="">Todas as turmas</option>

      {turmas.map((t) => (
        <option key={t.id_turma} value={t.id_turma}>
          {t.nome_turma} — {t.turno}
        </option>
      ))}
    </select>
  );
}