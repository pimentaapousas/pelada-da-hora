// routes/routes.js
const express = require("express");
const router = express.Router();

// Importando o Controlador
const AuthController = require("../controllers/AuthController");

// Definindo a rota POST /auth/register
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// Rota de teste simples
router.get("/teste", (req, res) => {
  res.json({ msg: "Rotas funcionando!" });
});

module.exports = router;
