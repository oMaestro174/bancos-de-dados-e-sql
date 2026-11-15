import './Select.css';

export default function Select({ label, value, onChange, options, id }) {
  return (
    <div className="select">
      {label && (
        <label className="select__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="select__field">
        <select
          id={id}
          className="select__control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
