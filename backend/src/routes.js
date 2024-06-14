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
routes.post("/annotations", AnnotationController.create);
routes.get("/annotations/:patrimonio", AnnotationController.read);
routes.get("/annotations/", AnnotationController.readAll);
routes.delete("/annotations/:patrimonio", AnnotationController.delete);
routes.get("/estadoConservacao", EConservacaoController.read);
routes.post("/estadoConservacao/:patrimonio", EConservacaoController.update);
routes.post("/contentChange/:patrimonio", ContentController.update);
routes.post("/quantidadeChange/:patrimonio", QuantidadeController.update);
routes.get("/contadorPorTipo", AnnotationController.countByType);
routes.get("/buscasala/:local", BuscaSalaController.readSala);
routes.post("/login", UserController.login);
routes.post("/cadastrousuario", UserController.create);
routes.get("/users", UserController.getAll);
routes.post("/uploads", upload.single("file"), FileController.create);
routes.get("/uploads/:file", FileController.read);

module.exports = routes;
