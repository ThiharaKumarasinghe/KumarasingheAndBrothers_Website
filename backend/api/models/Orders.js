const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define schema for individual cart items
const cartItemSchema = new Schema({
  productID: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  price: { type: Number, required: true }
});

// Define schema for orders
const orderSchema = new Schema({
  totalPrice: { type: Number, required: true },
  email: { type: String, required: true, trim: true },
  cart: [cartItemSchema], // Array of cart items
  name: { type: String, trim: true },
  createdAt:{type: Date, default: Date.now},
});

// Create the Orders model
const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
