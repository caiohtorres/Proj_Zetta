import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import {
  validarConfirmarEmail,
  validarConfirmarSenha,
  validarEmail,
  validarNome,
  validarSenha,
} from "../../Utils/validadores";
import "../login/login.css";

const userService = new UserService();

const Signup = () => {
  const [loading, setLoading] = useState("");
  const [form, setForm] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await userService.cadastrar({
        nome: form.nome,
        email: form.email,
        password: form.password,
      });
      if (data) {
        const responseLogin = await userService.login({
          email: form.email,
          password: form.password,
        });
        if (responseLogin === true) {
          alert("Usuário cadastrado com sucesso");
          navigate("/home");
        }
      }
      setLoading(false);
    } catch (error) {
      alert("Algo de errado com o cadastro" + error);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validadorInput = () => {
    return (
      form &&
      validarEmail(form.email) &&
      validarSenha(form.password) &&
      validarNome(form.nome) &&
      validarConfirmarSenha(form.password, form.confirmarPassword) &&
      validarConfirmarEmail(form.email, form.confirmarEmail)
    );
  };

  return (
    <div className="telaLogin">
      <form>
        <div className="tituloLogin">
          <label>Sistema de Cadastro</label>
          <label>Controle patrimonial da Zetta</label>
        </div>
        <div className="preencherDados">
          <input
            name="nome"
            type="text"
            placeholder="Digite seu nome"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Digite seu E-mail"
            onChange={handleChange}
          />
          <input
            name="confirmarEmail"
            type="email"
            placeholder="Confirme seu E-mail"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Digite sua Senha"
            onChange={handleChange}
          />
          <input
            name="confirmarPassword"
            type="password"
            placeholder="Confirme sua Senha"
            onChange={handleChange}
          />
        </div>
        <div className="btnLogin">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading === true || !validadorInput()}
          >
            Cadastrar
          </button>
        </div>
        <label className="cadastrar">
          Já tem uma conta?
          <strong className="linkCadastro">
            <NavLink to="/">&nbsp;Entrar</NavLink>
          </strong>
        </label>
      </form>
    </div>
  );
};

export default Signup;
