import React from "react";
import { createRoot } from "react-dom/client"; // Alterando a importação para 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import Routering from "./Routes/routes";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routering />
  </Router>
);
