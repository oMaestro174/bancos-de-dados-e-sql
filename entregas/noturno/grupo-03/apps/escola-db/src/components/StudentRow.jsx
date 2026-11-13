function StudentRow({ aluno }) {
  return (
    <tr>
      <td>{aluno.aluno}</td>

      <td>{aluno.turma}</td>

      <td>{aluno.data_matricula}</td>

      <td>{aluno.nota1}</td>

      <td>{aluno.nota2}</td>

      <td>{aluno.nota3}</td>

      <td>{aluno.media}</td>
    </tr>
  );
}

export default StudentRow;