var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
    category : String,
    Quantity : Number,
    itemquant: Number,
    price : Number
});

module.exports = mongoose.model('product', ProductSchema);
