import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    if (salas !== "") {
      getAllPatrimonios();
    }
  }, [salas]);

  const getAllPatrimonios = async () => {
    try {
      if (salas !== "") {
        const response = await Api.get(
          `http://177.105.35.235:7777/buscasala/${encodeURIComponent(salas)}`
        );

        const data = response.data;
        setData(data);
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar os patrimônios!");
      refreshPage();
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let yPos = 10;
    const rectWidth = 180;
    const rectHeight = 20;
    const fontSize = 8;

    data.forEach((dado, index) => {
      if (yPos + rectHeight + 5 > pdf.internal.pageSize.height) {
        pdf.addPage();
        yPos = 10;
      }

      pdf.setFillColor(230);
      pdf.rect(15, yPos, rectWidth, rectHeight, "F");

      pdf.setFontSize(fontSize);
      pdf.text(`Objeto: ${dado.objeto}`, 20, yPos + 5);
      pdf.text(`Número do patrimônio: ${dado.patrimonio}`, 20, yPos + 15);

      yPos += rectHeight + 2;
    });

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    pdf.setFontSize(fontSize);
    pdf.text(`Total de patrimônios na sala: ${data.length}`, 15, yPos + 5);
    pdf.text(
      `Relatório gerado em: ${formattedDate} ${formattedTime}`,
      15,
      yPos + 12
    );

    pdf.save(`${salas}_patrimonios.pdf`);
  };

  return (
    <div className="salas">
      <div className="cabecalho">
        <ul>
          <li id="nomepag">Busca por Sala</li>
          <li id="sair">
            <Link to="/home">
              <Sair />
            </Link>
          </li>
        </ul>
      </div>
      <div className="corpo">
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
          <button id="btnSala" onClick={generatePDF}>
            Gerar PDF
          </button>
        </div>
        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th>Número do Patrimônio</th>
                <th>Objeto</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dado, index) => (
                <tr key={index}>
                  <td>{dado.patrimonio}</td>
                  <td>{dado.objeto}</td>
                  <td>{dado.notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Salas;
