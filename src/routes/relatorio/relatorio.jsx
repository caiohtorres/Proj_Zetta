import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Api from "../../services/api";
import "./relatorio.css";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

function Relatorio() {
  const [data, setData] = useState({});
  const [tipoCounts, setTipoCounts] = useState({});

  useEffect(() => {
    getCountByType();
  }, []);

  const getCountByType = async () => {
    try {
      const response = await Api.get(
        "http://127.0.0.1:7777/annotations/countByType"
      );
      const data = response.data;
      setTipoCounts(data);
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar contagem por tipo!");
    }
  };

  const [tituloEletronicos] = useState({
    title: "Eletônicos",
  });

  const [tituloOutros] = useState({
    title: "Outros",
  });
  const [dataEletronicos] = useState([
    ["Equipamentos", "Quantidade"],
    ["Desktop", tipoCounts.desktop || 0],
    ["Workstation", 2],
    ["Monitor", 1],
  ]);
  const [dataOutros] = useState([
    ["Outros", "Quantidade"],
    ["Mesa", 100],
    ["Cadeira", 80],
    ["Geladeira", 50],
  ]);

  const chartStyle = {
    width: "100%",
    height: "400px",
  };
  return (
    <div id="consultar">
      <div className="cabecalho">
        <ul>
          <li id="incluindo">Relatório</li>
          <li id="sair">
            <Link to="/">
              <Sair />
            </Link>
          </li>
        </ul>
      </div>
      <div className="tipoCounts">
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          data={dataEletronicos}
          options={tituloEletronicos}
          style={chartStyle}
        />{" "}
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="PieChart"
          data={dataOutros}
          options={tituloOutros}
          style={chartStyle}
        />{" "}
      </div>
    </div>
  );
}

export default Relatorio;
