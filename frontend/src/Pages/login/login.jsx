import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { validarEmail, validarSenha } from "../../Utils/validadores";
import "./login.css";

const userService = new UserService();

const Login = () => {
  const [loading, setLoading] = useState("");
  const [form, setForm] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await userService.login(form);
      console.log("response do login", response);
      if (response === true) {
        alert("Usuário logado com sucesso");
        navigate("/home");
      }

      setLoading(false);
    } catch (error) {
      alert("Algo de errado com o login" + error);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validadorInput = () => {
    return form && validarEmail(form.email) && validarSenha(form.password);
  };

  return (
    <div className="telaLogin">
      <form>
        <div className="tituloLogin">
          <label>Sistema de Login</label>
          <label>Controle patrimonial da Zetta</label>
        </div>
        <div className="preencherDados">
          <input
            name="email"
            type="email"
            placeholder="Digite seu E-mail"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Digite sua Senha"
            onChange={handleChange}
          />
        </div>
        <div className="btnLogin">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading === true || !validadorInput()}
          >
            Entrar
          </button>
        </div>
        <label className="cadastrar">
          Não tem uma conta?
          <strong className="linkCadastro">
            <NavLink to="/cadastrousuario">&nbsp;Registre-se</NavLink>
          </strong>
        </label>
      </form>
    </div>
  );
};

export default Login;
