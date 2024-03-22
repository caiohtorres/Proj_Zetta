import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Api from "../../../Services/api";
import "./busca.css";

const listaLocal = [
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
];

const listaMarca = [
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

function Busca({ data }) {
  const [changedNote, setChangedNote] = useState();
  const [changedLocal, setChangedLocal] = useState();
  const [changedMarca, setChangedMarca] = useState();

  async function handleSave(e) {
    const patrimonioAlterado = await Api.post(
      "http://177.105.35.235:7777/contentChange/" + e,
      {
        notas: changedNote,
        local: changedLocal,
        marca: changedMarca,
      }
    );
    if (patrimonioAlterado) {
      alert("Patrimônio alterado com sucesso!");
    }
  }

  async function handleDelete(e) {
    const patrimonioDeletado = await Api.delete(
      "http://177.105.35.235:7777/annotations/" + e
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
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Processador:</label>
                  <p>{data.processador}</p>
                </li>
              </div>
            )}
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Placa de Vídeo:</label>
                  <p>{data.placaVideo}</p>
                </li>
              </div>
            )}
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Memória Ram:</label>
                  <p>{data.memoriaRam}</p>
                </li>
              </div>
            )}
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Armazenamento:</label>
                  <p>{data.armazenamento}</p>
                </li>
              </div>
            )}
            {data.tipo === "Notebook" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Cidade:</label>
                  <p>{data.cidade}</p>
                </li>
              </div>
            )}
            {data.tipo === "Notebook" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Destinatário:</label>
                  <p>{data.destinatario}</p>
                </li>
              </div>
            )}
            {/*<div className="caixas-notas">
              <li>
                {" "}
                <label>Marca:</label>
                <select
                  defaultValue="0"
                  value={changedMarca}
                  onChange={(e) => setChangedMarca(e.target.value)}
                >
                  <option value="0">{data.marca}</option>
                  {listaMarca.map((marca, index) => (
                    <option key={index} value={marca}>
                      {marca}
                    </option>
                  ))}
                </select>
              </li>
                  </div>*/}{" "}
            {/*caso precise alterar ja ta aqui*/}
            <div className="caixas">
              <li>
                {" "}
                <label>Marca:</label>
                <p>{data.marca || data.marcaMonitor}</p>
              </li>
            </div>
            {data.tipo === "Monitor" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Tamanho:</label>
                  <p>{data.tamanhoMonitor}</p>
                </li>
              </div>
            )}
            <div className="caixas-notas">
              <li>
                {" "}
                <label>Local:</label>
                <select
                  defaultValue="0"
                  value={changedLocal}
                  onChange={(e) => setChangedLocal(e.target.value)}
                >
                  <option value="0">{data.local}</option>
                  {listaLocal.map((local, index) => (
                    <option key={index} value={local}>
                      {local}
                    </option>
                  ))}
                </select>
              </li>
            </div>
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
            É possível fazer alterações no patrimônio!
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
