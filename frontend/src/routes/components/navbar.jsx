import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./navbar.css";

const Navbar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="bloco">
        <div className="navLetras">
          <ul>
            <li>
              <Link to="/cadastropatrimonio">Cadastro Patrimonio</Link>
            </li>
            <li>
              <Link to="/consultar">Consultar</Link>
            </li>
            <li>
              <Link to="/relatorio">Relatorio</Link>
            </li>
            <li id="sair" onClick={() => [signout(), navigate("/")]}>
              <Link to="/sair">Sair</Link>
            </li>
            <li id="sobre">
              <Link to="/sobre">Sobre</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
