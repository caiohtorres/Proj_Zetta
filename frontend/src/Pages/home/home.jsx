import React from "react";
import "./home.css";

function App() {
  return (
    <div id="app" className="centered-background">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="homebody">
          <img
            className="img-zetta-home"
            src={require("../img/imginicial3.png")}
            alt="img-tela-inicial"
          />
        </div>
      </body>
    </div>
  );
}

export default App;
