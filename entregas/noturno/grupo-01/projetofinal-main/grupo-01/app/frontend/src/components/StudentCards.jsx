import { formatDate, formatGrades } from "../utils/formatters.js";
import { EditIcon, TrashIcon } from "./icons.jsx";

export default function StudentCards({
  students,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <div className="student-cards">
      {students.map((student) => (
        <article className="student-card" key={student.id}>
          <div className="student-card-header">
            <div>
              <h3>{student.name}</h3>
              <p>{student.email}</p>
            </div>

            <span
              className={
                student.average >= 7 ? "grade approved" : "grade failed"
              }
            >
              {student.average.toFixed(1)}
            </span>
          </div>

          <dl className="student-details">
            <div>
              <dt>Turma</dt>
              <dd>{student.className}</dd>
            </div>
            <div>
              <dt>Matrícula</dt>
              <dd>{student.enrollment}</dd>
            </div>
            <div>
              <dt>Data</dt>
              <dd>{formatDate(student.enrollmentDate)}</dd>
            </div>
            <div>
              <dt>Notas</dt>
              <dd>{formatGrades(student.grades)}</dd>
            </div>
          </dl>

          <div className="row-actions">
            <button
              type="button"
              className="icon-button edit"
              aria-label={`Editar ${student.name}`}
              title="Editar"
              onClick={() => onEditStudent(student)}
            >
              <EditIcon />
            </button>
            <button
              type="button"
              className="icon-button delete"
              aria-label={`Excluir ${student.name}`}
              title="Excluir"
              onClick={() => onDeleteStudent(student)}
            >
              <TrashIcon />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
