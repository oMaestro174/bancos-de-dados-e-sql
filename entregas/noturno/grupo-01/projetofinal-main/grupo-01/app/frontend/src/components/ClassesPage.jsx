export default function ClassesPage({ classes, students, onViewClass }) {
  function countActiveStudents(classId) {
    return students.filter((student) => String(student.classId) === String(classId) && student.active).length
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Gerenciar turmas</h1>
          <p>{classes.length} turmas cadastradas</p>
        </div>

        <button type="button" className="primary-button">
          Nova turma
        </button>
      </div>

      <div className="classes-grid">
        {classes.map((classItem) => (
          <article className="class-card" key={classItem.id}>
            <div>
              <h2>{classItem.name}</h2>
              <p>{countActiveStudents(classItem.id)} alunos ativos</p>
            </div>

            <button type="button" className="table-action" onClick={() => onViewClass && onViewClass(classItem.id)}>
              Ver turma
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
