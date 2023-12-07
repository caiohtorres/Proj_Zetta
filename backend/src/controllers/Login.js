const Users = require("../models/UsersData");

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email, password });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      user.token = token;

      res.status(200).json({
        message: "Login bem-sucedido",
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
