import React, { useEffect, useState } from "react";
import Api from "../../Services/api";
import "./home.css";

function App() {
  const [entradaInsumos, setEntradaInsumos] = useState(null);
  const [saidaInsumos, setSaidaInsumos] = useState(null);
  const [emprestimos, setEmprestimos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/insumos");
        const data = await response.json();
        setEntradaInsumos(data.entradaInsumos);
        setSaidaInsumos(data.saidaInsumos);
        setEmprestimos(data.emprestimos);
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="app">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="homebody"></div>
    </div>
  );
}

export default App;
