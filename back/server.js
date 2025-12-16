const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // NOVO: Importando o Mongoose
const routes = require("./routes/routes"); // <--- ADICIONE ISSO

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações (Middlewares)
app.use(cors());
app.use(express.json());
app.use(routes);


// NOVO: Conexão com o Banco de Dados
// O servidor só vai iniciar SE o banco conectar primeiro
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1); // Encerra o app se não conectar
  }
};

// Rotas
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend do Projeto Pelada está ON!",
    status: "sucesso",
  });
});

// Inicialização
// Chamamos a função de conexão antes de subir o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta: http://localhost:${PORT}`);
  });
});
