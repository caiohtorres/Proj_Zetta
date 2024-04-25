import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../Services/api";
import "./stylePag.css";

function CadastroPatrimonioEletrodomestico() {
  const [patrimonio, setPatrimonio] = useState("");
  const [objeto, setObjeto] = useState("");
  const [notas, setNotas] = useState("");
  const [estadoConservacao, setEstadoConservacao] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");

  const [marca, setMarca] = useState("");
  const [projeto, setProjeto] = useState("");
  const [data, setData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("Renderizou");

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
    "Geladeira",
    "Fogao",
    "Bebedouro",
    "Ar",

    "Microondas",

    "Televisao",
  ];

  const {
    register,
    formState: { errors },
  } = useForm();
  const patrimonioValidation = (value) => {
    if (!isNaN(value) && value.trim() !== "") {
      return true;
    }
    return "Número do patrimônio deve ser um valor numérico";
  };

  const limparCampos = () => {
    setPatrimonio("");
    setObjeto("");
    setNotas("");
    setEstadoConservacao("");
    setValor("");
    setQuantidade("");

    setTipo("");
    setLocal("");

    setMarca("");
    setProjeto("");
    setData("");
    setErrorMessage("");
  };

  async function handleForm(e) {
    e.preventDefault();

    try {
      const response = await Api.post("/annotations", {
        patrimonio: Number(patrimonio),
        objeto,
        notas,
        estadoConservacao,
        valor,
        quantidade,

        tipo,
        local,

        marca,

        projeto,
        data,
      });

      setPatrimonio("");
      setObjeto("");
      setNotas("");
      setEstadoConservacao("");
      setValor("");
      setQuantidade("");

      setTipo("");
      setLocal("");

      setProjeto("");
      setData("");
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
      <div className="cabecalho"></div>
      <h2>Cadastro Eletrodoméstico</h2>
      <div className="corpo-cadastro">
        <form onSubmit={handleForm} encType="multipart/form-data">
          <div className="form-group">
            <label>Patrimônio</label>
            <p>*obrigatorio</p>
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
            <p>*obrigatorio</p>
            <select
              className={errors?.objeto && "input-error"}
              id="select-estilizado"
              defaultValue="0"
              {...register("objeto", { required: true })}
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
                id="select-estilizado"
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

          {tipo !== "Notebook" && (
            <div className="form-group">
              <label>Local</label>
              <p>*obrigatorio</p>
              <select
                className={errors?.local && "input-error"}
                id="select-estilizado"
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
            <p>*obrigatorio</p>
            <select
              className={errors?.estadoConservacao && "input-error"}
              id="select-estilizado"
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
            <label>Projeto</label>
            <input
              type="text"
              className="projeto"
              placeholder="Projeto:"
              {...register("projeto")}
              value={projeto}
              onChange={(e) => setProjeto(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Data de aquisição</label>
            <input
              type="date"
              className="data-aquisicao"
              {...register("data")}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Valor</label>
            <p>*obrigatorio</p>
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
            <p>*obrigatorio</p>
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
            <img
              className="iconCadastrar"
              src={require("../img/Botão aplicar filtro.png")}
              alt="botao-salvar"
              onClick={handleForm}
            />

            <img
              className="iconCancelar"
              src={require("../img/Botão Limpar.png")}
              alt="botao-cancelar"
              onClick={limparCampos}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroPatrimonioEletrodomestico;
