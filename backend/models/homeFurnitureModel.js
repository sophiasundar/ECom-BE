const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
name: { type: String, required: true },
price: {type:Number, required: true },
description: { type: String },
availiablity: { type: String }, 
image: {
    data: Buffer,
    type: String,
  },
  textIndexes: [{ fields: ['name', 'description', 'price', 'availiablity', 'image'] }] 
});

const Furniture = mongoose.model("furnitures", furnitureSchema );
module.exports = Furniture;