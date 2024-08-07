import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import styled from "styled-components";
import Api from "../../Services/api";
import "./dashboard.css";

// Registra todos os componentes do Chart.js
Chart.register(...registerables);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin-top: 7px;
`;

const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 50px;

  h1 {
    color: black;
    font-size: 1.5em;
    font-style: normal;
    font-weight: 400;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  height: 150px;
  flex-wrap: wrap; /* Permite que os elementos se ajustem em múltiplas linhas */

  @media (max-width: 1100px) {
    gap: 5px;
    margin-bottom: 10px;
    height: auto;
  }
`;

const SummaryBox = styled.button`
  background-color: ${(props) => (props.active ? props.activeColor : "white")};
  color: ${(props) => (props.active ? "white" : "#909090")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  width: 350px;
  text-align: right;
  display: flex;
  justify-content: space-between;

  h3 {
    text-align: right;
  }

  &:hover {
    color: white;
    background-color: ${(props) => props.activeColor};
    p {
      color: white;
    }
  }

  img {
    position: relative;
    width: 100px;
    display: flex;
    top: -50px;
  }

  @media (max-width: 1100px) {
    width: 100%; /* Para ocupar toda a largura disponível em dispositivos menores */
    padding: 10px;
    img {
      width: 50px; /* Reduz o tamanho da imagem em dispositivos menores */
      top: -25px;
    }

    h3 {
      font-size: 1em;
    }
  }
`;

const ChartTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 1100px) {
    margin-bottom: 30px;
    margin-top: 10px;
  }

  @media (max-width: 650px) {
    gap: 5px;
    margin-bottom: 10px;
  }
`;

const ChartTypeButton = styled.button`
  background-color: transparent !important;
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  img {
    filter: ${(props) => (props.active ? "brightness(0)" : "none")};
  }

  &:hover {
    color: white;

    img {
      filter: brightness(0);
    }
  }
`;

const ChartContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const ChartBox = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;

  h3 {
    text-align: center;
    color: #495057;
    margin-bottom: 20px;
  }

  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;

const LegendBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  width: 100%;

  h3 {
    text-align: center;
    color: #495057;
    margin-bottom: 20px;
  }

  ul {
    display: grid;
    list-style-type: none;
    padding: 0;

    li {
      color: #343a40;
      font-size: 1rem;
      margin-bottom: 10px;
    }
  }
`;

