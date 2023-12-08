import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routering from "./Routes/routes";

ReactDOM.render(
  <Router>
    <Routering />
  </Router>,
  document.getElementById("root")
);
