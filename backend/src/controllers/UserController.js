const jwt = require("jsonwebtoken");
const Users = require("../models/UsersData");
require("dotenv").config();

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email, password });

      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(200).json({
        message: "Login bem-sucedido",
        user: {
          _id: user._id,
          nome: user.nome,
          email: user.email,
        },
        token: {
          token,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  async create(req, res) {
    const { nome, email, password } = req.body;

    try {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "E-mail já cadastrado" });
      }

      const user = await Users.create({
        nome,
        email,
        password,
      });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      user.token = token;

      return res.status(201).json(user);
    } catch (error) {
      console.error("Error during user creation:", error);
      return res.status(400).json({ error: "Erro ao cadastrar usuário" });
    }
  },

  async getAll(req, res) {
    try {
      console.log("Entrou na rota GET /users");
      const users = await Users.find();
      console.log("Usuários encontrados:", users);

      res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
