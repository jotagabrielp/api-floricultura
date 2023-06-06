// server.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const vendasRoutes = require("./routes/venda");
const cors = require("cors");

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.use("/vendas", vendasRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
