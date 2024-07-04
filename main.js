const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/userSchema");
const port = 5000;
app.use(express.urlencoded({ extends: true }));
app.use(express.json());
app.use(cors());

// Rota para cadastrar usuario

app.post("/singup", async (req, res) => {
  try {
    const { name, email, password, createAt, notes } = req.body;
    const user = {
      name,
      email,
      password,
      createAt,
      notes,
    };
    const response = await User.create(user);
    res
      .status(200)
      .json({ message: "Usuario cadastrado com sucesso", user: response });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao se cadastrar", error: error.message });
  }
});

//rota para pegar os usuarios
app.get("/users", async (req, res) => {
  try {
    const response = await User.find();
    if (!response || response.lenght === 0) {
      return res.status(404).json({ message: "Sem usuario cadastrado" });
    }
    res.status(200).json({ data: response });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao carregar usuarios", error: error.message });
  }
});
//rota para pegar um unico usuario

app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao buscar usuario", error: error.message });
  }
});

//Rota para adicionar nota para cada usuario
app.post("/users/:userId/notes", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, content, tag, createAt } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }
    const newNote = {
      title,
      content,
      tag,
      createAt,
    };
    user.notes.push(newNote);
    await user.save();
    res
      .status(200)
      .json({ message: "Nota adicionada com sucesso", note: newNote });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Erro ao Adicionar nota", error: error.message });
  }
});

// rota para deletar nota

app.delete("/users/:userId/:noteId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const noteId = req.params.noteId;
    // Encontre a nota dentro do array de notas do usuário
    const noteToDelete = user.notes.find(
      (note) => note._id.toString() === noteId
    );

    if (!noteToDelete) {
      return res.status(404).json({ message: "Nota não encontrada" });
    }

    // Remova a nota do array de notas do usuário
    user.notes = user.notes.filter((note) => note._id.toString() !== noteId);
    await user.save();

    // Envie uma resposta de sucesso
    res
      .status(200)
      .json({ message: "Nota deletada com sucesso", data: noteToDelete });
  } catch (error) {
    // Captura de erros
    res
      .status(500)
      .json({ message: "Erro ao deletar nota", error: error.message });
  }
});
app.get("/", (req, res) => {
  res.json("ola mundo");
});

mongoose
  .connect(
    "mongodb+srv://loidpadre:fMv2X8D1aewg2qgH@noteapp.9ivxjkd.mongodb.net/?retryWrites=true&w=majority&appName=NoteApp"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("DB conectado com sucesso e Servidor rodando na porta", port);
    });
  })
  .catch((error) => {
    console.log("Erro ao se conectar com a DB");
  });
