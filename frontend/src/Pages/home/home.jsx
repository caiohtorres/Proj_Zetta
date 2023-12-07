import React from "react";
import Navbar from "../components/navbar.jsx";
import "./home.css";

function App() {
  return (
    <div id="app">
      <Navbar />

      <div id="chamativo">
        <h1>CONTROLE PATRIMONIAL ZETTA</h1>
        <img
          id="zettaIcon"
          src="https://ufla.br/images/noticias/2020/04_abr/logo_zetta.png"
          alt="zettaIcon"
        ></img>
      </div>
    </div>
  );
}

export default App;
