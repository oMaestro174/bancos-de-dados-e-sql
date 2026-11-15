import { FiSearch, FiX } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...',
  label,
}) {
  return (
    <div className="searchbar">
      {label && <label className="searchbar__label">{label}</label>}
      <div className="searchbar__field">
        <FiSearch className="searchbar__icon" aria-hidden />
        <input
          type="search"
          className="searchbar__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={label || placeholder}
        />
        {value && (
          <button
            className="searchbar__clear"
            onClick={() => onChange('')}
            aria-label="Limpar busca"
          >
            <FiX />
          </button>
        )}
      </div>
    </div>
  );
}
