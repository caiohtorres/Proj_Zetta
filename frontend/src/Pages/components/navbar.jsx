import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import Modal from "./modal"; // Importe o componente Modal
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

  return (
    <div>
      {/* Use o componente Modal */}
      <Modal
        showModal={showModal}
        confirmLogout={confirmLogout}
        setShowModal={setShowModal}
      />

      <div className="navbar">
        <div className="navLetras">
          <div className="planejaZetta">
            <img
              src={require("../img/planejazetta.png")}
              alt="planejaZetta"
              width={160}
              height={89}
              onClick={() => navigate("/home")}
            />
          </div>
          <nav>
            <ul className="ul-img">
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
              <li className={location.pathname === "/salas" ? "active" : ""}>
                <Link to="/salas">Salas</Link>
              </li>
              <li>
                <Link
                  className="botaocadastraroffhover"
                  to="/cadastropatrimonio"
                >
                  <img
                    src={require("../img/Botão Cadastrar patrimonio.png")}
                    alt="botao-cadastrar-patrimonio"
                    width={150}
                  />
                </Link>
              </li>
            </ul>
          </nav>
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
            <div className="zettaiconfooter">
              <img
                src={require("../img/zettaicon.png")}
                alt="Zetta Icon"
                width={40}
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Navbar;
