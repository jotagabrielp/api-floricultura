// db.js
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://jota:x1M7XmxRbzhvOSLl@cluster0.epqtvvd.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Conexão com o banco de dados estabelecida."))
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
