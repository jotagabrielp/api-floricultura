const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    senha: String,
  });

module.exports = mongoose.model("Usuario", UsuarioSchema);