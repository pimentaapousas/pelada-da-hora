// controllers/AuthController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, mail, password, type, age, gender } = req.body;

  try {
    // 1. Verificar se o usuário já existe
    const userExists = await User.findOne({ mail });
    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // 2. Criptografar a senha (Hash)
    // O número 10 é o "custo" do processamento (segurança vs velocidade)
    const hashPassword = await bcrypt.hash(password, 10);

    // 3. Criar o usuário no Banco
    const user = await User.create({
      name,
      mail,
      password: hashPassword, // Salvamos o hash, não a senha real
      age,
      gender,
      type
    });

    // 4. Retornar sucesso (mas não devolvemos a senha)
    user.password = undefined;

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao registrar usuário." });
  }
};
