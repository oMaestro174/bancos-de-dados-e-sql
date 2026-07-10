import { formatDate, formatGrades } from "../utils/formatters.js";
import { EditIcon, TrashIcon } from "./icons.jsx";

export default function StudentsTable({
  students,
  onEditStudent,
  onDeleteStudent,
}) {
  return (
    <div className="table-wrapper">
      <table className="students-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Turma</th>
            <th>Matrícula</th>
            <th>Data da matrícula</th>
            <th>Notas</th>
            <th>Média</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <strong>{student.name}</strong>
                {!student.active && (
                  <span className="inactive-label">Inativo</span>
                )}
              </td>
              <td>{student.email}</td>
              <td>{student.className}</td>
              <td>{student.enrollment}</td>
              <td>{formatDate(student.enrollmentDate)}</td>
              <td>{formatGrades(student.grades)}</td>
              <td>
                <span
                  className={
                    student.average >= 7 ? "grade approved" : "grade failed"
                  }
                >
                  {student.average.toFixed(1)}
                </span>
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
