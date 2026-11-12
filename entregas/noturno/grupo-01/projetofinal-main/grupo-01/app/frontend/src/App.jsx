import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import LoginPage from "./components/LoginPage.jsx";
import StudentsPage from "./components/StudentsPage.jsx";
import ClassesPage from "./components/ClassesPage.jsx";
import StudentModal from "./components/StudentModal.jsx";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import { calculateAverage } from "./utils/grades.js";

function mapStudent(student, classLookup) {
  const className = student.turma || "Sem turma";

  return {
    id: student.id_aluno,
    name: student.nome,
    email: student.email,
    classId: classLookup[className] || "",
    className,
    enrollment: String(student.id_aluno),
    enrollmentDate: student.data_matricula || student.data_nascimento || "",
    grades: Array.isArray(student.notas) ? student.notas : [],
    average:
      typeof student.media === "number"
        ? student.media
        : calculateAverage(Array.isArray(student.notas) ? student.notas : []),
    active: true,
    cidade: student.cidade || "",
    data_nascimento: student.data_nascimento || "",
  };
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("alunos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterClassId, setFilterClassId] = useState("");

  function handleViewClass(classId) {
    setFilterClassId(String(classId));
    setActivePage("alunos");
  }

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);

    try {
      const [studentsResponse, classesResponse] = await Promise.all([
        fetch("/api/alunos").then(async (response) => {
          if (!response.ok) {
            throw new Error("Não foi possível carregar os alunos.");
          }

          return response.json();
        }),
        fetch("/api/turmas").then(async (response) => {
          if (!response.ok) {
            throw new Error("Não foi possível carregar as turmas.");
          }

          return response.json();
        }),
      ]);

      const normalizedClasses = (classesResponse || []).map((classItem) => ({
        id: classItem.id_turma,
        name: classItem.nome_turma,
      }));
      const classLookup = Object.fromEntries(
        normalizedClasses.map((classItem) => [
          classItem.name,
          String(classItem.id),
        ]),
      );

      setStudents(
        (studentsResponse || []).map((student) =>
          mapStudent(student, classLookup),
        ),
      );
      setClasses(normalizedClasses);
    } catch (error) {
      alert(error.message || "Erro ao carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setActivePage("alunos");
    setIsModalOpen(false);
  }

  function handleOpenCreate() {
    setModalMode("create");
    setSelectedStudent(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(student) {
    setModalMode("edit");
    setSelectedStudent(student);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setModalMode("create");
  }

  async function handleDeleteStudent(student) {
    const confirmed = window.confirm(`Deseja remover ${student.name}?`);

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/alunos/${student.id}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Não foi possível remover o aluno.");
      }

      await loadData();
    } catch (error) {
      alert(error.message || "Erro ao remover aluno.");
    }
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <ParticlesBackground />
      <Header
        activePage={activePage}
        onChangePage={(page) => {
          setActivePage(page);
          if (page === "alunos") setFilterClassId("");
        }}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {activePage === "alunos" && (
          <StudentsPage
            students={students}
            classes={classes}
            onOpenNewStudent={handleOpenCreate}
            onEditStudent={handleOpenEdit}
            onDeleteStudent={handleDeleteStudent}
            isLoading={isLoading}
            initialSelectedClass={filterClassId}
          />
        )}

        {activePage === "turmas" && (
          <ClassesPage 
            classes={classes} 
            students={students} 
            onViewClass={handleViewClass}
          />
        )}
      </main>

      {isModalOpen && (
        <StudentModal
          mode={modalMode}
          student={selectedStudent}
          onClose={handleCloseModal}
          onSaved={loadData}
        />
      )}
    </div>
  );
}
