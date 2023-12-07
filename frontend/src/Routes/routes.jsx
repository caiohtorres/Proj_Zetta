import React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CadastroPatrimonio from "../Pages/cadastroPatrimonio/cadastroPatrimonio";
import Consultar from "../Pages/consultar/consultar";
import App from "../Pages/home/home";
import Login from "../Pages/login/login";
import Relatorio from "../Pages/relatorio/relatorio";
import Signup from "../Pages/signup/cadastro";
import Sobre from "../Pages/sobre/sobre";
import ProtectedRoutes from "./ProtectedRoutes";

const Routering = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrousuario" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <App />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cadastropatrimonio"
          element={
            <ProtectedRoutes>
              <CadastroPatrimonio />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/consultar"
          element={
            <ProtectedRoutes>
              <Consultar />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/relatorio"
          element={
            <ProtectedRoutes>
              <Relatorio />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/sobre"
          element={
            <ProtectedRoutes>
              <Sobre />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routering;
