// controllers/AuthController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, mail, password, type, age, gender } = req.body;

  try {
    // 1. Verificar se o usuário já existe
    const userExists = await User.findOne({ mail });
    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // 2. Criptografar a password (Hash)
    // O número 10 é o "custo" do processamento (segurança vs velocidade)
    const hashPassword = await bcrypt.hash(password, 10);

    // 3. Criar o usuário no Banco
    const user = await User.create({
      name,
      mail,
      password: hashPassword,
      age,
      gender,
      type,
    });

    // 4. Retornar sucesso (mas não devolvemos a password)
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

exports.login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    // 1. Buscar o usuário pelo mail
    // O .select('+password') serve para trazer a password (que estava oculta no model)
    const user = await User.findOne({ mail }).select("+password");

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    // 2. Verificar se a password bate com o Hash do banco
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ error: "password inválida" });
    }

    // 3. Gerar o Token JWT (O Crachá)
    const token = jwt.sign(
      { id: user._id }, // O que guardamos no token (ID do usuário)
      process.env.JWT_SECRET, // A chave secreta do .env
      { expiresIn: "1d" } // O token expira em 1 dia
    );

    // 4. Limpar a password antes de devolver os dados
    user.password = undefined;

    return res.json({
      message: "Logado com sucesso!",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro no login" });
  }
};
