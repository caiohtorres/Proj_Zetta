const Annotations = require("../models/AnnotationData");

module.exports = {
  async update(req, res) {
    try {
      const { patrimonio } = req.params;
      const {
        notas,
        local,
        marca,
        estadoConservacao,
        processador,
        placaVideo,
        memoriaRam,
        armazenamento,
        projeto,
        data,
        destinatario,
        cidade,
        valor,
        quantidade,
      } = req.body;

      const annotation = await Annotations.findOne({ patrimonio });

      if (!annotation) {
        return res.status(404).json({ error: "Documento não encontrado" });
      }

      // Atualize os campos conforme necessário
      if (notas !== undefined) {
        annotation.notas = notas;
      }
      if (local !== undefined) {
        annotation.local = local;
      }
      if (marca !== undefined) {
        annotation.marca = marca;
      }
      if (estadoConservacao !== undefined) {
        annotation.estadoConservacao = estadoConservacao;
      }
      if (processador !== undefined) {
        annotation.processador = processador;
      }
      if (placaVideo !== undefined) {
        annotation.placaVideo = placaVideo;
      }
      if (memoriaRam !== undefined) {
        annotation.memoriaRam = memoriaRam;
      }
      if (armazenamento !== undefined) {
        annotation.armazenamento = armazenamento;
      }
      if (projeto !== undefined) {
        annotation.projeto = projeto;
      }
      if (data !== undefined) {
        annotation.data = data;
      }
      if (destinatario !== undefined) {
        annotation.destinatario = destinatario;
      }
      if (cidade !== undefined) {
        annotation.cidade = cidade;
      }
      if (valor !== undefined) {
        annotation.valor = valor;
      }
      if (quantidade !== undefined) {
        annotation.quantidade = quantidade;
      }

      await annotation.save();

      return res.json(annotation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
