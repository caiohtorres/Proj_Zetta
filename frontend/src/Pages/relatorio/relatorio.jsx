import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Api from "../../Services/api";
import "./relatorio.css";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

const listaTipoEletrodomesticos = [
  "Geladeira",
  "Fogao",
  "Bebedouro",
  "Ar",
  "Microondas",
  "Televisao",
];

const listaTipoEletronicos = [
  "Desktop",
  "Monitor",
  "Workstation",
  "Notebook",
  "Impressora",
  "noBreak",
];

const listaTipoMoveis = ["Mesa", "Cadeira"];

function Relatorio() {
  const [tipoCounts, setTipoCounts] = useState({});

  useEffect(() => {
    getCountByType();
  }, []);

  const getCountByType = async () => {
    try {
      const response = await Api.get(
        "http://177.105.35.235:7777/contadorPorTipo"
      );
      const data = response.data;
      setTipoCounts(data);
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar contagem por tipo!");
    }
  };

  const convertTipoCountsToChartDataEletrodomesticos = () => {
    const tipoEletrodomesticos = [["TipoEletrodomesticos", "Quantidade"]];

    for (const tipo in tipoCounts) {
      if (listaTipoEletrodomesticos.includes(tipo)) {
        tipoEletrodomesticos.push([tipo, tipoCounts[tipo]]);
      }
    }

    return tipoEletrodomesticos;
  };

  const convertTipoCountsToChartDataEletronicos = () => {
    const tipoEletronicos = [["TipoEletronicos", "Quantidade"]];

    for (const tipo in tipoCounts) {
      if (listaTipoEletronicos.includes(tipo)) {
        tipoEletronicos.push([tipo, tipoCounts[tipo]]);
      }
    }

    return tipoEletronicos;
  };

  const convertTipoCountsToChartDataMoveis = () => {
    const tipoMoveis = [["TipoMoveis", "Quantidade"]];

    for (const tipo in tipoCounts) {
      if (listaTipoMoveis.includes(tipo)) {
        tipoMoveis.push([tipo, tipoCounts[tipo]]);
      }
    }

    return tipoMoveis;
  };

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
            <Link to="/home">
              <Sair />
            </Link>
          </li>
        </ul>
      </div>
      <div className="graficos">
        <div className="tipoEletronicos">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            data={convertTipoCountsToChartDataEletronicos()}
            options={{ title: "Eletrônicos" }}
            style={chartStyle}
          />
        </div>
        <div className="tipoEletrodomesticos">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            data={convertTipoCountsToChartDataEletrodomesticos()}
            options={{ title: "Eletrodomésticos" }}
            style={chartStyle}
          />
        </div>
        <div className="tipoMoveis">
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="PieChart"
            data={convertTipoCountsToChartDataMoveis()}
            options={{ title: "Móveis" }}
            style={chartStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default Relatorio;
