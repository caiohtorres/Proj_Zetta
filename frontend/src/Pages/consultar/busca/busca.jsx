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

const criarListaProcessadores = (serie, maxGeneracao) => {
  const processadores = [];

  for (let i = maxGeneracao; i >= 1; i--) {
    const modelo = `${serie} - ${i}ª Geração`;
    processadores.push(modelo);
  }

  return processadores;
};

const listaMarcaMonitor = ["LG", "Samsung", "Dell", "Daten", "Hp", "Brazil PC"];

const listaTamanhoMonitor = [
  "15 polegadas",
  "17 polegadas",
  "19 polegadas",
  "21,5 polegadas",
  "23 polegadas",
  "24 polegadas",
  "27 polegadas",
  "28 polegadas",
  "32 polegadas",
  "34 polegadas",
  "38 polegadas",
  "65 polegadas",
];

const processadoresIntel = [
  ...criarListaProcessadores("i9", 14),
  ...criarListaProcessadores("i7", 14),
  ...criarListaProcessadores("i5", 14),
  ...criarListaProcessadores("i3", 14),
];

const placaDeVideoNvidea = [
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

const listaMemoriaRam = [
  "DDR3-800 4GB",
  "DDR3-800 8GB",
  "DDR3-800 12GB",
  "DDR3-800 16GB",
  "DDR3-1066 4GB",
  "DDR3-1066 8GB",
  "DDR3-1066 12GB",
  "DDR3-1066 16GB",
  "DDR3-1333 4GB",
  "DDR3-1333 8GB",
  "DDR3-1333 12GB",
  "DDR3-1333 16GB",
  "DDR3-1600 4GB",
  "DDR3-1600 8GB",
  "DDR3-1600 12GB",
  "DDR3-1600 16GB",
  "DDR3-1866 4GB",
  "DDR3-1866 8GB",
  "DDR3-1866 12GB",
  "DDR3-1866 16GB",
  "DDR3-2000 4GB",
  "DDR3-2000 8GB",
  "DDR3-2000 12GB",
  "DDR3-2000 16GB",
  "DDR3-2133 4GB",
  "DDR3-2133 8GB",
  "DDR3-2133 12GB",
  "DDR3-2133 16GB",
  "DDR3-2400 4GB",
  "DDR3-2400 8GB",
  "DDR3-2400 12GB",
  "DDR3-2400 16GB",
  "DDR4-1600 4GB",
  "DDR4-1600 8GB",
  "DDR4-1600 12GB",
  "DDR4-1600 16GB",
  "DDR4-1866 4GB",
  "DDR4-1866 8GB",
  "DDR4-1866 12GB",
  "DDR4-1866 16GB",
  "DDR4-2133 4GB",
  "DDR4-2133 8GB",
  "DDR4-2133 12GB",
  "DDR4-2133 16GB",
  "DDR4-2400 4GB",
  "DDR4-2400 8GB",
  "DDR4-2400 12GB",
  "DDR4-2400 16GB",
  "DDR4-2666 4GB",
  "DDR4-2666 8GB",
  "DDR4-2666 12GB",
  "DDR4-2666 16GB",
  "DDR4-2666 32GB",
  "DDR4-2933 4GB",
  "DDR4-2933 8GB",
  "DDR4-2933 12GB",
  "DDR4-2933 16GB",
  "DDR4-3200 4GB",
  "DDR4-3200 8GB",
  "DDR4-3200 12GB",
  "DDR4-3200 16GB",
  "DDR4-3600 4GB",
  "DDR4-3600 8GB",
  "DDR4-3600 12GB",
  "DDR4-3600 16GB",
  "DDR4-4000 4GB",
  "DDR4-4000 8GB",
  "DDR4-4000 12GB",
  "DDR4-4000 16GB",
  "DDR5-4800 4GB",
  "DDR5-4800 8GB",
  "DDR5-4800 12GB",
  "DDR5-4800 16GB",
  "DDR5-5200 4GB",
  "DDR5-5200 8GB",
  "DDR5-5200 12GB",
  "DDR5-5200 16GB",
  "DDR5-5600 4GB",
  "DDR5-5600 8GB",
  "DDR5-5600 12GB",
  "DDR5-5600 16GB",
];

const listaArmazenamento = [
  "HD 250GB",
  "HD 500GB",
  "HD 1TB",
  "HD 2TB",
  "HD 4TB",
  "HD 6TB",
  "HD 8TB",
  "SSD 120GB",
  "SSD 240GB",
  "SSD 480GB",
  "SSD 500GB",
  "SSD 1TB",
  "SSD 2TB",
  "SSD 4TB",
  "SSD 8TB",
  "NVME 250GB",
  "NVME 500GB",
  "NVME 1TB",
  "NVME 2TB",
  "NVME 4TB",
  "NVME 8TB",
];

const listaEC = ["Novo", "Usado", "Estragado"];

function Busca({ data }) {
  const [editMode, setEditMode] = useState(false);
  const [changedNote, setChangedNote] = useState(data.notas);
  const [changedLocal, setChangedLocal] = useState(data.local);
  const [changedValor, setChangedValor] = useState(data.valor);
  const [changedQuantidade, setChangedQuantidade] = useState(data.quantidade);
  const [pageTitle, setPageTitle] = useState("Visualizando Patrimônio");
  const [changedProcessador, setChangedProcessador] = useState(
    data.processador
  );
  const [changedPlacaVideo, setChangedPlacaVideo] = useState(data.placaVideo);
  const [changedMemoriaRam, setChangedMemoriaRam] = useState(data.memoriaRam);
  const [changedArmazenamento, setChangedArmazenamento] = useState(
    data.armazenamento
  );
  const [changedProjeto, setChangedProjeto] = useState(data.projeto);
  const [changedData, setChangedData] = useState(data.data);
  const [changedDestinatario, setChangedDestinatario] = useState(
    data.destinatario
  );
  const [changedCidade, setChangedCidade] = useState(data.cidade);
  const [changedEstadoConservacao, setChangedEstadoConservacao] = useState(
    data.estadoConservacao
  );
  const [changedMarca, setChangedMarca] = useState(
    data.marca || data.marcaMonitor
  );
  const [showModal, setShowModal] = useState(false);
  const [showModalLixo, setShowModalLixo] = useState(false);
  const [changedTamanhoMonitor, setChangedTamanhoMonitor] = useState(
    data.tamanhoMonitor
  );

  async function handleSave() {
    const patrimonioAlterado = await Api.post(
      "http://177.105.35.235:7777/contentChange/" + data.patrimonio,
      {
        notas: changedNote,
        local: changedLocal,
        marca: changedMarca,
        estadoConservacao: changedEstadoConservacao,
        processador: changedProcessador,
        placaVideo: changedPlacaVideo,
        memoriaRam: changedMemoriaRam,
        armazenamento: changedArmazenamento,
        projeto: changedProjeto,
        data: changedData,
        destinatario: changedDestinatario,
        cidade: changedCidade,
        valor: changedValor,
        quantidade: changedQuantidade,
        tamanhoMonitor: changedTamanhoMonitor,
      }
    );
    if (patrimonioAlterado) {
      setEditMode(false);
      refreshPage();
    }
  }
  function activateEditMode() {
    setEditMode(true);
    setPageTitle("Editando Patrimônio");
  }

  async function handleDelete() {
    const patrimonioDeletado = await Api.delete(
      "http://177.105.35.235:7777/annotations/" + data.patrimonio
    );
    if (patrimonioDeletado) {
      refreshPage();
    }
  }

  const refreshPage = () => {
    window.location.reload();
  };

  function handleCancel() {
    setEditMode(false);
    setPageTitle("Visualizar Patrimônio");
    setChangedNote(data.notas);
    setChangedLocal(data.local);
    setChangedEstadoConservacao(data.estadoConservacao);
    setChangedMarca(data.marca || data.marcaMonitor);
    setChangedEstadoConservacao(data.estadoConservacao);
    setChangedProcessador(data.processador);
    setChangedPlacaVideo(data.placaVideo);
    setChangedMemoriaRam(data.memoriaRam);
    setChangedArmazenamento(data.armazenamento);
    setChangedProjeto(data.projeto);
    setChangedData(data.data);
    setChangedDestinatario(data.destinatario);
    setChangedCidade(data.cidade);
    setChangedValor(data.valor);
    setChangedQuantidade(data.quantidade);
    setChangedTamanhoMonitor(data.tamanhoMonitor);
  }

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalText={"Deseja realmente salvar as alterações?"}
        confirmAction={handleSave} // Alterado para chamar a função handleSave
      />
      <Modal
        showModal={showModalLixo}
        setShowModal={setShowModalLixo}
        modalText={"Deseja excluir esse patrimônio? Essa ação é irreversível!"}
        confirmAction={() => handleDelete(data.patrimonio)}
      />
      <h2>{pageTitle}</h2>
      <div className="container-busca">
        <div className="data-container">
          <img
            className="img-editar"
            src={require("../../img/Vector.png")}
            alt="editar-patrimonio"
            width={26}
            onClick={activateEditMode}
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
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedProcessador}
                      onChange={(e) => setChangedProcessador(e.target.value)}
                    >
                      <option value="0">Altere o Processador</option>
                      {processadoresIntel.map((processador, index) => (
                        <option key={index} value={processador}>
                          {processador}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.processador}</p>
                  )}
                </li>
              </div>
            )}
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Placa de Vídeo:</label>
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedPlacaVideo}
                      onChange={(e) => setChangedPlacaVideo(e.target.value)}
                    >
                      <option value="0">Altere a Placa de Vídeo</option>
                      {placaDeVideoNvidea.map((placaVideo, index) => (
                        <option key={index} value={placaVideo}>
                          {placaVideo}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.placaVideo}</p>
                  )}
                </li>
              </div>
            )}
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Memória Ram:</label>
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedMemoriaRam}
                      onChange={(e) => setChangedMemoriaRam(e.target.value)}
                    >
                      <option value="0">Altere a Memória Ram</option>
                      {listaMemoriaRam.map((memoriaRam, index) => (
                        <option key={index} value={memoriaRam}>
                          {memoriaRam}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.memoriaRam}</p>
                  )}
                </li>
              </div>
            )}
            {(data.tipo === "Desktop" || data.tipo === "Notebook") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Armazenamento:</label>
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedArmazenamento}
                      onChange={(e) => setChangedArmazenamento(e.target.value)}
                    >
                      <option value="0">Altere o Armazenamento</option>
                      {listaArmazenamento.map((armazenamento, index) => (
                        <option key={index} value={armazenamento}>
                          {armazenamento}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.armazenamento}</p>
                  )}
                </li>
              </div>
            )}
            {data.tipo === "Notebook" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Cidade:</label>
                  {editMode ? (
                    <input
                      className="input-editar"
                      type="text"
                      value={changedCidade}
                      onChange={(e) => setChangedCidade(e.target.value)}
                    />
                  ) : (
                    <p>{data.cidade}</p>
                  )}
                </li>
              </div>
            )}
            {data.tipo === "Notebook" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Destinatário:</label>
                  {editMode ? (
                    <input
                      className="input-editar"
                      type="text"
                      value={changedDestinatario}
                      onChange={(e) => setChangedDestinatario(e.target.value)}
                    />
                  ) : (
                    <p>{data.destinatario}</p>
                  )}
                </li>
              </div>
            )}
            {data.tipo === "Monitor" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Marca:</label>
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedMarca}
                      onChange={(e) => setChangedMarca(e.target.value)}
                    >
                      <option value="0">Altere a Marca</option>
                      {listaMarcaMonitor.map((marca, index) => (
                        <option key={index} value={marca}>
                          {marca}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.marca || data.marcaMonitor}</p>
                  )}
                </li>
              </div>
            )}
            {data.tipo !== "Monitor" && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Marca:</label>
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedMarca}
                      onChange={(e) => setChangedMarca(e.target.value)}
                    >
                      <option value="0">Altere a Marca</option>
                      {listaMarca.map((marca, index) => (
                        <option key={index} value={marca}>
                          {marca}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.marca || data.marcaMonitor}</p>
                  )}
                </li>
              </div>
            )}
            {(data.tipo === "Monitor" || data.tipo === "Televisão") && (
              <div className="caixas">
                <li>
                  {" "}
                  <label>Tamanho:</label>
                  {editMode ? (
                    <select
                      className="select-edit"
                      value={changedTamanhoMonitor}
                      onChange={(e) => setChangedTamanhoMonitor(e.target.value)}
                    >
                      <option value="0">Altere o Tamanho</option>
                      {listaTamanhoMonitor.map((tamanho, index) => (
                        <option key={index} value={tamanho}>
                          {tamanho}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>{data.tamanhoMonitor}</p>
                  )}
                </li>
              </div>
            )}
            <div className="caixas">
              <li>
                {" "}
                <label>Projeto:</label>
                {editMode ? (
                  <input
                    className="input-editar"
                    type="text"
                    value={changedProjeto}
                    onChange={(e) => setChangedProjeto(e.target.value)}
                  />
                ) : (
                  <p>{data.projeto}</p>
                )}
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
                    <option value="0">Altere o Local</option>
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
                {editMode ? (
                  <select
                    className="select-edit"
                    value={changedEstadoConservacao}
                    onChange={(e) =>
                      setChangedEstadoConservacao(e.target.value)
                    }
                  >
                    <option value="0">Altere o Estado de Conservação</option>
                    {listaEC.map((estadoconservacao, index) => (
                      <option key={index} value={estadoconservacao}>
                        {estadoconservacao}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>{data.estadoConservacao}</p>
                )}
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Valor:</label>
                {editMode ? (
                  <input
                    className="input-editar"
                    type="text"
                    value={changedValor}
                    onChange={(e) => setChangedValor(e.target.value)}
                  />
                ) : (
                  <p>{data.valor}</p>
                )}
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Quantidade:</label>
                {editMode ? (
                  <input
                    className="input-editar"
                    type="text"
                    value={changedQuantidade}
                    onChange={(e) => setChangedQuantidade(e.target.value)}
                  />
                ) : (
                  <p>{data.quantidade}</p>
                )}
              </li>
            </div>
            <div className="caixas">
              <li>
                {" "}
                <label>Observações:</label>
                {editMode ? (
                  <input
                    className="input-editar"
                    type="text"
                    value={changedNote}
                    onChange={(e) => setChangedNote(e.target.value)}
                  />
                ) : (
                  <p>{data.notas}</p>
                )}
              </li>
            </div>
            {editMode && (
              <>
                <div className="botoesEditar">
                  <div className="esquerda">
                    <img
                      className="iconCancelar"
                      src={require("../../img/Botão Limpar.png")}
                      alt="botao-cancelar"
                      onClick={handleCancel}
                    />
                    <img
                      className="iconCadastrar"
                      src={require("../../img/salvar-editar.png")}
                      alt="botao-salvar"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                  <div className="lixeira">
                    <img
                      className="iconLixeira"
                      src={require("../../img/Trash-Bin-Circle--Streamline-Ultimate.svg.png")}
                      alt="iconlixeira"
                      onClick={() => setShowModalLixo(true)}
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
