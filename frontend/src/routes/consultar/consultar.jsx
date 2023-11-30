import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Api from "../../services/api";
import Busca from "./busca/busca";
import "./consultar.css";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

const refreshPage = () => {
  window.location.reload();
};

function Consultar() {
  const [patrimonioById, setPatrimonioById] = useState();
  const [data, setData] = useState({});
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const getPatrimonioById = async (ev) => {
    ev.preventDefault();
    console.log(ev);
    try {
      const response = await Api.get(
        "http://177.105.35.235:7777/annotations/" + patrimonioById
      );
      const data = response.data;
      setData(data);
      setMostrarTodos(false);
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Patrimônio não encontrado!");
      refreshPage();
    }
  };

  const getAllPatrimonios = async (ev) => {
    ev.preventDefault();
    try {
      const response = await Api.get("http://177.105.35.235:7777/annotations/");
      const data = response.data;
      setData(data);
      setMostrarTodos(true);
      console.log(data);
    } catch (err) {
      console.log(err);
      alert("Erro ao buscar todos os patrimônios!");
      refreshPage();
    }
  };

  const renderColumns = () => {
    if (!data.length) {
      return null;
    }

    const rows = [];

    data.forEach((dado, index) => {
      rows.push(
        <tr key={index}>
          <td>{dado.objeto}</td>
          <td>{dado.patrimonio}</td>
        </tr>
      );
    });

    return rows;
  };

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="consultar">
      <div className="cabecalho">
        <ul>
          <li id="nomepag">Consultando</li>
          <li id="sair">
            <Link to="/">
              <Sair />
            </Link>
          </li>
        </ul>
      </div>
      <div className="corpo">
        <form onSubmit={getPatrimonioById}>
          <div className="form-group">
            <label>Digite o número do patrimônio a ser consultado:</label>
            <input
              className={errors?.patrimonio && "input-error"}
              type="text"
              placeholder="Número do patrimônio"
              {...register("patrimonio", { required: true })}
              value={patrimonioById}
              onChange={(ev) => setPatrimonioById(ev.target.value)}
            />
            {errors?.patrimonio?.type === "required" && (
              <p className="error-message">Número do patrimônio é necessário</p>
            )}
          </div>
          <div className="botoes">
            <div className="btnSalvar">
              <button type="submit">Consultar</button>
            </div>
            <div className="divVazia"></div>
            <div className="btnAll">
              <button type="submit" onClick={getAllPatrimonios}>
                Mostrar tudo
              </button>
            </div>
          </div>
        </form>
      </div>
      {!!data?.patrimonio && (
        <main>
          <ul>
            <Busca data={data} />
          </ul>
        </main>
      )}
      <div>
        {mostrarTodos && (
          <div>
            <table className="mostrarTodos">
              <thead>
                <tr>
                  <th>Objeto</th>
                  <th>Número do patrimônio</th>
                </tr>
              </thead>
              <tbody>{renderColumns()}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Consultar;
