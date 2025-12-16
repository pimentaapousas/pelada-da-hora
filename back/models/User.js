const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  surname: {
    type: String
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'],
    required: true
  },
  type: {
    type: String,
    enum: ['linha', 'goleiro'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
