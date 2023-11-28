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
      const response = await Api.get("http://127.0.0.1:7777/contadorPorTipo");
      const data = response.data;
      setTipoCounts(data);
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar contagem por tipo!");
    }
  };

  const convertTipoCountsToChartData = (tipoCounts) => {
    const chartData = [["Tipo", "Quantidade"]];

    for (const tipo in tipoCounts) {
      chartData.push([tipo, tipoCounts[tipo]]);
    }

    return chartData;
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
    ["Monitor", 5],
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
        {Object.keys(tipoCounts).map((tipo) => (
          <Chart
            key={tipo}
            width={"500px"}
            height={"300px"}
            chartType="PieChart"
            data={convertTipoCountsToChartData({ [tipo]: tipoCounts[tipo] })}
            options={{ title: tipo }}
            style={chartStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default Relatorio;
