import { useState } from "react";

import "./styles/App.css";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StudentsTable from "./components/StudentsTable";
import Footer from "./components/Footer";

import { alunos } from "./data/alunos";

function App() {
  const [busca, setBusca] = useState("");

  return (
    <>
      <Header />

      <main>
        <SearchBar
          busca={busca}
          setBusca={setBusca}
        />

        <StudentsTable alunos={alunos} />
      </main>

      <Footer />
    </>
  );
}

export default App;