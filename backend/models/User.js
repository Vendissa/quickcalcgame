// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  highScore: { type: Number, default: 0 },
  avatar: { type: String, default: '' },
  token: { type: String, default: null }, //store active login token
})

const UserModel =mongoose.model('User', userSchema);
module.exports= UserModel;