const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const Usuario = require("../models/Usuario");

const router = express.Router();

router.post("/registro", async (req, res) => {
    const { nome, senha } = req.body;
  
    const usuarioExistente = await Usuario.findOne({ nome: nome });
    if (usuarioExistente) {
      res.status(400).send("Usuário já registrado");
    } else {
      const senhaCriptografada = bcrypt.hashSync(senha, 10);
  
      const usuario = new Usuario({
        nome: nome,
        senha: senhaCriptografada,
      });
      const user = usuario.save();
      if (user) {
        res.send("Usuário registrado com sucesso");
      } else {
        res.status(500).send("Erro interno do servidor");
      }
    }
  });
  
  // Rota de login
  router.post("/login", async (req, res) => {
    const { nome, senha } = req.body;
  
    // Verificar se o usuário existe no banco de dados
    const usuario = await Usuario.findOne({ nome });
    if (!usuario) {
      res.status(401).send("Credenciais inválidas");
    } else {
      // Verificar se a senha é válida
      const senhaValida = bcrypt.compareSync(senha, usuario.senha);
      if (!senhaValida) {
        res.status(401).send("Credenciais inválidas");
      } else {
        // Gerar um token JWT
        const token = jwt.sign(
          { id: usuario._id, nome: usuario.nome, isAdmin: usuario?.isAdmin },
          "change-of-mind",
          { expiresIn: "1h" }
        );
  
        res.json({ token: token });
      }
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      await Usuario.findByIdAndDelete(id);
      res.send("Usuário excluído com sucesso");
    } catch (error) {
      res.status(500).send("Erro interno do servidor");
    }
  });
  
  router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, senha } = req.body;
  
    try {
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        res.status(404).send("Usuário não encontrado");
      } else {
        const senhaCriptografada = bcrypt.hashSync(senha, 10);
  
        usuario.nome = nome;
        usuario.senha = senhaCriptografada;
  
        await usuario.save();
        res.send("Usuário atualizado com sucesso");
      }
    } catch (error) {
      res.status(500).send("Erro interno do servidor");
    }
  });

  modules.exports = router;