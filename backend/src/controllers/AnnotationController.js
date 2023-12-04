const Annotations = require("../models/AnnotationData");

const tipoContadores = {
  Desktop: "contadorDesktop",
  Monitor: "contadorMonitor",
  Mesa: "contadorMesa",
  Workstation: "contadorWorkstation",
  Notebook: "contadorNotebook",
  Impressora: "contadorImpressora",
  Geladeira: "contadorGeladeira",
  Fogao: "contadorFogao",
  Bebedouro: "contadorBebedouro",
  Ar: "contadorAr",
  Cadeira: "contadorCadeira",
  Microondas: "contadorMicroondas",
  noBreak: "contadorNoBreak",
  Televisao: "contadorTelevisao",
};

module.exports = {
  async read(req, res) {
    const { patrimonio } = req.params;

    if (!patrimonio) {
      return res
        .status(401)
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
      local,
    } = req.body;

    if (!patrimonio || !objeto || !estadoConservacao || !valor || !quantidade) {
      return res.json({ error: "Ainda há dados a serem preenchidos" });
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
      local,
    });

    if (tipoContadores[tipo]) {
      global[tipoContadores[tipo]] += 1;
    }
    return res.json({
      success: true,
      message: "Patrimônio cadastrado com sucesso!",
      annotation: annotationCreated,
    });
  },

  async delete(req, res) {
    const { patrimonio } = req.params;

    const annotationDeleted = await Annotations.findOneAndDelete({
      patrimonio: patrimonio,
    });

    if (annotationDeleted) {
      if (tipoContadores[annotationDeleted.tipo]) {
        global[tipoContadores[annotationDeleted.tipo]] -= 1;
      }
      return res.json(annotationDeleted);
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
      const counts = {};

      for (const tipo in tipoContadores) {
        counts[tipo] = await Annotations.countDocuments({ tipo });
      }

      res.json(counts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao contar os tipos." });
    }
  },
};
