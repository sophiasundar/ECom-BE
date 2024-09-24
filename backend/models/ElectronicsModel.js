const mongoose = require("mongoose");

const electronicsSchema = new mongoose.Schema({
name: { type: String, required: true },
price: {type:Number, required: true },
description: { type: String, required: true },
availiablity: { type: String, required: true }, 
image: {
    data: Buffer,
    type: String,
    required: true
  }, 
  textIndexes: [{ fields: ['name', 'description', 'price', 'availiablity', 'image'] }] 
});

const Electronic = mongoose.model("electronics", electronicsSchema );
module.exports = Electronic;