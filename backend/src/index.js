const express = require("express");
const routes = require("./routes");
const connectionDB = require("./config/dbConfig");
const cors = require("cors");
const app = express();

connectionDB();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = 7777;

app.listen(port, () =>
  console.log("Rodando com express na porta " + port + "!")
);
