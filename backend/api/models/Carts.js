const mongoose = require("mongoose");
const { Schema } = mongoose;

// create schema object for cart items
const cartSchema = new Schema({
  productID: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  quantity: Number,
  image: String,
  price: Number,
  email: { type: String, required: true, trim: true },
});

// create model
const Carts = mongoose.model("Carts", cartSchema);
module.exports = Carts;