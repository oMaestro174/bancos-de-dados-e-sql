import { useState, useEffect } from "react";
import "./App.css";
import Cabecalho from "./components/Cabecalho.jsx";
import Busca from "./components/Busca.jsx";
import FiltroTurma from "./components/FiltroTurma.jsx";
import Row from "./components/Row.jsx";
import alunosData from "./data/alunos.json";
import Container from "./components/Container.jsx";
import TabelaAlunos from "./components/TabelaAlunos.jsx";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [termo, setTermo] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/alunos")
      .then((res) => res.json())
      .then(setAlunos);

    fetch("http://localhost:5000/api/turmas")
      .then((res) => res.json())
      .then(setTurmas);
  }, []); // [] = roda só uma vez, ao montar o componente

  const alunosFiltrados = alunos
    .filter((a) => a.nome.toLowerCase().includes(termo.toLowerCase()))
    .filter(
      (a) => turmaSelecionada === "" || a.nome_turma === turmaSelecionada,
    );

  return (
    <Container>
      <Cabecalho />
      <Row>
        <Busca termo={termo} onChange={setTermo} />
        <FiltroTurma
          turmas={turmas}
          selecionada={turmaSelecionada}
          onChange={setTurmaSelecionada}
        />
      </Row>
      <TabelaAlunos alunos={alunosFiltrados} />
    </Container>
  );
}

export default App;
