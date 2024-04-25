import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Api from "../../Services/api";
import "./salas.css";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

const refreshPage = () => {
  window.location.reload();
};

const listaSalas = [
  "Administrativo",
  "Beco",
  "GEO",
  "MPF",
  "Cozinha",
  "Almoxarifado",
  "Criatividade",
  "Comunicação",
  "Treinamento",
  "Recepção",
  "Sociedade",
  "Projetos",
  "Coordenação",
  "Ara",
  "Vale",
  "Embrapii",
  "Inovação",
  "Lemaf",
  "Desfazimento",
  "Servidor 2º andar",
];

function Salas() {
  const [data, setData] = useState([]);
  const [salas, setSala] = useState("");
  const [showPatrimonios, setShowPatrimonios] = useState(false);

  const getAllPatrimonios = async () => {
    try {
      if (salas !== "") {
        const response = await Api.get(
          `http://177.105.35.235:7777/buscasala/${encodeURIComponent(salas)}`
        );

        const data = response.data;
        setData(data);
        setShowPatrimonios(true);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar os patrimônios!");
      refreshPage();
    }
  };

  const generatePDF = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let yPos = 10;
    const colWidth = 40;

    pdf.setFont("Lato");

    pdf.text(
      "Relatório Patrimonial Zetta",
      pdf.internal.pageSize.width / 2,
      yPos,
      { align: "center" }
    );

    yPos += 15;

    const headerData = [
      ["Total de Patrimônios", data.length.toString()],
      ["Local Vistoriado", salas],
      ["Data e hora", `${formattedDate} ${formattedTime}`],
    ];

    const headerHeight = 6;

    pdf.autoTable({
      startY: yPos,
      head: headerData,
      body: [],
      theme: "grid",
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: colWidth, halign: "left" },
        1: { cellWidth: colWidth, halign: "right" },
      },
      styles: {
        overflow: "linebreak",
        fontStyle: "bold",
        rowHeight: headerHeight,
        halign: "left",
      },
    });

    yPos += headerHeight * headerData.length + 10;

    const objectCount = {};
    data.forEach((dado) => {
      objectCount[dado.objeto] = (objectCount[dado.objeto] || 0) + 1;
    });

    const objectGridData = Object.entries(objectCount).map(
      ([objeto, quantidade]) => [objeto, quantidade]
    );

    yPos = "auto";

    pdf.autoTable({
      startY: yPos,
      head: [["Objeto", "Quantidade"]],
      body: objectGridData,
      theme: "grid",
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
      },
      styles: { overflow: "linebreak", halign: "center" },
    });

    yPos = "auto";

    pdf.autoTable({
      startY: yPos,
      head: [["Patrimônio", "Objeto", "Marca", "Checkbox"]],
      body: data.map((dado) => [
        dado.patrimonio,
        dado.objeto,
        dado.marca || dado.marcaMonitor,
        "",
      ]),
      theme: "grid",
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto", halign: "center" },
      },
      styles: { overflow: "linebreak", halign: "center" },
    });

    pdf.save(`${salas}_patrimonios.pdf`);
  };

  return (
    <div className="salas">
      <div className="cabecalho"></div>

      <div className="corpo-salas">
        <h2>Busca por Sala</h2>
        <div className="form-group">
          <select value={salas} onChange={(e) => setSala(e.target.value)}>
            <option value="">Escolha a sala</option>
            {listaSalas.map((sala, index) => (
              <option key={index} value={sala}>
                {sala}
              </option>
            ))}
          </select>
        </div>

        <div className="botoes">
          <button type="submit" onClick={getAllPatrimonios}>
            Mostrar Patrimônios da Sala
          </button>
          <div className="divVazia"></div>
          <button id="btnSala" onClick={generatePDF}>
            Gerar PDF
          </button>
        </div>

        {showPatrimonios && (
          <div className="tabela">
            <table className="mostrarTodosConsultar">
              <thead>
                <tr>
                  <th>Número do Patrimônio</th>
                  <th>Objeto</th>
                  <th>Marca</th>
                </tr>
              </thead>
              <tbody>
                {data.map((dado, index) => (
                  <tr key={index}>
                    <td>{dado.patrimonio}</td>
                    <td>{dado.objeto}</td>
                    <td>{dado.marca || dado.marcaMonitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Salas;
