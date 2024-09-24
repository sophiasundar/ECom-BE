const mongoose = require("mongoose");

const homeApplianceSchema = new mongoose.Schema({
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

const HomeApp = mongoose.model("homeapps", homeApplianceSchema );
module.exports = HomeApp;