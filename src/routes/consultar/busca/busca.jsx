import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Api from "../../../services/api";
import "./busca.css";

function Busca({ data }) {
  const [changedNote, setChangedNote] = useState();

  async function handleSave(e) {
    const notasAlteradas = await Api.post(
      "http://127.0.0.1:7777/contentChange/" + e,
      {
        notas: changedNote,
      }
    );
    if (notasAlteradas) {
      alert("Notas alteradas com sucesso!");
    }
  }

  async function handleDelete(e) {
    const patrimonioDeletado = await Api.delete(
      "http://127.0.0.1:7777/annotations/" + e
    );
    if (patrimonioDeletado) {
      alert("Patrimônio deletado com sucesso!");
    }
  }

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container-busca">
        <div className="container-objeto">
          <label className="objeto">{data.objeto}</label>
        </div>
        <div className="data-container">
          <ul>
            <div className="caixas">
              <li>
                {" "}
                <label>Número do patrimônio:</label>
                <p>{data.patrimonio}</p>
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Tipo patrimônio:</label>
                <p>{data.tipo}</p>
              </li>
            </div>
            {data.tipo === "computador" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Processador:</label>
                  <p>{data.processador}</p>
                </li>
              </div>
            )}
            {data.tipo === "computador" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Placa de Vídeo:</label>
                  <p>{data.placaVideo}</p>
                </li>
              </div>
            )}
            {data.tipo === "computador" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Memória Ram:</label>
                  <p>{data.memoriaRam}</p>
                </li>
              </div>
            )}
            {data.tipo === "computador" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Armazenamento:</label>
                  <p>{data.armazenamento}</p>
                </li>
              </div>
            )}
            <div className="caixas">
              <li>
                {" "}
                <label>Estado de Conservação:</label>
                <p>{data.estadoConservacao}</p>
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Valor:</label>
                <p>{data.valor}</p>
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Quantidade:</label>
                <p>{data.quantidade}</p>
              </li>
            </div>
            <div className="caixas-notas">
              <li>
                {" "}
                <label>Notas:</label>
                <input
                  defaultValue={data.notas}
                  onChange={(e) => setChangedNote(e.target.value)}
                ></input>
              </li>
            </div>
          </ul>

          <p className="comunicado">
            É possível fazer alterações na nota do patrimônio!
          </p>

          <div className="imgBusca">
            <div className="delete-div" type="button" onClick={refreshPage}>
              <div
                type="button"
                className="delete"
                onClick={() => handleDelete(data.patrimonio)}
              >
                <MdDeleteForever size="20" />
                {"Excluir"}
              </div>
            </div>
            <div className="save-div" type="button" onClick={refreshPage}>
              <div
                className="save"
                type="button"
                onClick={() => handleSave(data.patrimonio)}
              >
                <FaSave size="18" />
                Salvar
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Busca;
