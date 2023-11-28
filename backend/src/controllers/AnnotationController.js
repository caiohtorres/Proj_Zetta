const Annotations = require("../models/AnnotationData");

let contadorDesktop = 0;
let contadorMonitor = 0;

module.exports = {
  async read(req, res) {
    const { patrimonio } = req.params;

    if (!patrimonio) {
      return res
        .status(400)
        .json({ error: "Número do patrimônio não preenchido!" });
    }
    const annotationList = await Annotations.findOne({
      patrimonio: patrimonio,
    });

    if (annotationList) {
      return res.json(annotationList);
    }
    return res.status(401).json({ error: "Patrimônio não encontrado!" });
  },

  async create(req, res) {
    const {
      patrimonio,
      objeto,
      notas,
      estadoConservacao,
      valor,
      quantidade,
      placaVideo,
      processador,
      armazenamento,
      memoriaRam,
      tipo,
    } = req.body;

    if (!patrimonio || !objeto || !estadoConservacao || !valor || !quantidade) {
      return res
        .status(400)
        .json({ error: "Ainda há dados a serem preenchidos" });
    }

    const annotationCreated = await Annotations.create({
      patrimonio,
      objeto,
      notas,
      processador,
      placaVideo,
      estadoConservacao,
      valor,
      quantidade,
      memoriaRam,
      tipo,
      armazenamento,
    });
    if (tipo === "computador") {
      contadorDesktop += 1;
    }
    if (tipo === "Monitor") {
      contadorMonitor += 1;
    }
    return res.json(annotationCreated);
  },

  async delete(req, res) {
    const { patrimonio } = req.params;

    const annotationDeleted = await Annotations.findOneAndDelete({
      patrimonio: patrimonio,
    });
    if (annotationDeleted) {
      return res.json(annotationDeleted);
    }
    if (tipo === "computador") {
      contadorDesktop -= 1;
    }
    if (tipo === "Monitor") {
      contadorMonitor -= 1;
    }
    return res.status(401).json({ error: "Patrimônio não encontrado!" });
  },

  async readAll(req, res) {
    try {
      const annotations = await Annotations.find();
      res.json(annotations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar todos os registros." });
    }
  },

  async countByType(req, res) {
    try {
      const countDesktop = await Annotations.countDocuments({
        tipo: "computador",
      });
      const countMonitor = await Annotations.countDocuments({
        tipo: "monitor",
      });
      const counts = {
        Computador: countDesktop,
        Monitor: countMonitor,
      };

      res.json(counts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao contar os tipos." });
    }
  },
};
