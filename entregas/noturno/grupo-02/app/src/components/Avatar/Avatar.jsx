import { iniciais } from '../../utils/format';
import './Avatar.css';

const CORES = [
  '#4f46e5', '#0ea5e9', '#16a34a', '#d97706',
  '#db2777', '#7c3aed', '#0891b2', '#ca8a04',
];

function corDoNome(nome = '') {
  let soma = 0;
  for (let i = 0; i < nome.length; i++) soma += nome.charCodeAt(i);
  return CORES[soma % CORES.length];
}

export default function Avatar({ nome, size = 40 }) {
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        background: corDoNome(nome),
        fontSize: size * 0.38,
      }}
      aria-hidden
    >
      {iniciais(nome)}
    </span>
  );
}
