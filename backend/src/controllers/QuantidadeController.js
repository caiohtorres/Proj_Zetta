const Annotations = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    const { patrimonio } = req.params;
    const { quantidade } = req.body;

    const annotation = await Annotations.findOne({ patrimonio: patrimonio });

    if (quantidade) {
      annotation.quantidade = quantidade;
      await annotation.save();
    }

    return res.json(annotation);
  },
};
