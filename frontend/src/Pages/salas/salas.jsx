import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";

import Api from "../../Services/api";
import "./salas.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [prevSelectedSala, setPrevSelectedSala] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const getAllPatrimonios = async (selectedSala, page = currentPage) => {
    try {
      if (selectedSala !== "") {
        if (selectedSala !== prevSelectedSala) {
          setCurrentPage(1);
          setPrevSelectedSala(selectedSala);
        }

        const response = await Api.get(
          `/buscasala/${encodeURIComponent(selectedSala)}`
        );

        let data = response.data;

        data.sort((a, b) => a.objeto.localeCompare(b.objeto));

        const totalItems = data.length;
        const totalPag = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(totalPag);

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);

        setData(paginatedData);
        setShowPatrimonios(true);
        setCurrentPage(page);
      } else {
        setData([]);
        setShowPatrimonios(false);
      }
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar os patrimônios!");
      refreshPage();
    }
  };
  useEffect(() => {
    setData([]);
    setShowPatrimonios(false);
  }, [salas]);

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    setCurrentPage(prevPage);
    getAllPatrimonios(salas, prevPage);
  };

  const handleNextPage = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    setCurrentPage(nextPage);
    getAllPatrimonios(salas, nextPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getAllPatrimonios(salas, page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages > maxVisiblePages) {
      if (endPage === totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
      } else if (startPage === 1) {
        endPage = maxVisiblePages;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const renderPrevButton = () => {
    return (
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      >
        <span className={currentPage === 1 ? "disabled-arrow" : ""}>&lt;</span>
      </button>
    );
  };

  const renderNextButton = () => {
    return (
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <span className={currentPage === totalPages ? "disabled-arrow" : ""}>
          &gt;
        </span>
      </button>
    );
  };

  const generatePDF = async () => {
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

    const allPatrimoniosResponse = await Api.get(
      `/buscasala/${encodeURIComponent(salas)}`
    );

    const allPatrimoniosData = allPatrimoniosResponse.data;

    const totalPatrimonios = allPatrimoniosData.length;

    const headerData = [
      ["Total de Patrimônios", totalPatrimonios.toString()],
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
    allPatrimoniosData.forEach((dado) => {
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
      body: allPatrimoniosData.map((dado) => [
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
        <div className="cima">
          <div className="arrumawidth">
            <div className="form-group">
              <select
                className="select-sala"
                value={salas}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "0") {
                    setData([]);
                    setShowPatrimonios(false);
                  } else {
                    setSala(selectedValue);
                    getAllPatrimonios(selectedValue, 1);
                  }
                }}
              >
                <option value="0">Selecione a sala</option>
                {listaSalas.map((sala, index) => (
                  <option key={index} value={sala}>
                    {sala}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="botoes">
            <div className="divVazia"></div>
            <button id="btnSala" onClick={generatePDF}>
              Gerar relatório PDF
            </button>
          </div>
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
            <div className="pagination">
              {renderPrevButton()}
              {renderPageNumbers()}
              {renderNextButton()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Salas;
