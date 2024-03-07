const express = require("express");
const routes = express.Router();
const multer = require("multer");
const upload = require("./config/multer");

const AnnotationController = require("./controllers/AnnotationController");
const EConservacaoController = require("./controllers/EConservacaoController");
const ContentController = require("./controllers/ContentController");
const QuantidadeController = require("./controllers/QuantidadeController");
const UserController = require("./controllers/UserController");
const FileController = require("./controllers/FileController");
const BuscaSalaController = require("./controllers/BuscaSalaController");

//Rota Annotations
//cria
routes.post("/annotations", AnnotationController.create);
//puxa 1 patrimonio
routes.get("/annotations/:patrimonio", AnnotationController.read);
//puxa todos
routes.get("/annotations/", AnnotationController.readAll);
//deleta
routes.delete("/annotations/:patrimonio", AnnotationController.delete);
//buscar estado
routes.get("/estadoConservacao", EConservacaoController.read);
//trocar estado
routes.post("/estadoConservacao/:patrimonio", EConservacaoController.update);
//rota trocar notas
routes.post("/contentChange/:patrimonio", ContentController.update);
//trocar quantidade
routes.post("/quantidadeChange/:patrimonio", QuantidadeController.update);

routes.get("/contadorPorTipo", AnnotationController.countByType);

routes.get("/buscasala/:local", BuscaSalaController.readSala);

routes.post("/login", UserController.login);
routes.post("/cadastrousuario", UserController.create);
routes.get("/users", UserController.getAll);
routes.post("/uploads", upload.single("file"), FileController.create);
routes.get("/uploads/:file", FileController.read);

module.exports = routes;
