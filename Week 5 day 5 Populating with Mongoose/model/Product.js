const mongoose = require("mongoose");
const mangaProductsSchema = new mongoose.Schema({
  name: {
      type: String,
      unique: [true,"name should be unique"],
      required: [true, "name was not provided"],
      maxLength: 30,
  },
  price: {
      type: Number,
      min: 5,
      required:[true, "price was not provided"],
  },
  stock: {
      type: Number,
      min: 1,
      required:[true, "stock was not provided"],
  },
  releaseDate: {
      type: Number,
      min: 1,
      required:false,
  },
  author: {
      type: String,
      required: [true, "author name was not provided"],
      maxLength: 30,
  }
});

const Product = mongoose.model("mangaProducts", mangaProductsSchema);
module.exports = Product;