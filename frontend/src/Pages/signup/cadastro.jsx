import { motion } from "framer-motion";
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
import "./cadastro.css";

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
      console.log(data);
      setLoading(false);
      navigate("/");
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
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 0, transition: { duration: 0.3 } }}
      exit={{ x: window.innerWidth }}
    >
      <div className="telaRegistro">
        <div className="quadrados-registro">
          <div className="quadradosSuperiores">
            <div className="quadrado verde"></div>
            <div className="quadrado azul"></div>
            <div className="quadrado amarelo"></div>
            <div className="quadrado roxo"></div>
          </div>
          <div className="quadradosInferiores">
            <div className="quadrado roxo"></div>
            <div className="quadrado amarelo"></div>
            <div className="quadrado verde"></div>
            <div className="quadrado azul"></div>
          </div>
        </div>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <form className="form-Registro">
          <div className="tituloRegistro">
            <div className="bem-vindo">
              <img
                id="zettaIcon"
                src="https://ufla.br/images/noticias/2020/04_abr/logo_zetta.png"
                alt="zettaIcon"
              ></img>
              <h2>Registre-se</h2>
            </div>
          </div>
          <div className="preencherDadosRegistro">
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
          <div className="btnRegistro">
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
              <NavLink className="navlink-registrar" to="/">
                &nbsp;Entrar
              </NavLink>
            </strong>
          </label>
        </form>
      </div>
    </motion.div>
  );
};

export default Signup;