const Dashboard = () => {
  const [tipoCounts, setTipoCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Eletrônicos");
  const [chartType, setChartType] = useState("Doughnut");
  const [activeChartType, setActiveChartType] = useState("Doughnut");

  useEffect(() => {
    getCountByType();
  }, []);

  const getCountByType = async () => {
    try {
      const response = await Api.get("/contadorPorTipo/");
      const data = response.data;
      setTipoCounts(data);
    } catch (err) {
      alert("Erro ao buscar contagem por tipo!");
    }
  };

  const generateLegend = (tipoList) => {
    const total = tipoList.reduce(
      (acc, tipo) => acc + (tipoCounts[tipo] || 0),
      0
    );
    return tipoList.map((tipo) => ({
      nome: tipo,
      quantidade: tipoCounts[tipo] || 0,
      porcentagem:
        total > 0 ? ((tipoCounts[tipo] / total) * 100).toFixed(2) : 0,
    }));
  };

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

  const legendasEletronicos = generateLegend(listaTipoEletronicos);
  const legendasEletrodomesticos = generateLegend(listaTipoEletrodomesticos);
  const legendasMoveis = generateLegend(listaTipoMoveis);

  const chartData = {
    labels:
      selectedCategory === "Eletrônicos"
        ? listaTipoEletronicos
        : selectedCategory === "Eletrodomésticos"
        ? listaTipoEletrodomesticos
        : listaTipoMoveis,
    datasets: [
      {
        data:
          selectedCategory === "Eletrônicos"
            ? legendasEletronicos.map((item) => item.quantidade)
            : selectedCategory === "Eletrodomésticos"
            ? legendasEletrodomesticos.map((item) => item.quantidade)
            : legendasMoveis.map((item) => item.quantidade),
        backgroundColor: [
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
        ],
      },
    ],
  };

  const totalSelectedCategory =
    selectedCategory === "Eletrônicos"
      ? legendasEletronicos.reduce((sum, item) => sum + item.quantidade, 0)
      : selectedCategory === "Eletrodomésticos"
      ? legendasEletrodomesticos.reduce((sum, item) => sum + item.quantidade, 0)
      : legendasMoveis.reduce((sum, item) => sum + item.quantidade, 0);

  const legendasAtuais =
    selectedCategory === "Eletrônicos"
      ? legendasEletronicos
      : selectedCategory === "Eletrodomésticos"
      ? legendasEletrodomesticos
      : legendasMoveis;

  const renderChart = () => {
    switch (chartType) {
      case "Pie":
        return <Pie data={chartData} />;
      case "Bar":
        return <Bar data={chartData} options={{ indexAxis: "y" }} />;
      case "Doughnut":
      default:
        return <Doughnut data={chartData} />;
    }
  };

  return (
    <div className="tudo-dashboard">
      <DashboardContainer>
        <Header>
          <h1>Dashboard de Controle Patrimonial</h1>
        </Header>
        <SummaryContainer>
          <SummaryBox
            active={selectedCategory === "Eletrônicos"}
            activeColor="#67CBFF"
            onClick={() => setSelectedCategory("Eletrônicos")}
          >
            <img
              src={require("../img/Frame 170.png")}
              alt="eletronicoimg"
              width={30}
            />
            <div>
              <h2>Eletrônicos</h2>
              <p>
                {legendasEletronicos.reduce(
                  (sum, item) => sum + item.quantidade,
                  0
                )}
              </p>
            </div>
          </SummaryBox>
          <SummaryBox
            active={selectedCategory === "Eletrodomésticos"}
            activeColor="#C97CFF"
            onClick={() => setSelectedCategory("Eletrodomésticos")}
          >
            <img
              src={require("../img/Frame 174.png")}
              alt="eletrodomesticoimg"
              width={30}
            />
            <div>
              <h2>Eletrodomésticos</h2>
              <p>
                {legendasEletrodomesticos.reduce(
                  (sum, item) => sum + item.quantidade,
                  0
                )}
              </p>
            </div>
          </SummaryBox>
          <SummaryBox
            active={selectedCategory === "Móveis"}
            activeColor="#FCC467"
            onClick={() => setSelectedCategory("Móveis")}
          >
            <img
              src={require("../img/Frame 172.png")}
              alt="movelimg"
              width={30}
            />
            <div>
              <h2>Móveis</h2>
              <p>
                {legendasMoveis.reduce((sum, item) => sum + item.quantidade, 0)}
              </p>
            </div>
          </SummaryBox>
        </SummaryContainer>
        <ChartTypeContainer>
          <ChartTypeButton
            active={activeChartType === "Doughnut"}
            onClick={() => {
              setChartType("Doughnut");
              setActiveChartType("Doughnut");
            }}
          >
            <img
              src={require("../img/_01-Donuts-Chart.png")}
              alt="Doughnut Chart"
              width={30}
            />
          </ChartTypeButton>
          <ChartTypeButton
            active={activeChartType === "Pie"}
            onClick={() => {
              setChartType("Pie");
              setActiveChartType("Pie");
            }}
          >
            <img src={require("../img/Pizza.png")} alt="Pie Chart" width={30} />
          </ChartTypeButton>
          <ChartTypeButton
            active={activeChartType === "Bar"}
            onClick={() => {
              setChartType("Bar");
              setActiveChartType("Bar");
            }}
          >
            <img src={require("../img/Barra.png")} alt="Bar Chart" width={30} />
          </ChartTypeButton>
        </ChartTypeContainer>
        <ChartContainer>
          <ChartBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Total por {selectedCategory}</h3>
            {renderChart()}
          </ChartBox>
          <LegendBox>
            <h3>Detalhes</h3>
            <ul>
              {legendasAtuais.map((item) => (
                <li key={item.nome}>
                  {item.nome}: {item.quantidade}
                </li>
              ))}
            </ul>
          </LegendBox>
        </ChartContainer>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;
