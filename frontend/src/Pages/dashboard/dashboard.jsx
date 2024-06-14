// Dashboard.js
import { Chart, registerables } from "chart.js";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
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
  margin-bottom: 20px;

  h1 {
    color: black;
    font-size: 1.5em;
    font-style: normal;
    font-weight: 400;
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
  background-color: #f8f9fa;
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

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SummaryBox = styled.button`
  background-color: ${(props) =>
    props.active ? props.activeColor : "#f8f9fa"};
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  width: 150px;
  text-align: center;

  h3 {
    margin-bottom: 10px;
  }

  &:hover {
    color: white;
    background-color: ${(props) => props.activeColor};
  }
`;

const LegendBox = styled.div`
  background-color: #f8f9fa;
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

  const doughnutData = {
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

  return (
    <div className="tudo-dashboard">
      <DashboardContainer>
        <Header>
          <h1>Dashboard de Controle Patrimonial</h1>
        </Header>
        <SummaryContainer>
          <SummaryBox
            active={selectedCategory === "Eletrônicos"}
            activeColor="#80549F"
            onClick={() => setSelectedCategory("Eletrônicos")}
          >
            <h3>Eletrônicos</h3>
          </SummaryBox>
          <SummaryBox
            active={selectedCategory === "Eletrodomésticos"}
            activeColor="#66A959"
            onClick={() => setSelectedCategory("Eletrodomésticos")}
          >
            <h3>Eletrodomésticos</h3>
          </SummaryBox>
          <SummaryBox
            active={selectedCategory === "Móveis"}
            activeColor="#53A2CB"
            onClick={() => setSelectedCategory("Móveis")}
          >
            <h3>Móveis</h3>
          </SummaryBox>
        </SummaryContainer>
        <ChartContainer>
          <ChartBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Total por {selectedCategory}</h3>
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                      },
                    },
                  },
                  centerText: {
                    display: true,
                    text: totalSelectedCategory,
                  },
                },
              }}
            />
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
