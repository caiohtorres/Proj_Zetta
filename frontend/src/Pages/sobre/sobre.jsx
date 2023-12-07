import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

function Sobre() {
  return (
    <>
      <div className="cabecalho">
        <ul>
          <li id="nomepag">Sobre</li>
          <li id="sair">
            <Link to="/home">
              <Sair />
            </Link>
          </li>
        </ul>
      </div>
      <div className="corpo">
        <label for="sobre">
          Esse é um projeto desenvolvido por Caio para fins de estudos
        </label>
      </div>
    </>
  );
}

export default Sobre;
