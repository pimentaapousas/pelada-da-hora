const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  apelido: {
    type: String
  },
  idade: {
    type: Number,
    required: true
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'],
    required: true
  },
  tipo: {
    type: String,
    enum: ['linha', 'goleiro'],
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

// Transforma o Schema em um Modelo usável e exporta
const User = mongoose.model('User', UserSchema);
module.exports = User;
