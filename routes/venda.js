const express = require("express");
const router = express.Router();
const Venda = require("../models/Venda");

// Rota para criar uma nova venda
router.post("/", (req, res) => {
  const venda = new Venda(req.body);
  venda
    .save()
    .then(() => res.status(201).json(venda))
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Erro ao salvar a venda." });
    });
});

router.get("/", (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: "O userId é obrigatório." });
  }

  Venda.find({ userId: userId })
    .then((vendas) => res.json(vendas))
    .catch((error) =>
      res.status(500).json({ error: "Erro ao obter as vendas." })
    );
});

router.delete("/:id", (req, res) => {
  const vendaId = req.params.id;

  Venda.findByIdAndRemove(vendaId)
    .then(() => res.status(204).end())
    .catch((error) =>
      res.status(500).json({ error: "Erro ao excluir a venda." })
    );
});

module.exports = router;
