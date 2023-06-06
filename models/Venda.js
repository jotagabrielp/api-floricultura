const mongoose = require("mongoose");

const vendaSchema = new mongoose.Schema({
  nomeProduto: { type: String, required: true },
  quantidade: { type: Number, required: true },
  valorTotal: { type: Number, required: true },
  userId: { type: String, required: true },
  endereco: {
    CEP: { type: String, required: true },
    numero: { type: String, required: true },
    logradouro: { type: String, required: true },
    complemento: { type: String },
  },
});

module.exports = mongoose.model("Venda", vendaSchema);
