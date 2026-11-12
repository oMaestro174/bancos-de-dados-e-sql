import { useMemo, useState } from "react";
import FiltersBar from "./FiltersBar.jsx";
import StudentsTable from "./StudentsTable.jsx";
import StudentCards from "./StudentCards.jsx";
import EmptyState from "./EmptyState.jsx";
import LoadingRows from "./LoadingRows.jsx";

const INITIAL_LIMIT = 5;

export default function StudentsPage({
  students,
  classes,
  onOpenNewStudent,
  onEditStudent,
  onDeleteStudent,
  isLoading,
}) {
  const [searchName, setSearchName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchEnrollment, setSearchEnrollment] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(INITIAL_LIMIT);

  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => showInactive || student.active)
      .filter((student) =>
        student.name.toLowerCase().includes(searchName.toLowerCase().trim()),
      )
      .filter((student) =>
        selectedClass ? student.classId === selectedClass : true,
      )
      .filter((student) =>
        searchEmail
          ? student.email
              .toLowerCase()
              .includes(searchEmail.toLowerCase().trim())
          : true,
      )
      .filter((student) =>
        searchEnrollment
          ? student.enrollment.includes(searchEnrollment.trim())
          : true,
      );
  }, [
    students,
    searchName,
    selectedClass,
    searchEmail,
    searchEnrollment,
    showInactive,
  ]);

  const visibleStudents = filteredStudents.slice(0, visibleLimit);
  const remaining = filteredStudents.length - visibleStudents.length;

  function handleClearFilters() {
    setSearchName("");
    setSelectedClass("");
    setSearchEmail("");
    setSearchEnrollment("");
    setShowInactive(false);
    setVisibleLimit(INITIAL_LIMIT);
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h1>Consulta de Alunos</h1>
          <p>{filteredStudents.length} alunos encontrados</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={onOpenNewStudent}
        >
          Novo aluno
        </button>
      </div>

      <FiltersBar
        classes={classes}
        searchName={searchName}
        selectedClass={selectedClass}
        searchEmail={searchEmail}
        searchEnrollment={searchEnrollment}
        showAdvanced={showAdvanced}
        showInactive={showInactive}
        onSearchName={setSearchName}
        onSelectClass={setSelectedClass}
        onSearchEmail={setSearchEmail}
        onSearchEnrollment={setSearchEnrollment}
        onToggleAdvanced={() => setShowAdvanced((current) => !current)}
        onToggleInactive={() => setShowInactive((current) => !current)}
        onClearFilters={handleClearFilters}
      />

      <div className="content-card">
        {isLoading ? (
          <LoadingRows />
        ) : visibleStudents.length > 0 ? (
          <>
            <StudentsTable
              students={visibleStudents}
              onEditStudent={onEditStudent}
              onDeleteStudent={onDeleteStudent}
            />
            <StudentCards
              students={visibleStudents}
              onEditStudent={onEditStudent}
              onDeleteStudent={onDeleteStudent}
            />

            {remaining > 0 && (
              <div className="load-more-area">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setVisibleLimit((current) => current + INITIAL_LIMIT)
                  }
                >
                  Carregar mais (+{remaining})
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState onClearFilters={handleClearFilters} />
        )}
      </div>
    </section>
  );
}
