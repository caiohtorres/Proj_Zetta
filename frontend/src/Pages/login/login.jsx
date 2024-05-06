import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/UserService";
import { validarEmail, validarSenha } from "../../Utils/validadores";
import Modal from "../components/modal";
import "./login.css";

const userService = new UserService();

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await userService.login(form);
      console.log("response do login", response);
      if (response && !response.error) {
        setShowModal(true);
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      alert("Algo de errado com o login" + error);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validadorInput = () => {
    return form && validarEmail(form.email) && validarSenha(form.password);
  };

  const confirmLogout = () => {
    navigate("/home");
    setShowModal(false);
  };

  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: 0, transition: { duration: 0.3 } }}
      exit={{ x: window.innerWidth }}
    >
      <div className="telaLogin">
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
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="body-tela-login">
          <div className="box-tudo">
            <form className="form-login">
              <div className="tituloLogin">
                <div className="bem-vindo">
                  <img
                    id="zettaIcon"
                    src="https://ufla.br/images/noticias/2020/04_abr/logo_zetta.png"
                    alt="zettaIcon"
                  ></img>
                  <h2>Bem vindo!</h2>

                  <p>Controle patrimonial da Zetta</p>
                </div>
              </div>
              <div className="boxLogin">
                <div className="preencherDados">
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    onChange={handleChange}
                    autoComplete="username"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </div>
                <div className="btn-tela-login">
                  <div className="btnLogin">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading || !validadorInput()}
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
              {/*<div className="link-registrar">
                <label className="cadastrar">
                  Não tem uma conta?
                  <strong className="linkCadastro">
                    <NavLink
                      className="navlink-registrar"
                      to="/cadastrousuario"
                    >
                      &nbsp;Registre-se
                    </NavLink>
                  </strong>
                </label>
              </div>*/}
            </form>
          </div>
        </body>
      </div>

      {/* Use o componente Modal após o formulário */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalText={"Usuário logado com sucesso!"}
        confirmAction={confirmLogout}
        isLoginPage={true}
      />
    </motion.div>
  );
};

export default Login;
