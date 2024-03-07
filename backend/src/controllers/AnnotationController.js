const Annotations = require("../models/AnnotationData");
const File = require("../models/FileData");

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
  Switch: "contadorSwitch",
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
      marcaMonitor,
      tamanhoMonitor,
      destinatario,
      cidade,
      marca,
    } = req.body;
    console.log(req);
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !patrimonio ||
      !objeto ||
      !estadoConservacao ||
      !valor ||
      !quantidade ||
      !tipo
    ) {
      return res.status(400).json({ error: req.body });
    }
    console.log("75");
    console.log("82");
    try {
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
        marcaMonitor,
        tamanhoMonitor,
        destinatario,
        cidade,
        marca,
      });

      if (tipoContadores[tipo]) {
        global[tipoContadores[tipo]] += 1;
      }

      return res.status(201).json({
        success: true,
        message: "Patrimônio cadastrado com sucesso!",
        annotation: annotationCreated,
      });
    } catch (error) {
      console.log("oi");
      return res.status(500).json({ error: "Erro ao cadastrar patrimônio." });
    }
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
        counts[tipo] = await Annotations.countDocuments({
          tipo,
          local: { $ne: "Desfazimento" },
        });
      }

      res.json(counts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao contar os tipos." });
    }
  },

  async readSala(req, res) {
    const { local } = req.params;

    if (!local) {
      return res.status(401).json({ error: "Nome da sala não preenchido!" });
    }

    try {
      const annotationList = await Annotations.find({ local });

      if (annotationList.length > 0) {
        return res.json(annotationList);
      }

      return res
        .status(401)
        .json({ error: "Nenhum patrimônio encontrado para a sala!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao buscar os patrimônios da sala." });
    }
  },
};
