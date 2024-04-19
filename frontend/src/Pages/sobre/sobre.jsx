import React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import "./sobre.css";

class Sair extends React.Component {
  render() {
    return <RiArrowGoBackFill />;
  }
}

function Sobre() {
  return (
    <>
      <div className="cabecalho"></div>
      <div className="corpo-sobre">
        <label for="sobre">
          Esse é um projeto desenvolvido por Caio para fins de estudos
        </label>
      </div>
    </>
  );
}

export default Sobre;
