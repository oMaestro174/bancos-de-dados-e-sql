import './Badge.css';

export default function Badge({ children, tipo = 'neutro' }) {
  return <span className={`badge badge--${tipo}`}>{children}</span>;
}
