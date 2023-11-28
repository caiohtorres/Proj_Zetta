const Annotations = require("../models/AnnotationData");
const { update } = require("../models/AnnotationData");

module.exports = {
  async read(req, res) {
    const estadoConservacao = req.query;

    const estadoConservacaoNovo = await Annotations.find(estadoConservacao);
    return res.json(estadoConservacaoNovo);
  },

  async update(req, res) {
    const { patrimonio } = req.params;

    const annotation = await Annotations.findOne({ patrimonio: patrimonio });
  },
};
