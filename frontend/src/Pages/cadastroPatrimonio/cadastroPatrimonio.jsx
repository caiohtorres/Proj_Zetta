import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./cadastropatrimoniomovel.css";

function CadastroPatrimonio() {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredEletronico, setHoveredEletronico] = useState(null);
  const [hoveredMovel, setHoveredMovel] = useState(null);
  const [hoveredEletrodomestico, setHoveredEletrodomestico] = useState(null);

  return (
    <body className="cadastromovel">
      <h2>Escolha o tipo de patrimônio</h2>
      <div className="arrumawidth">
        <div className="escolha">
          <div className="escolhapatrimonio">
            <div
              className={`caixaescolha ${hoveredEletronico ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredEletronico(true)}
              onMouseLeave={() => setHoveredEletronico(false)}
            >
              <div
                className="caixaroxa"
                onMouseEnter={() => setHoveredImage("eletronico")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={require("../img/imgeletronico.png")}
                  alt="imgeletronico"
                  width={140}
                  className="imagem-patrimonio"
                  style={{ opacity: hoveredImage === "eletronico" ? 0 : 1 }}
                />
                <motion.img
                  src={require("../img/transicaoeletronico.png")}
                  alt="imgeletronico"
                  width={220}
                  initial={{ opacity: 0, x: "0%", y: "0%" }}
                  animate={{
                    opacity: hoveredImage === "eletronico" ? 1 : 0,
                    x: hoveredImage === "eletronico" ? "30%" : "0%",
                    y: hoveredImage === "eletronico" ? "50%" : "50%",
                  }}
                  transition={{ duration: 0.5, type: "tween" }}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
              <div className="texttipopatrimonio">
                <h2 className="texttipopatrimonio">Eletrônicos</h2>
              </div>
              <Link to="/cadastropatrimonioeletronico">
                <button
                  className="botaoescolhapatrimonio"
                  onMouseEnter={() => setHoveredImage("eletronico")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  Cadastrar
                </button>
              </Link>
            </div>
          </div>
          <div className="escolhapatrimonio">
            <div
              className={`caixaescolha ${hoveredMovel ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredMovel(true)}
              onMouseLeave={() => setHoveredMovel(false)}
            >
              <div
                className="caixaroxa"
                onMouseEnter={() => setHoveredImage("movel")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={require("../img/imgmovel.png")}
                  alt="imgmovel"
                  width={140}
                  className="imagem-patrimonio"
                  style={{ opacity: hoveredImage === "movel" ? 0 : 1 }}
                />
                <motion.img
                  src={require("../img/transicaomovel.png")}
                  alt="imgmovel"
                  width={220}
                  initial={{ opacity: 0, x: "0%", y: "0%" }}
                  animate={{
                    opacity: hoveredImage === "movel" ? 1 : 0,
                    x: hoveredImage === "movel" ? "30%" : "0%",
                    y: hoveredImage === "movel" ? "30%" : "30%",
                  }}
                  transition={{ duration: 0.5, type: "tween" }}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                />
              </div>
              <div className="texttipopatrimonio">
                <h2 className="texttipopatrimonio">Móveis</h2>
              </div>
              <Link to="/cadastropatrimoniomovel">
                <button
                  className="botaoescolhapatrimonio"
                  onMouseEnter={() => setHoveredImage("movel")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  Cadastrar
                </button>
              </Link>
            </div>
          </div>
          <div className="escolhapatrimonio">
            <div
              className={`caixaescolha ${
                hoveredEletrodomestico ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredEletrodomestico(true)}
              onMouseLeave={() => setHoveredEletrodomestico(false)}
            >
              <div
                className="caixaroxa"
                onMouseEnter={() => setHoveredImage("eletrodomestico")}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={require("../img/imgeletrodomestico.png")}
                  alt="imgeletrodomestico"
                  width={140}
                  className="imagem-patrimonio"
                  style={{
                    opacity: hoveredImage === "eletrodomestico" ? 0 : 1,
                  }}
                />
                <motion.img
                  src={require("../img/transicaoeletrodomestico.png")}
                  alt="imgeletrodomestico"
                  width={230}
                  initial={{ opacity: 0, x: "0%", y: "0%" }}
                  animate={{
                    opacity: hoveredImage === "eletrodomestico" ? 1 : 0,
                    x: hoveredImage === "eletrodomestico" ? "30%" : "0%",
                    y: hoveredImage === "eletrodomestico" ? "80%" : "80%",
                  }}
                  transition={{ duration: 0.5, type: "tween" }}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                />
              </div>
              <div className="texttipopatrimonio">
                <h2 className="texttipopatrimonio">Eletrodoméstico</h2>
              </div>
              <Link to="/cadastropatrimonioeletrodomestico">
                <button
                  className="botaoescolhapatrimonio"
                  onMouseEnter={() => setHoveredImage("eletrodomestico")}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  Cadastrar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default CadastroPatrimonio;
