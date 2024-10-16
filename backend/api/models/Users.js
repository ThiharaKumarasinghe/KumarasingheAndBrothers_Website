const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, trim: true },
  photoURL: { type: String, trim: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// create model
const Users = mongoose.model("User", userSchema);
module.exports = Users;
