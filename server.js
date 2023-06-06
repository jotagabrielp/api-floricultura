// server.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const vendasRoutes = require("./routes/venda");
const usuarioRoutes = require("./routes/usuario");
const produtoRoutes = require("./routes/produto");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use("/vendas", vendasRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/produtos", produtoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
