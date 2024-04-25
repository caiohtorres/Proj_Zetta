import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CadastroPatrimonio from "../Pages/cadastroPatrimonio/cadastroPatrimonio";

import CadastroPatrimonioEletrodomestico from "../Pages/cadastroPatrimonio/cadastroEletrodomestico";
import CadastroPatrimonioEletronico from "../Pages/cadastroPatrimonio/cadastroEletronico";
import CadastroPatrimonioMovel from "../Pages/cadastroPatrimonio/cadastroMovel";
import Navbar from "../Pages/components/navbar";
import Consultar from "../Pages/consultar/consultar";
import Dashboard from "../Pages/dashboard/dashboard";
import App from "../Pages/home/home";
import Login from "../Pages/login/login";
import Salas from "../Pages/salas/salas";
import Signup from "../Pages/signup/cadastro";
import Sobre from "../Pages/sobre/sobre";
import ProtectedRoutes from "./ProtectedRoutes";

const Routering = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastrousuario" element={<Signup />} />

        <Route
          path="/home/*"
          element={
            <ProtectedRoutes>
              <Navbar>
                <App />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cadastropatrimonio"
          element={
            <ProtectedRoutes>
              <Navbar>
                <CadastroPatrimonio />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cadastropatrimonioeletronico"
          element={
            <ProtectedRoutes>
              <Navbar>
                <CadastroPatrimonioEletronico />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cadastropatrimonioeletrodomestico"
          element={
            <ProtectedRoutes>
              <Navbar>
                <CadastroPatrimonioEletrodomestico />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/cadastropatrimoniomovel"
          element={
            <ProtectedRoutes>
              <Navbar>
                <CadastroPatrimonioMovel />
              </Navbar>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/consultar"
          element={
            <ProtectedRoutes>
              <Navbar>
                <Consultar />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Navbar>
                <Dashboard />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/salas"
          element={
            <ProtectedRoutes>
              <Navbar>
                <Salas />
              </Navbar>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/sobre"
          element={
            <ProtectedRoutes>
              <Navbar>
                <Sobre />
              </Navbar>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default Routering;
