import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CadastroPatrimonio from "./routes/cadastroPatrimonio/cadastroPatrimonio";
import Consultar from "./routes/consultar/consultar";
import App from "./routes/home/home";
import Relatorio from "./routes/relatorio/relatorio";
import Sobre from "./routes/sobre/sobre";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
