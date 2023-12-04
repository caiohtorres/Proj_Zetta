import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import UseAuth from "./hooks/useAuth";
import CadastroPatrimonio from "./routes/cadastroPatrimonio/cadastroPatrimonio";
import Consultar from "./routes/consultar/consultar";
import App from "./routes/home/home";
import Relatorio from "./routes/relatorio/relatorio";
import Login from "./routes/signin/login";
import Signup from "./routes/signup/cadastro";
import Sobre from "./routes/sobre/sobre";

const Private = ({ Item }) => {
  const { signed } = UseAuth();
  return signed > 0 ? <Item /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Private Item={App} />,
  },
  {
    path: "/cadastropatrimonio",
    element: <CadastroPatrimonio />,
  },
  {
    path: "/consultar",
    element: <Consultar />,
  },
  {
    path: "/relatorio",
    element: <Relatorio />,
  },
  {
    path: "/sobre",
    element: <Sobre />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/cadastrousuario",
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
);
