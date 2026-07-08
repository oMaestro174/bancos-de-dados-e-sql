import './StatCard.css';

export default function StatCard({ icon, valor, label, cor = 'primary' }) {
  return (
    <div className="statcard">
      <div className={`statcard__icon statcard__icon--${cor}`}>{icon}</div>
      <div className="statcard__body">
        <span className="statcard__valor">{valor}</span>
        <span className="statcard__label">{label}</span>
      </div>
    </div>
  );
}
