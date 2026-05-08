const mongoose = require("mongoose");

const cakeSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
});

module.exports = mongoose.model("Cake", cakeSchema);