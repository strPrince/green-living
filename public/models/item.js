// models/User.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  sl_title:String,
  sl_description:String,
  sl_price:String,
  sl_image:String,
  sf_title:String,
  sf_description:String,
  sf_price:String,
  sf_image:String,
    sf_link : String,
    sl_link:String
  // Add other fields as needed
});

const items = mongoose.model('items', dataSchema);

module.exports = items;
