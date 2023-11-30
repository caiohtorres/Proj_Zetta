import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Api from "../../services/api";
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

  const criarListaProcessadores = (serie, maxGeneracao) => {
    const processadores = [];

    for (let i = maxGeneracao; i >= 1; i--) {
      const modelo = `${serie} - ${i}ª Geração`;
      processadores.push(modelo);
    }

    return processadores;
  };

  const processadoresIntel = [
    ...criarListaProcessadores("i9", 13),
    ...criarListaProcessadores("i7", 13),
    ...criarListaProcessadores("i5", 13),
    ...criarListaProcessadores("i3", 13),
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
  ];
  const listaMemoriaRam = [
    "DDR3-800 4GB",
    "DDR3-800 8GB",
    "DDR3-800 16GB",
    "DDR3-1066 4GB",
    "DDR3-1066 8GB",
    "DDR3-1066 16GB",
    "DDR3-1333 4GB",
    "DDR3-1333 8GB",
    "DDR3-1333 16GB",
    "DDR3-1600 4GB",
    "DDR3-1600 8GB",
    "DDR3-1600 16GB",
    "DDR3-1866 4GB",
    "DDR3-1866 8GB",
    "DDR3-1866 16GB",
    "DDR3-2000 4GB",
    "DDR3-2000 8GB",
    "DDR3-2000 16GB",
    "DDR3-2133 4GB",
    "DDR3-2133 8GB",
    "DDR3-2133 16GB",
    "DDR3-2400 4GB",
    "DDR3-2400 8GB",
    "DDR3-2400 16GB",
    "DDR4-1600 4GB",
    "DDR4-1600 8GB",
    "DDR4-1600 16GB",
    "DDR4-1866 4GB",
    "DDR4-1866 8GB",
    "DDR4-1866 16GB",
    "DDR4-2133 4GB",
    "DDR4-2133 8GB",
    "DDR4-2133 16GB",
    "DDR4-2400 4GB",
    "DDR4-2400 8GB",
    "DDR4-2400 16GB",
    "DDR4-2666 4GB",
    "DDR4-2666 8GB",
    "DDR4-2666 16GB",
    "DDR4-2933 4GB",
    "DDR4-2933 8GB",
    "DDR4-2933 16GB",
    "DDR4-3200 4GB",
    "DDR4-3200 8GB",
    "DDR4-3200 16GB",
    "DDR4-3600 4GB",
    "DDR4-3600 8GB",
    "DDR4-3600 16GB",
    "DDR4-4000 4GB",
    "DDR4-4000 8GB",
    "DDR4-4000 16GB",
    "DDR5-4800 4GB",
    "DDR5-4800 8GB",
    "DDR5-4800 16GB",
    "DDR5-5200 4GB",
    "DDR5-5200 8GB",
    "DDR5-5200 16GB",
    "DDR5-5600 4GB",
    "DDR5-5600 8GB",
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

  async function handleForm(e) {
    e.preventDefault();

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
    console.log(response);
  }

  return (
    <div className="cadastroPatrimonio">
      <header className="cabecalho">
        <div className="cabecalho">
          <ul>
            <li id="incluindo">Incluindo</li>
            <li id="sair">
              <Link to="/">
                <Sair />
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <div className="corpo">
        <form onSubmit={handleForm}>
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
                    tipoSelecionado = "computador";
                    break;
                  case "Monitor":
                    tipoSelecionado = "monitor";
                    break;
                  case "Mesa":
                    tipoSelecionado = "mesa";
                    break;
                  case "Workstation":
                    tipoSelecionado = "workstation";
                    break;
                  case "Notebook":
                    tipoSelecionado = "notebook";
                    break;
                  case "Impressora":
                    tipoSelecionado = "impressora";
                    break;
                  case "Geladeira":
                    tipoSelecionado = "geladeira";
                    break;
                  case "Fogao":
                    tipoSelecionado = "fogao";
                    break;
                  case "Bebedouro":
                    tipoSelecionado = "bebedouro";
                    break;
                  case "Ar":
                    tipoSelecionado = "ar";
                    break;
                  case "Cadeira":
                    tipoSelecionado = "cadeira";
                    break;
                  case "Microondas":
                    tipoSelecionado = "microondas";
                    break;
                  case "noBreak":
                    tipoSelecionado = "noBreak";
                    break;
                  case "Televisao":
                    tipoSelecionado = "televisao";
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

          {tipo === "computador" && (
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
          {tipo === "computador" && (
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
          {tipo === "computador" && (
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
          {tipo === "computador" && (
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
