const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  username: String,
  clicks: { type: Number, default: 0 },
  energy: { type: Number, default: 10 }
});

module.exports = mongoose.model("User", UserSchema);
