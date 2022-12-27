const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" }, // link on user
  refreshToken: { type: String, required: true },
});

module.exports = model("Token", TokenSchema);
