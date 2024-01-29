const fs = require("fs");
const path = require("path");
const FileData = require("../models/FileData");
const upload = require("../config/multer");

module.exports = {
  async create(req, res) {
    try {
      const file = req.file;
      const filePath = file && file.path ? path.resolve(file.path) : null;

      const arquivo = new FileData({
        src: filePath,
      });

      // Salve o arquivo e obtenha o ID gerado
      const savedFile = await arquivo.save();

      // Atualize a resposta para incluir o caminho do arquivo
      res.json({ fileId: savedFile._id, src: savedFile.src });
    } catch (err) {
      console.error(err);
      res.status(500).json("Erro ao salvar o arquivo.");
    }
  },

  async remove(req, res) {
    try {
      const arquivo = await FileData.remove(req.params.id);
      if (!arquivo) {
        return res.status(404).json({ message: "Imagem não encontrada" });
      }
      fs.unlinkSync(arquivo.src);
      await arquivo.remove();
      res.json({ message: "Imagem removida com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao remover a imagem" });
    }
  },

  async read(req, res) {
    const { file } = req.params;

    if (!file) {
      return res.status(401).json({ error: "File não preenchido!" });
    }
    const fileRead = await FileData.find({
      file: file,
    });

    if (fileRead) {
      return res.json(fileRead);
    }
    return res.status(401).json({ error: "File não encontrado!" });
  },
};
