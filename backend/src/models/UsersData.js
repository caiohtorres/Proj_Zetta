const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("Users", UserDataSchema);
