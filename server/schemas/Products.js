const mongoose = require("mongoose");

// Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  sale: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  image: {
    type: String,
    default: "",
  },
  apiKey: { type: String, required: true },
  category: {
    type: Array,
    default: ["uncategorised"],
  },
  stock: {
    type: Number,
    default: 1,
  },
});

// Model
var Product = mongoose.model("Product", ProductSchema);

module.exports = {
  Product,
};
