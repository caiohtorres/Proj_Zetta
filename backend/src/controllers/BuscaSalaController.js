const BuscaSala = require("../models/AnnotationData");

module.exports = {
  async readSala(req, res) {
    let { local } = req.params;

    if (!local) {
      return res.status(401).json({ error: "Nome da sala não preenchido!" });
    }

    // Remover espaços extras
    local = local.trim();

    try {
      const annotationList = await BuscaSala.find({ local });

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
