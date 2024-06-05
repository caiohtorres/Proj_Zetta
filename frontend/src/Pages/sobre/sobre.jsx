import React from "react";
import "./sobre.css";

function Sobre() {
  const pessoas = [
    {
      nome: "Caio Torres",
      descricao: "Desenvolvedor Full Stack",
      foto: "url-da-foto-de-caio.jpg",
      contato: "torrescaio12@gmail.com",
    },
    {
      nome: "Pessoa 2",
      descricao: "Designer",
      foto: "url-da-foto-de-p2.jpg",
      contato: "p2@example.com",
    },
    {
      nome: "Pessoa 3",
      descricao: "Designer",
      foto: "url-da-foto-de-p3.jpg",
      contato: "p3@example.com",
    },
    {
      nome: "Pessoa 4",
      descricao: "Gerente de Projetos",
      foto: "url-da-foto-de-p4.jpg",
      contato: "p4@example.com",
    },
  ];

  return (
    <>
      <h2>Sobre Nós</h2>

      <div className="corpo-sobre">
        {pessoas.map((pessoa, index) => (
          <div className="person" key={index}>
            <img src={pessoa.foto} alt={pessoa.nome} className="foto" />
            <div className="info">
              <h2>{pessoa.nome}</h2>
              <p>{pessoa.descricao}</p>
              <a href={`email:${pessoa.contato}`}>Contato</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sobre;
