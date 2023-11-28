const Annotations = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    const { patrimonio } = req.params;
    const { notas } = req.body;

    const annotation = await Annotations.findOne({ patrimonio: patrimonio });

    if (notas) {
      annotation.notas = notas;
      await annotation.save();
    }

    return res.json(annotation);
  },
};
