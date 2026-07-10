export default function LoadingRows() {
  return (
    <div className="loading-state" aria-label="Carregando alunos">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="skeleton-row" key={index}>
          <span />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  )
}
