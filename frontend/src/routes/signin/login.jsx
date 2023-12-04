import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./login.css";

const Login = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }
    const res = signin(email, senha);
    if (res) {
      setError(res);
      return;
    }
    navigate("/home");
  };
  return (
    <div className="telaLogin">
      <form onSubmit={handleLogin}>
        <div className="tituloLogin">
          <label>Sistema de Login</label>
          <label>Controle patrimonial da Zetta</label>
        </div>
        <div className="preencherDados">
          <input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
          />
          <input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
          />
        </div>
        <label className="errorLogin">{error}</label>
        <div className="btnLogin">
          <button type="submit">Entrar</button>
        </div>
        <label className="cadastrar">
          Não tem uma conta?
          <strong className="linkCadastro">
            <Link to="/cadastrousuario">&nbsp;Registre-se</Link>
          </strong>
        </label>
      </form>
    </div>
  );
};

export default Login;
