import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Api from "../../Services/api";

import "./stylePag.css";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

function CadastroPatrimonio() {
  const [patrimonio, setPatrimonio] = useState("");
  const [objeto, setObjeto] = useState("");
  const [notas, setNotas] = useState("");
  const [estadoConservacao, setEstadoConservacao] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [processador, setProcessador] = useState("");
  const [placaVideo, setPlacaVideo] = useState("");
  const [armazenamento, setArmazenamento] = useState("");
  const [memoriaRam, setMemoriaRam] = useState("");
  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");
  const [marcaMonitor, setMarcaMonitor] = useState("");
  const [tamanhoMonitor, setTamanhoMonitor] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [cidade, setCidade] = useState("");
  const [file, setFile] = useState("");
  const [marca, setMarca] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("Renderizou");

  const criarListaProcessadores = (serie, maxGeneracao) => {
    const processadores = [];

    for (let i = maxGeneracao; i >= 1; i--) {
      const modelo = `${serie} - ${i}ª Geração`;
      processadores.push(modelo);
    }

    return processadores;
  };

  const listaMarcaMonitor = [
    "LG",
    "Samsung",
    "Dell",
    "Daten",
    "Hp",
    "Brazil PC",
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
    "Servidor 2º andar",
  ];

  const listaObjetos = [
    "Desktop",
    "Monitor",
    "Mesa",
    "Workstation",
    "Notebook",
    "Impressora",
    "Geladeira",
    "Fogao",
    "Bebedouro",
    "Ar",
    "Cadeira",
    "Microondas",
    "noBreak",
    "Televisao",
    "Switch",
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  const patrimonioValidation = (value) => {
    if (!isNaN(value) && value.trim() !== "") {
      return true;
    }
    return "Número do patrimônio deve ser um valor numérico";
  };

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await Api.post("/uploads", formData);

      setFile(response.data.src);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleForm(e) {
    e.preventDefault();

    console.log(file);
    try {
      const response = await Api.post("/annotations", {
        patrimonio: Number(patrimonio),
        objeto,
        notas,
        estadoConservacao,
        valor,
        quantidade,
        armazenamento,
        processador,
        placaVideo,
        memoriaRam,
        tipo,
        local,
        marcaMonitor,
        tamanhoMonitor,
        marca,
        destinatario,
        cidade,
        file: file,
      });

      setPatrimonio("");
      setObjeto("");
      setNotas("");
      setEstadoConservacao("");
      setValor("");
      setQuantidade("");
      setPlacaVideo("");
      setProcessador("");
      setArmazenamento("");
      setMemoriaRam("");
      setTipo("");
      setLocal("");
      setTamanhoMonitor("");
      setMarcaMonitor("");
      setDestinatario("");
      setCidade("");
      setMarca("");
      console.log(response);
      alert("Patrimônio cadastrado com sucesso!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error); // define a mensagem de erro do servidor
      } else {
        setErrorMessage("Erro ao cadastrar patrimônio."); // caso não haja uma mensagem específica do servidor
      }
      console.error("Erro ao cadastrar patrimônio: ", error);
    }
  }

  return (
    <div className="cadastroPatrimonio">
      <header className="cabecalho">
        <div className="cabecalho">
          <ul>
            <li id="incluindo">Incluindo</li>
            <li id="sair">
              <Link to="/home">
                <Sair />
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <div className="corpo">
        <form onSubmit={handleForm} encType="multipart/form-data">
          <div className="form-group">
            <label>Patrimônio</label>

            <input
              className={errors?.patrimonio && "input-error"}
              type="text"
              placeholder="Número do patrimônio:"
              {...register("patrimonio", {
                required: true,
                validate: patrimonioValidation,
              })}
              value={patrimonio}
              onChange={(e) => setPatrimonio(e.target.value)}
            />
            {errors?.patrimonio?.type === "required" && (
              <p className="error-message">Número do patrimônio é necessário</p>
            )}
            {errors?.patrimonio?.type === "validate" && (
              <p className="error-message">Patrimônio deve ser um número</p>
            )}
          </div>

          <div className="form-group">
            <label>Objeto</label>
            <select
              className={errors?.objeto && "input-error"}
              defaultValue="0"
              value={objeto}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setObjeto(selectedValue);
                let tipoSelecionado = "";
                switch (selectedValue) {
                  case "Desktop":
                    tipoSelecionado = "Desktop";
                    break;
                  case "Monitor":
                    tipoSelecionado = "Monitor";
                    break;
                  case "Mesa":
                    tipoSelecionado = "Mesa";
                    break;
                  case "Workstation":
                    tipoSelecionado = "Workstation";
                    break;
                  case "Notebook":
                    tipoSelecionado = "Notebook";
                    break;
                  case "Impressora":
                    tipoSelecionado = "Impressora";
                    break;
                  case "Geladeira":
                    tipoSelecionado = "Geladeira";
                    break;
                  case "Fogao":
                    tipoSelecionado = "Fogao";
                    break;
                  case "Bebedouro":
                    tipoSelecionado = "Bebedouro";
                    break;
                  case "Ar":
                    tipoSelecionado = "Ar";
                    break;
                  case "Cadeira":
                    tipoSelecionado = "Cadeira";
                    break;
                  case "Microondas":
                    tipoSelecionado = "Microondas";
                    break;
                  case "noBreak":
                    tipoSelecionado = "noBreak";
                    break;
                  case "Televisao":
                    tipoSelecionado = "Televisao";
                    break;
                  case "Switch":
                    tipoSelecionado = "Switch";
                    break;
                  default:
                    tipoSelecionado = "";
                }

                setTipo(tipoSelecionado);
              }}
            >
              <option value="0">Escolha seu objeto</option>
              {listaObjetos.map((objeto, index) => (
                <option key={index} value={objeto}>
                  {objeto}
                </option>
              ))}
            </select>
          </div>

          {(tipo === "Desktop" || tipo === "Notebook") && (
            <div className="form-group">
              <label>Processador</label>
              <select
                className={errors?.processador && "input-error"}
                defaultValue="0"
                value={processador}
                onChange={(e) => setProcessador(e.target.value)}
              >
                <option value="0">Escolha seu Processador</option>
                {processadoresIntel.map((processador, index) => (
                  <option key={index} value={processador}>
                    {processador}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(tipo === "Desktop" || tipo === "Notebook") && (
            <div className="form-group">
              <label>Placa de Vídeo</label>
              <select
                className={errors?.placaVideo && "input-error"}
                defaultValue="0"
                value={placaVideo}
                onChange={(e) => setPlacaVideo(e.target.value)}
              >
                <option value="0">Escolha sua Placa de Vídeo</option>
                {placaDeVideoNvidea.map((placa, index) => (
                  <option key={index} value={placa}>
                    {placa}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(tipo === "Desktop" || tipo === "Notebook") && (
            <div className="form-group">
              <label>Memória Ram</label>
              <select
                className={errors?.memoriaRam && "input-error"}
                defaultValue="0"
                value={memoriaRam}
                onChange={(e) => setMemoriaRam(e.target.value)}
              >
                <option value="0">Escolha sua Memória Ram</option>
                {listaMemoriaRam.map((memoria, index) => (
                  <option key={index} value={memoria}>
                    {memoria}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(tipo === "Desktop" || tipo === "Notebook") && (
            <div className="form-group">
              <label>Armazenamento</label>
              <select
                className={errors?.armazenamento && "input-error"}
                defaultValue="0"
                value={armazenamento}
                onChange={(e) => setArmazenamento(e.target.value)}
              >
                <option value="0">Escolha seu Armazenamento</option>
                {listaArmazenamento.map((armazenamento, index) => (
                  <option key={index} value={armazenamento}>
                    {armazenamento}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(tipo === "Monitor" || tipo === "Televisao") && (
            <div className="form-group">
              <label>Marca do monitor</label>
              <select
                className={errors?.marcaMonitor && "input-error"}
                defaultValue="0"
                value={marcaMonitor}
                onChange={(e) => setMarcaMonitor(e.target.value)}
              >
                <option value="0">Escolha a marca</option>
                {listaMarcaMonitor.map((marcaMonitor, index) => (
                  <option key={index} value={marcaMonitor}>
                    {marcaMonitor}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(tipo === "Microondas" ||
            tipo === "Geladeira" ||
            tipo === "Ar" ||
            tipo === "Cadeira" ||
            tipo === "Impressora" ||
            tipo === "Mesa" ||
            tipo === "Desktop") && (
            <div className="form-group">
              <label>Marca</label>
              <select
                className={errors?.marca && "input-error"}
                defaultValue="0"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              >
                <option value="0">Escolha a marca</option>
                {listaMarca.map((marca, index) => (
                  <option key={index} value={marca}>
                    {marca}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(tipo === "Monitor" || tipo === "Televisao") && (
            <div className="form-group">
              <label>Tamanho do monitor</label>
              <select
                className={errors?.tamanhoMonitor && "input-error"}
                defaultValue="0"
                value={tamanhoMonitor}
                onChange={(e) => setTamanhoMonitor(e.target.value)}
              >
                <option value="0">Escolha o tamanho do monitor</option>
                {listaTamanhoMonitor.map((tamanhoMonitor, index) => (
                  <option key={index} value={tamanhoMonitor}>
                    {tamanhoMonitor}
                  </option>
                ))}
              </select>
            </div>
          )}
          {tipo === "Notebook" && (
            <div className="form-group">
              <label>Destinatário</label>

              <input
                className={errors?.destinatario && "input-error"}
                type="text"
                placeholder="Nome do destinatário:"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
              />
            </div>
          )}
          {tipo === "Notebook" && (
            <div className="form-group">
              <label>Cidade</label>

              <input
                className={errors?.cidade && "input-error"}
                type="text"
                placeholder="Cidade do destinatário:"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
          )}

          {tipo !== "Notebook" && (
            <div className="form-group">
              <label>Local</label>
              <select
                className={errors?.local && "input-error"}
                defaultValue="0"
                {...register("local", {
                  validate: (value) => value !== "0",
                })}
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              >
                <option value="0">Escolha o local</option>
                {listaLocal.map((local, index) => (
                  <option key={index} value={local}>
                    {local}
                  </option>
                ))}
              </select>
              {errors?.local?.type === "validate" && (
                <p className="error-message">Local é necessário</p>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Estado de Conservação</label>
            <select
              className={errors?.estadoConservacao && "input-error"}
              defaultValue="0"
              {...register("estadoConservacao", {
                validate: (value) => value !== "0",
              })}
              value={estadoConservacao}
              onChange={(e) => setEstadoConservacao(e.target.value)}
            >
              <option value="0">Escolha o estado de conservação</option>
              <option value="Novo">Novo</option>
              <option value="Usado">Usado</option>
              <option value="Estragado">Estragado</option>
            </select>
            {errors?.estadoConservacao?.type === "validate" && (
              <p className="error-message">
                Estado de conservação é necessário
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Valor</label>
            <input
              type="text"
              className={errors?.valor && "input-error"}
              placeholder="Valor do patrimônio:"
              {...register("valor", { required: true })}
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            {errors?.valor?.type === "required" && (
              <p className="error-message">Valor do patrimônio é necessário</p>
            )}
          </div>
          <div className="form-group">
            <label>Quantidade</label>
            <input
              type="text"
              className={errors?.quantidade && "input-error"}
              placeholder="Quantidade:"
              {...register("quantidade", { required: true })}
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
            {errors?.quantidade?.type === "required" && (
              <p className="error-message">
                Quantidade do patrimônio é necessário
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Observações</label>
            <input
              type="text"
              className="notas"
              placeholder="Observações:"
              {...register("notas")}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>

          {/*<div className="form-group">
            <label>Arquivo</label>
            <br />
            <input
              type="file"
              className="file"
              accept="image/png, image/jpeg, application/pdf"
              onChange={handleUpload}
            />
            </div>*/}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="btnSalvar">
            <button type="submit" onClick={() => handleSubmit(onSubmit)()}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroPatrimonio;
