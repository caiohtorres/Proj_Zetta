import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowGoBackFill } from "react-icons/ri";
import Api from "../../Services/api";
import Busca from "./busca/busca.jsx";

import "./consultar.css";

const Sair = () => {
  return <RiArrowGoBackFill />;
};

const refreshPage = () => {
  window.location.reload();
};

function Consultar() {
  const [patrimonioById, setPatrimonioById] = useState("");
  const [data, setData] = useState([]);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPatrimonio, setSelectedPatrimonio] = useState(null);
  const [sortByLocal, setSortByLocal] = useState(false);
  const [sortByObjeto, setSortByObjeto] = useState(false);
  const [sortByMarca, setSortByMarca] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  const getPatrimonioById = async (ev) => {
    ev.preventDefault();
    try {
      const response = await Api.get(
        "http://177.105.35.235:7777/annotations/" + patrimonioById
      );
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
      const response = await Api.get("http://177.105.35.235:7777/annotations/");
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
      <tr
        onClick={() => handleEditPatrimonio(dado)}
        key={index}
        className="tr-dados"
      >
        {dado.destinatario ? (
          <td>
            <div className="tooltip-container">
              <img
                src={require("../img/Person.png")}
                alt="person-emprestado"
                className="img-person"
                style={{ marginRight: "5px" }}
                width={10}
              />
              <span className="tooltip">
                Destinatário: {dado.destinatario}, Cidade: {dado.cidade}
              </span>
            </div>
            {dado.objeto}
          </td>
        ) : (
          <td>{dado.objeto}</td>
        )}
        <td>{dado.patrimonio}</td>
        <td>{dado.marca || dado.marcaMonitor}</td>
        <td>{dado.processador}</td>
        <td>{dado.placaVideo}</td>
        <td>{dado.notas}</td>
        <td>{dado.local}</td>
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
        <span
          key={i}
          className={`page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="consultar">
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
                  />
                  {errors?.patrimonio?.type === "required" && (
                    <p className="error-message">
                      Número do patrimônio é necessário
                    </p>
                  )}

                  <button type="submit">Consultar</button>
                  <div className="btn-expandir">
                    <img
                      src={require("../img/filter-big-svgrepo-com 1.png")}
                      alt="img-filtro"
                      className="img-filtro"
                      width={20}
                    />
                  </div>
                </div>
                <nav className="menu-lateral-filtro">
                  <ul>
                    <li className="item-menu"></li>
                    <li className="item-menu"></li>
                    <li className="item-menu"></li>
                    <li className="item-menu"></li>
                  </ul>
                </nav>
              </div>
            </form>
          </div>

          <div>
            <div>
              <table className="mostrarTodosConsultar">
                <thead>
                  <tr>
                    <th>Objeto {renderSortArrowObjeto()}</th>

                    <th>Número do patrimônio </th>
                    <th>Marca {renderSortArrowMarca()}</th>
                    <th>Processador </th>
                    <th>Placa de Vídeo </th>
                    <th>Notas </th>
                    <th>Local {renderSortArrowLocal()}</th>
                  </tr>
                </thead>
                <tbody>{renderColumns()}</tbody>
              </table>
            </div>
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &lt;
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Consultar;
