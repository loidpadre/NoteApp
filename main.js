const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("ola mundo");
});

mongoose
  .connect(
    "mongodb+srv://loidpadre:fMv2X8D1aewg2qgH@noteapp.9ivxjkd.mongodb.net/?retryWrites=true&w=majority&appName=NoteApp",
  )
  .then(() => {
    app.listen(port, () => {
      console.log("DB conectado com sucesso e Servidor rodando na porta", port);
    });
  })
  .catch((error) => {
    console.log("Erro ao se conectar com a DB");
  });
