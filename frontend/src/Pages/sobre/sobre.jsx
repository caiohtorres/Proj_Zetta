import React, { useState } from "react";
import fotoNicholas from "../img/Nicholas.jpg";
import fotoAnderson from "../img/anderson.png";
import fotoCaio from "../img/eu.jpeg"; // Importe a foto do Caio
import fotoGlaucio from "../img/glaucio.png"; // Importe a foto do Gláucio
import fotoRafael from "../img/rafael.jpg"; // Importe a foto do Rafael
import "./sobre.css";

function Sobre() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);

  const pessoas = [
    {
      nome: "Caio Torres",
      funcao: "Desenvolvedor Full Stack",
      descricao:
        "Desenvolvi todo o código do sistema utilizando NodeJs e ReactJs.",
      foto: fotoCaio,
      contato: "torrescaio12@gmail.com",
    },
    {
      nome: "Rafael Vilela",
      funcao: "Assessor Institucional",
      descricao:
        "Foi quem teve a ideia inicial do sistema, pensando nas melhorias e usabilidade.",
      foto: fotoRafael,
      contato: "r.alvesvilela@gmail.com",
    },
    {
      nome: "Nicholas Andrade",
      funcao: "Designer",
      descricao:
        "Equipe de Design de Soluções, desenharam todo o design do sistema.",
      foto: fotoNicholas,
      contato: "nicholas.adandrade@gmail.com",
    },
    {
      nome: "Anderson Barbosa",
      funcao: "Designer",
      descricao:
        "Equipe de Design de Soluções, desenharam todo o design do sistema.",
      foto: fotoAnderson,
      contato: "andersonbarbosa@estudante.ufla.br",
    },
    {
      nome: "Éder Teixeira",
      funcao: "Infraestrutura de Rede",
      descricao:
        "Auxiliou na infraestrutura de rede e servidor para o sistema.",
      foto: "",
      contato: "",
    },
    {
      nome: "Gláucio Martins",
      funcao: "Agradecimento especial",
      descricao:
        "Agradecimento especial ao Gláucio que me ajudou em vários problemas que tive durante o desenvolvimento, apesar de não ter vínculo nenhum com a Zetta, teve boa vontade para ajudar e contribuir com o desenvolvimento.",
      foto: fotoGlaucio,
      contato: "glaucionepre@gmail.com",
    },
  ];

  const openModal = (pessoa) => {
    setCurrentPerson(pessoa);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentPerson(null);
    setModalOpen(false);
  };

  return (
    <div className="corpo-sobre">
      <div className="sobre-container">
        <h2>Sobre Nós</h2>
        <div className="pessoa-grid">
          {pessoas.map((pessoa, index) => (
            <div className="person-card" key={index}>
              <img
                src={pessoa.foto}
                alt={pessoa.nome}
                className={`foto ${
                  pessoa.nome === "Caio Torres" ? "foto-caio" : ""
                }`}
              />
              <h3>{pessoa.nome}</h3>
              <p>{pessoa.funcao}</p>
              <button onClick={() => openModal(pessoa)}>Abrir</button>
            </div>
          ))}
        </div>
        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
              <img src={currentPerson.foto} alt={currentPerson.nome} />
              <h3>{currentPerson.nome}</h3>
              <p>{currentPerson.descricao}</p>
              {currentPerson.contato && (
                <a href={`email:${currentPerson.contato}`}>
                  <button className="contact-button">Contato</button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sobre;
