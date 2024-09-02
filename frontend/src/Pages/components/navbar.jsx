import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import Modal from "./modal";
import "./navbar.css";

const Navbar = ({ children }) => {
  const userService = new UserService();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const confirmLogout = () => {
    userService.logout();
    navigate("/");
  };

  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalText={"Deseja realmente sair?"}
        confirmAction={confirmLogout}
      />

      <div className="navbar">
        <div className="navLetras">
          <div className="planejaZetta">
            <img
              className="planejaZettaImg"
              src={require("../img/planejazetta.png")}
              alt="planejaZetta"
              onClick={() => navigate("/home")}
            />
          </div>
          <div className="nav-esquerda">
            <div className="menu-toggle" onClick={toggleMenu}>
              {menuOpen ? "✖" : "☰"}
            </div>
            <nav className={menuOpen ? "active" : ""}>
              <ul className="ul-img">
                <li className="menu-back-icon">
                  <img
                    className="back-icon"
                    src={require("../img/voltar.png")}
                    alt="Voltar"
                    onClick={() => setMenuOpen(!menuOpen)}
                    width={20}
                  />
                </li>
                <li
                  className={location.pathname === "/consultar" ? "active" : ""}
                >
                  <Link to="/consultar">Consultar patrimônio</Link>
                </li>
                <li
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {/*<li className={location.pathname === "/salas" ? "active" : ""}>
                  <Link to="/salas">Salas</Link>
  </li>*/}
                <li>
                  <Link
                    className="botaocadastraroffhover"
                    to="/cadastropatrimonio"
                  >
                    <img
                      className="botaocadastrarpatrimonio"
                      src={require("../img/Botão Cadastrar patrimonio.png")}
                      alt="botao-cadastrar-patrimonio"
                      width={200}
                    />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="body">{children}</div>
        <div className="separador"></div>
        <footer className="footer">
          <div className="ul-footer">
            <ul>
              <li id="sair">
                <Link to="/" onClick={handleLogout}>
                  <img
                    src={require("../img/sair.png")}
                    className="imgsair"
                    alt="sair"
                    width={20}
                    height={15}
                  />
                  Sair
                </Link>
              </li>
              <li id="sobre">
                <Link to="/sobre">Sobre</Link>
              </li>
            </ul>
            <motion.div
              className="zettaiconfooter"
              whileHover={{ scale: 1.45 }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src={
                  hovering
                    ? require("../img/transicaozetta.png")
                    : require("../img/zettaicon.png")
                }
                alt="Zetta Icon"
                width={40}
              />
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Navbar;
