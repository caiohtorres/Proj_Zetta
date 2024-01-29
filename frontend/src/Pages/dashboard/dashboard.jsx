import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Api from "../../Services/api";
import "./dashboard.css";

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
  "Switch",
];

const listaTipoMoveis = ["Mesa", "Cadeira"];

function Dashboard() {
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

  const gerarLegendaPorCategoria = (tipoCounts) => {
    const legenda = {
      eletronicos: {},
      eletrodomesticos: {},
      moveis: {},
    };

    const totalEletronicos = Object.entries(tipoCounts)
      .filter(([tipo]) => listaTipoEletronicos.includes(tipo))
      .reduce((acc, [_, count]) => acc + count, 0);

    const totalEletrodomesticos = Object.entries(tipoCounts)
      .filter(([tipo]) => listaTipoEletrodomesticos.includes(tipo))
      .reduce((acc, [_, count]) => acc + count, 0);

    const totalMoveis = Object.entries(tipoCounts)
      .filter(([tipo]) => listaTipoMoveis.includes(tipo))
      .reduce((acc, [_, count]) => acc + count, 0);

    for (const [nome, dados] of Object.entries(tipoCounts)) {
      let totalGrafico;
      if (listaTipoEletronicos.includes(nome)) {
        totalGrafico = totalEletronicos;
        legenda.eletronicos[nome] = {
          nome,
          quantidade: dados,
          porcentagem:
            totalGrafico > 0 ? ((dados / totalGrafico) * 100).toFixed(2) : 0,
        };
      } else if (listaTipoEletrodomesticos.includes(nome)) {
        totalGrafico = totalEletrodomesticos;
        legenda.eletrodomesticos[nome] = {
          nome,
          quantidade: dados,
          porcentagem:
            totalGrafico > 0 ? ((dados / totalGrafico) * 100).toFixed(2) : 0,
        };
      } else if (listaTipoMoveis.includes(nome)) {
        totalGrafico = totalMoveis;
        legenda.moveis[nome] = {
          nome,
          quantidade: dados,
          porcentagem:
            totalGrafico > 0 ? ((dados / totalGrafico) * 100).toFixed(2) : 0,
        };
      } else {
        // Handle other cases if needed
        // Default to 1 if the type is not recognized
        totalGrafico = 1;
      }
    }

    return legenda;
  };

  const legendasPorCategoria = gerarLegendaPorCategoria(tipoCounts);

  return (
    <div id="consultar">
      <div className="cabecalho">
        <ul>
          <li id="incluindo">Dashboard</li>
          <li id="sair">
            <Link to="/home">
              <RiArrowGoBackFill />
            </Link>
          </li>
        </ul>
      </div>
      <div className="legenda">
        <div className="legenda-categoria">
          <h3>Eletrônicos</h3>
          <table>
            <thead>
              <tr>
                <th>Nome do Objeto</th>
                <th>Quantidade</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(legendasPorCategoria.eletronicos).map(
                ([nome, dados]) => (
                  <tr key={nome}>
                    <td>{nome}</td>
                    <td>{dados.quantidade}</td>
                    <td>{dados.porcentagem}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="legenda-categoria">
          <h3>Eletrodomésticos</h3>
          <table>
            <thead>
              <tr>
                <th>Nome do Objeto</th>
                <th>Quantidade</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(legendasPorCategoria.eletrodomesticos).map(
                ([nome, dados]) => (
                  <tr key={nome}>
                    <td>{nome}</td>
                    <td>{dados.quantidade}</td>
                    <td>{dados.porcentagem}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="legenda-categoria">
          <h3>Móveis</h3>
          <table>
            <thead>
              <tr>
                <th>Nome do Objeto</th>
                <th>Quantidade</th>
                <th>Porcentagem</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(legendasPorCategoria.moveis).map(
                ([nome, dados]) => (
                  <tr key={nome}>
                    <td>{nome}</td>
                    <td>{dados.quantidade}</td>
                    <td>{dados.porcentagem}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
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

export default Dashboard;
