import { Link, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import "./navbar.css";

const Navbar = () => {
  const userService = new UserService();
  const navigate = useNavigate();
  const handleLogout = (event) => {
    event.preventDefault();
    userService.logout();
    navigate("/");
  };
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
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/salas">Salas</Link>
            </li>
            <li id="sair">
              <Link to="/" onClick={handleLogout}>
                Sair
              </Link>
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
