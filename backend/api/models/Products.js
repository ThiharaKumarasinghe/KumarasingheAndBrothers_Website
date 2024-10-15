const mongoose = require('mongoose');
const {Schema} = mongoose;

// create schema object for Products items
const productSchema = new Schema({
  name: {type: String, required: true, trim: true},
  price: {type: Number, required: true},
  image: String,
  description: String,
  category: String,
});

// create model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;