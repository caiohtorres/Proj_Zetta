const mongoose = require("mongoose");

const AnnotationDataSchema = new mongoose.Schema({
  patrimonio: String,
  objeto: String,
  notas: String,
  estadoConservacao: String,
  valor: String,
  quantidade: String,
  processador: String,
  placaVideo: String,
  armazenamento: String,
  memoriaRam: String,
  tipo: String,
  local: String,
  marcaMonitor: String,
  tamanhoMonitor: String,
});

module.exports = mongoose.model("Annotations", AnnotationDataSchema);
