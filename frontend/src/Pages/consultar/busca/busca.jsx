// Busca.jsx

import React, { useState } from "react";
import Api from "../../../Services/api";
import Modal from "../../components/modal";
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
  const [editMode, setEditMode] = useState(false);
  const [changedNote, setChangedNote] = useState(data.notas);
  const [changedLocal, setChangedLocal] = useState(data.local);
  const [changedMarca, setChangedMarca] = useState(
    data.marca || data.marcaMonitor
  );
  const [showModal, setShowModal] = useState(false);

  async function handleSave() {
    const patrimonioAlterado = await Api.post(
      "http://177.105.35.235:7777/contentChange/" + data.patrimonio,
      {
        notas: changedNote,
        local: changedLocal,
        marca: changedMarca,
      }
    );
    if (patrimonioAlterado) {
      alert("Patrimônio alterado com sucesso!");
      setEditMode(false);
      refreshPage();
    }
  }

  async function handleDelete() {
    const patrimonioDeletado = await Api.delete(
      "http://177.105.35.235:7777/annotations/" + data.patrimonio
    );
    if (patrimonioDeletado) {
      alert("Patrimônio deletado com sucesso!");
      refreshPage();
    }
  }

  const refreshPage = () => {
    window.location.reload();
  };

  function handleCancel() {
    setEditMode(false);
    setChangedNote(data.notas);
    setChangedLocal(data.local);
    setChangedMarca(data.marca || data.marcaMonitor);
  }

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalText={"Deseja realmente salvar as alterações?"}
        confirmAction={handleSave} // Alterado para chamar a função handleSave
      />
      <h2>Visualizar Patrimônio</h2>
      <div className="container-busca">
        <div className="data-container">
          <img
            className="img-editar"
            src={require("../../img/Vector.png")}
            alt="editar-patrimonio"
            width={26}
            onClick={() => setEditMode(true)}
          />
          <ul>
            {/* Conteúdo do componente Busca */}
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
            <div className="caixas">
              <li>
                {" "}
                <label>Projeto:</label>
                <p>{data.projeto}</p>
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Data:</label>
                <p>{data.data}</p>
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Local:</label>
                {editMode ? (
                  <select
                    className="select-edit"
                    value={changedLocal}
                    onChange={(e) => setChangedLocal(e.target.value)}
                  >
                    {listaLocal.map((local, index) => (
                      <option key={index} value={local}>
                        {local}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{data.local}</p>
                )}
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
            {editMode && (
              <>
                <div className="botoesEditar">
                  <div className="esquerda">
                    <img
                      className="iconCadastrar"
                      src={require("../../img/salvar-editar.png")}
                      alt="botao-salvar"
                      onClick={() => setShowModal(true)}
                    />
                    <img
                      className="iconCancelar"
                      src={require("../../img/Botão Limpar.png")}
                      alt="botao-cancelar"
                      onClick={handleCancel}
                    />
                  </div>
                  <div className="lixeira">
                    <img
                      className="iconLixeira"
                      src={require("../../img/Trash-Bin-Circle--Streamline-Ultimate.svg.png")}
                      alt="iconlixeira"
                      onClick={() => handleDelete(data.patrimonio)}
                      width={50}
                    />
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Busca;
