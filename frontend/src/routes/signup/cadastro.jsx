import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
import "../signin/login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = UseAuth();

  const handleSignup = () => {
    if (!email | !emailConf | !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/");
  };

  return (
    <div className="telaLogin">
      <form onSubmit={handleSignup}>
        <div className="tituloLogin">
          <label>Sistema de Cadastro</label>
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
            type="email"
            placeholder="Confirme seu E-mail"
            value={emailConf}
            onChange={(e) => [setEmailConf(e.target.value), setError("")]}
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
          <button type="submit">Inscrever-se</button>
        </div>
        <label className="cadastrar">
          Já tem uma conta?
          <strong className="linkCadastro">
            <Link to="/">&nbsp;Entre</Link>
          </strong>
        </label>
      </form>
    </div>
  );
};

export default Signup;
