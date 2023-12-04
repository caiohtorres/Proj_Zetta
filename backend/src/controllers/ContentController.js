const Annotations = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    try {
      const { patrimonio } = req.params;
      const { notas, local } = req.body;

      const annotation = await Annotations.findOne({ patrimonio });

      if (!annotation) {
        return res.status(404).json({ error: "Documento não encontrado" });
      }

      if (notas !== undefined) {
        annotation.notas = notas;
      }

      if (local !== undefined) {
        annotation.local = local;
      }

      await annotation.save();

      return res.json(annotation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
