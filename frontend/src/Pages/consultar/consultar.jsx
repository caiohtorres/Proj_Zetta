import { Html5QrcodeScanner } from "html5-qrcode";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "webrtc-adapter";
import Api from "../../Services/api";
import Busca from "./busca/busca.jsx";
import "./consultar.css";

const refreshPage = () => {
  window.location.reload();
};

function Consultar() {
  const [patrimonioById, setPatrimonioById] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPatrimonio, setSelectedPatrimonio] = useState(null);
  const [sortByLocal, setSortByLocal] = useState(false);
  const [sortByObjeto, setSortByObjeto] = useState(false);
  const [sortByMarca, setSortByMarca] = useState(false);
  const [showFiltersSidebar, setShowFiltersSidebar] = useState(false);
  const [selectedObjetos, setSelectedObjetos] = useState([]);
  const [showObjetos, setShowObjetos] = useState(false);
  const [showMarcas, setShowMarcas] = useState(false);
  const [showProcessadores, setShowProcessadores] = useState(false);
  const [selectedMarcas, setSelectedMarcas] = useState([]);
  const [selectedProcessadores, setSelectedProcessadores] = useState([]);
  const [selectedLocais, setSelectedLocais] = useState([]);
  const [selectedPlacasVideo, setSelectedPlacasVideo] = useState([]);
  const [showLocais, setShowLocais] = useState(false);
  const [showPlacasVideo, setShowPlacasVideo] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleQrScan = (decodedText) => {
    setPatrimonioById(decodedText);
    setShowScanner(false);
  };

  useEffect(() => {
    if (showScanner) {
      const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });
      html5QrcodeScanner.render(handleQrScan);
    }
  }, [showScanner]);

  const getPatrimonioById = async (ev) => {
    ev.preventDefault();
    try {
      const response = await Api.get("/annotations/" + patrimonioById);
      const data = response.data;
      setData([data]);
      setMostrarTodos(false);
      reset();
    } catch (err) {
      console.log(err);
      alert("Patrimônio não encontrado!");
      refreshPage();
    }
  };

  const toggleSortByMarca = () => {
    setSortByMarca(!sortByMarca);
  };

  const toggleSortByLocal = () => {
    setSortByLocal(!sortByLocal);
  };

  const toggleSortByObjeto = () => {
    setSortByObjeto(!sortByObjeto);
  };

  useEffect(() => {
    getAllPatrimonios();
  }, [currentPage, sortByLocal, sortByObjeto, sortByMarca]);

  const getAllPatrimonios = async () => {
    try {
      const response = await Api.get("/annotations/");
      let data = response.data;

      if (sortByLocal) {
        data.sort((a, b) => a.local.localeCompare(b.local));
      }

      if (sortByObjeto) {
        data.sort((a, b) => a.objeto.localeCompare(b.objeto));
      }

      if (sortByMarca) {
        data.sort((a, b) =>
          (a.marca || a.marcaMonitor || "").localeCompare(
            b.marca || b.marcaMonitor || ""
          )
        );
      }

      const totalItems = data.length;
      const totalPag = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPag);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = data.slice(startIndex, endIndex);

      setAllData(data);
      setData(paginatedData);
      setMostrarTodos(true);
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar todos os patrimônios!");
      refreshPage();
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditPatrimonio = (patrimonio) => {
    setSelectedPatrimonio(patrimonio);
  };

  const renderColumns = () => {
    return data.map((dado, index) => (
      <tr key={index}>
        <td
          className="iconsconsultar"
          style={{ justifyContent: "space-around", display: "flex" }}
        >
          <img
            src={require("../img/Editar.png")}
            alt="editar"
            width={10}
            onClick={() => handleEditPatrimonio(dado)}
            style={{ cursor: "pointer" }}
          />
          <img
            src={require("../img/visualizar.png")}
            alt="visualizar"
            width={10}
            onClick={() => handleEditPatrimonio(dado)}
            style={{ cursor: "pointer" }}
          />
        </td>
        {dado.destinatario ? (
          <td data-label="Objeto">
            <div className="tooltip-container">
              {dado.objeto}
              <img
                src={require("../img/Person.png")}
                alt="person-emprestado"
                className="img-person"
                style={{ marginLeft: "5px" }}
                width={10}
              />
              <span className="tooltip">
                Destinatário: {dado.destinatario}, Cidade: {dado.cidade}
              </span>
            </div>
          </td>
        ) : (
          <td data-label="Objeto">{dado.objeto}</td>
        )}
        <td data-label="Patrimonio">{dado.patrimonio}</td>
        <td data-label="Marca">{dado.marca || dado.marcaMonitor}</td>
        <td data-label="Notas">{dado.notas}</td>
        <td data-label="Local">{dado.local}</td>
      </tr>
    ));
  };

  const renderSortArrowLocal = () => {
    return sortByLocal ? (
      <img
        src={require("../img/Menor.png")}
        alt="arrowdown"
        className="arrowdown"
        width={10}
        onClick={toggleSortByLocal}
      />
    ) : (
      <img
        src={require("../img/arrow-up-wide-short-svgrepo-com 2.png")}
        alt="arrowup"
        className="arrowup"
        width={10}
        onClick={toggleSortByLocal}
      />
    );
  };

  const renderSortArrowObjeto = () => {
    return sortByObjeto ? (
      <img
        src={require("../img/Menor.png")}
        alt="arrowdown"
        className="arrowdown"
        width={10}
        onClick={toggleSortByObjeto}
      />
    ) : (
      <img
        src={require("../img/arrow-up-wide-short-svgrepo-com 2.png")}
        alt="arrowup"
        className="arrowup"
        width={10}
        onClick={toggleSortByObjeto}
      />
    );
  };

  const renderSortArrowMarca = () => {
    return sortByMarca ? (
      <img
        src={require("../img/Menor.png")}
        alt="arrowdown"
        className="arrowdown"
        width={10}
        onClick={toggleSortByMarca}
      />
    ) : (
      <img
        src={require("../img/arrow-up-wide-short-svgrepo-com 2.png")}
        alt="arrowup"
        className="arrowup"
        width={10}
        onClick={toggleSortByMarca}
      />
    );
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

  const closeFilters = () => {
    setShowFiltersSidebar(false);
  };

  const toggleShowFilters = () => {
    setShowFiltersSidebar(!showFiltersSidebar);
  };

  const toggleMarca = (marca) => {
    if (selectedMarcas.includes(marca)) {
      setSelectedMarcas(selectedMarcas.filter((m) => m !== marca));
    } else {
      setSelectedMarcas([...selectedMarcas, marca]);
    }
  };

  const toggleProcessador = (processador) => {
    if (selectedProcessadores.includes(processador)) {
      setSelectedProcessadores(
        selectedProcessadores.filter((p) => p !== processador)
      );
    } else {
      setSelectedProcessadores([...selectedProcessadores, processador]);
    }
  };

  const toggleObjeto = (objeto) => {
    if (selectedObjetos.includes(objeto)) {
      setSelectedObjetos(selectedObjetos.filter((obj) => obj !== objeto));
    } else {
      setSelectedObjetos([...selectedObjetos, objeto]);
    }
  };

  const toggleShowObjetos = () => {
    setShowObjetos(!showObjetos);
  };

  const toggleShowMarcas = () => {
    setShowMarcas(!showMarcas);
  };

  const toggleShowProcessadores = () => {
    setShowProcessadores(!showProcessadores);
  };

  const toggleShowPlacaVideo = () => {
    setShowPlacasVideo(!showPlacasVideo);
  };

  const toggleShowLocal = () => {
    setShowLocais(!showLocais);
  };

  const toggleLocal = (local) => {
    if (selectedLocais.includes(local)) {
      setSelectedLocais(selectedLocais.filter((l) => l !== local));
    } else {
      setSelectedLocais([...selectedLocais, local]);
    }
  };

  const togglePlacaVideo = (placaVideo) => {
    if (selectedPlacasVideo.includes(placaVideo)) {
      setSelectedPlacasVideo(
        selectedPlacasVideo.filter((pv) => pv !== placaVideo)
      );
    } else {
      setSelectedPlacasVideo([...selectedPlacasVideo, placaVideo]);
    }
  };

  const applyFilters = () => {
    closeFilters();
    const filteredData = allData.filter((patrimonio) => {
      let passFilter = true;
      if (
        selectedObjetos.length > 0 &&
        !selectedObjetos.includes(patrimonio.objeto)
      ) {
        passFilter = false;
      }
      if (
        selectedMarcas.length > 0 &&
        !selectedMarcas.some((marca) =>
          (patrimonio.marca || patrimonio.marcaMonitor || "")
            .toLowerCase()
            .includes(marca.toLowerCase())
        )
      ) {
        passFilter = false;
      }
      if (
        selectedProcessadores.length > 0 &&
        !selectedProcessadores.some((processador) =>
          (patrimonio.processador || "")
            .toLowerCase()
            .includes(processador.toLowerCase())
        )
      ) {
        passFilter = false;
      }
      if (
        selectedLocais.length > 0 &&
        !selectedLocais.includes(patrimonio.local)
      ) {
        passFilter = false;
      }
      if (
        selectedPlacasVideo.length > 0 &&
        !selectedPlacasVideo.includes(patrimonio.placaVideo)
      ) {
        passFilter = false;
      }
      return passFilter;
    });
    setData(filteredData);
    setCurrentPage(1);
    setSelectedMarcas("");
    setSelectedObjetos("");
    setSelectedProcessadores("");
    setSelectedLocais("");
    setSelectedPlacasVideo("");
  };

  const generatePDF = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const filteredData = data; // Use the already filtered data

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

    const totalPatrimonios = filteredData.length;

    const headerData = [
      ["Total de Patrimônios", totalPatrimonios.toString()],
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
    filteredData.forEach((dado) => {
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
      head: [["Patrimônio", "Objeto", "Marca", "Notas", "Local"]],
      body: filteredData.map((dado) => [
        dado.patrimonio,
        dado.objeto,
        dado.marca || dado.marcaMonitor,
        dado.notas,
        dado.local,
      ]),
      theme: "grid",
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
      },
      styles: { overflow: "linebreak", halign: "center" },
    });

    pdf.save("patrimonios_filtrados.pdf");
  };

  const generateAllPDF = () => {
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
      "Relatório Completo de Patrimônios",
      pdf.internal.pageSize.width / 2,
      yPos,
      { align: "center" }
    );

    yPos += 15;

    const totalPatrimonios = allData.length;

    const headerData = [
      ["Total de Patrimônios", totalPatrimonios.toString()],
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
    allData.forEach((dado) => {
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
      head: [["Patrimônio", "Objeto", "Marca", "Notas", "Local"]],
      body: allData.map((dado) => [
        dado.patrimonio,
        dado.objeto,
        dado.marca || dado.marcaMonitor,
        dado.notas,
        dado.local,
      ]),
      theme: "grid",
      margin: { top: 20 },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
      },
      styles: { overflow: "linebreak", halign: "center" },
    });

    pdf.save("patrimonios_completos.pdf");
  };

  const renderFiltersSidebar = () => {
    const objetos = [
      "Desktop",
      "Monitor",
      "Workstation",
      "Notebook",
      "Impressora",
      "noBreak",
      "Switch",
      "Geladeira",
      "Fogao",
      "Bebedouro",
      "Ar",
      "Microondas",
      "Televisao",
      "Mesa",
      "Cadeira",
      "Escrivaninha",
    ];
    const marcas = [
      "Samsung",
      "Daten",
      "LG",
      "Dell",
      "Hp",
      "Brastemp",
      "Midea",
      "Consul",
      "Eletrolux",
      "Komeco",
      "Cavaletti",
      "UFLA",
      "VIPH",
      "EPSON",
    ];
    const processadores = ["i3", "i5", "i7", "i9"];

    const placaVideo = [
      "GTX 1050 Ti",
      "GTX 1060",
      "GTX 1070",
      "GTX 1080",
      "GTX 1080 Ti",
      "GTX 1650",
      "GTX 1650 SUPER",
      "GTX 1660",
      "GTX 1660 SUPER",
      "GTX 1660 Ti",
      "RTX 2060",
      "RTX 2070",
      "RTX 2080",
      "RTX 2080 Ti",
      "RTX 3050",
      "RTX 3060",
      "RTX 3060 Ti",
      "RTX 3070",
      "RTX 3070 Ti",
      "RTX 3080",
      "RTX 3080 Ti",
      "RTX 3090",
      "RTX 4060",
      "RTX 4070",
      "RTX 4070 Ti",
      "RTX 4080",
      "RTX 4080 Ti",
      "RTX 4090",
    ];

    const locais = [
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

    return (
      <div
        className={`filters-sidebar ${showFiltersSidebar && "show-sidebar"}`}
      >
        <div className="tudo-filtro">
          <h2 className="h2-filtro">Filtro</h2>
          <div className="filter-section">
            <div className="dentro-filtro">
              <div className="caixa-filtro" onClick={toggleShowObjetos}>
                <h4 className="h4-filtro">Objeto</h4>
                <h4 className="h4-filtro-cor">{showObjetos ? "-" : "+"}</h4>
              </div>

              {showObjetos &&
                objetos.map((objeto) => (
                  <label key={objeto} className="ajuste-filtro">
                    <input
                      className="input-filtro"
                      type="checkbox"
                      checked={selectedObjetos.includes(objeto)}
                      onChange={() => toggleObjeto(objeto)}
                    />
                    {objeto}
                  </label>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="dentro-filtro">
              <div className="caixa-filtro" onClick={toggleShowMarcas}>
                <h4 className="h4-filtro">Marca</h4>
                <h4 className="h4-filtro-cor">{showMarcas ? "-" : "+"}</h4>
              </div>

              {showMarcas &&
                marcas.map((marca) => (
                  <label key={marca} className="ajuste-filtro">
                    <input
                      className="input-filtro"
                      type="checkbox"
                      checked={selectedMarcas.includes(marca)}
                      onChange={() => toggleMarca(marca)}
                    />
                    {marca}
                  </label>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="dentro-filtro">
              <div className="caixa-filtro" onClick={toggleShowProcessadores}>
                <h4 className="h4-filtro">Processador</h4>
                <h4 className="h4-filtro-cor">
                  {showProcessadores ? "-" : "+"}
                </h4>
              </div>

              {showProcessadores &&
                processadores.map((processador) => (
                  <label key={processador} className="ajuste-filtro">
                    <input
                      className="input-filtro"
                      type="checkbox"
                      checked={selectedProcessadores.includes(processador)}
                      onChange={() => toggleProcessador(processador)}
                    />
                    {processador}
                  </label>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="dentro-filtro">
              <div className="caixa-filtro" onClick={toggleShowPlacaVideo}>
                <h4 className="h4-filtro">Placa de Vídeo</h4>
                <h4 className="h4-filtro-cor">{showPlacasVideo ? "-" : "+"}</h4>
              </div>

              {showPlacasVideo &&
                placaVideo.map((placaVideo) => (
                  <label key={placaVideo} className="ajuste-filtro">
                    <input
                      className="input-filtro"
                      type="checkbox"
                      checked={selectedPlacasVideo.includes(placaVideo)}
                      onChange={() => togglePlacaVideo(placaVideo)}
                    />
                    {placaVideo}
                  </label>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <div className="dentro-filtro">
              <div className="caixa-filtro" onClick={toggleShowLocal}>
                <h4 className="h4-filtro">Locais</h4>
                <h4 className="h4-filtro-cor">{showLocais ? "-" : "+"}</h4>
              </div>

              {showLocais &&
                locais.map((locais) => (
                  <label key={locais} className="ajuste-filtro">
                    <input
                      className="input-filtro"
                      type="checkbox"
                      checked={selectedLocais.includes(locais)}
                      onChange={() => toggleLocal(locais)}
                    />
                    {locais}
                  </label>
                ))}
            </div>
          </div>

          <div className="botao-filtro">
            <button className="apply-filters" onClick={applyFilters}>
              Aplicar
            </button>
            <button className="close-filters" onClick={closeFilters}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="consultar">
      {renderFiltersSidebar()}

      <div className="cabecalho"></div>

      {selectedPatrimonio ? (
        <Busca data={selectedPatrimonio} />
      ) : (
        <>
          <h2>Consultar Patrimônio</h2>
          <div className="corpo">
            <form onSubmit={getPatrimonioById}>
              <div className="form-group">
                <div className="input-container">
                  <img
                    src={require("../img/magnifier-search-zoom-svgrepo-com 1.png")}
                    alt="lupa"
                    width={20}
                  />
                  <input
                    className={
                      errors?.patrimonio && "input-error" && "input-consultar"
                    }
                    type="text"
                    placeholder={"Número do patrimônio"}
                    {...register("patrimonio", { required: true })}
                    value={patrimonioById}
                    onChange={(ev) => setPatrimonioById(ev.target.value)}
                  />{" "}
                  {errors?.patrimonio?.type === "required" && (
                    <p className="error-message">
                      Número do patrimônio é necessário
                    </p>
                  )}
                  <button type="submit">Consultar</button>
                </div>
                <div className="btn-expandir" onClick={toggleShowFilters}>
                  <img
                    src={require("../img/filter-big-svgrepo-com 1.png")}
                    alt="img-filtro"
                    className="img-filtro"
                    width={20}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="botoes-consultar">
            <div className="pdf-buttons">
              <button
                className="btn-scann"
                onClick={() => setShowScanner(!showScanner)}
              >
                {showScanner ? "Fechar Scanner" : "Abrir Scanner"}
              </button>
              <button onClick={generatePDF} className="btn-gerar-pdf">
                Gerar PDF Filtrado
              </button>
              <button onClick={generateAllPDF} className="btn-gerar-pdf">
                Gerar PDF Geral
              </button>
            </div>
          </div>

          {showScanner && (
            <div
              id="qr-reader"
              style={{ width: "100%", marginBottom: "25px", marginTop: "15px" }}
            ></div>
          )}

          <div className="table-container">
            <table className="mostrarTodosConsultar">
              <thead>
                <tr>
                  <th></th>
                  <th>Objeto {renderSortArrowObjeto()}</th>
                  <th>Número do patrimônio </th>
                  <th>Marca {renderSortArrowMarca()}</th>

                  <th>Notas </th>
                  <th>Local {renderSortArrowLocal()}</th>
                </tr>
              </thead>
              <tbody>{renderColumns()}</tbody>
            </table>
          </div>
          <div className="pagination">
            {renderPrevButton()}
            {renderPageNumbers()}
            {renderNextButton()}
          </div>
        </>
      )}
    </div>
  );
}

export default Consultar;
