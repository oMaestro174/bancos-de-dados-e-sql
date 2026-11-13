export default function Busca({ termo, onChange }) {
  return (
    <div className="relative w-full sm:w-80">
      <input
        type="text"
        value={termo}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar por nome..."
        className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 pr-9
                   text-sm text-slate-700 shadow-sm placeholder:text-slate-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {termo && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="Limpar busca"
        >
          ×
        </button>
      )}
    </div>
  );
} 