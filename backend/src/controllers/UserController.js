const Users = require("../models/UsersData");

module.exports = {
  async create(req, res) {
    const { nome, email, password } = req.body;

    try {
      const user = await Users.create({
        nome,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }
  },
};
