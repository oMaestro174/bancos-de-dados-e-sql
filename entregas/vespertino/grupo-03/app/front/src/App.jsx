import { useState, useEffect } from "react";
import "./App.css";
import Cabecalho from "./components/Cabecalho.jsx";
import Busca from "./components/Busca.jsx";
import FiltroTurma from "./components/FiltroTurma.jsx";
import Row from "./components/Row.jsx";
import Container from "./components/Container.jsx";
import TabelaAlunos from "./components/TabelaAlunos.jsx";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [termo, setTermo] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/turmas")
      .then((res) => res.json())
      .then(setTurmas);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (termo) params.append("nome", termo);

    if (turmaSelecionada) params.append("turma", turmaSelecionada);

    fetch(`http://localhost:5000/api/alunos?${params.toString()}`)
      .then((res) => res.json())
      .then(setAlunos);
  }, [termo, turmaSelecionada]);

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

      <TabelaAlunos alunos={alunos} />
    </Container>
  );
}

export default App;