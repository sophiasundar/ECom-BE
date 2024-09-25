const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());



const homeAppRouter = require('./routes/homeAppRoute');
const electronicRouter = require('./routes/electronicsRoute');
const furnitureRouter = require('./routes/homeFurnitureRoute');
const menClothingRouter = require('./routes/menClothRoute');
const womenClothingRouter = require('./routes/womnClothRoute');
const menCosmeticRouter = require('./routes/mencosmeticsRoute');
const womenCosmeticRouter = require('./routes/womncosmeticRoute');
const searchRouter = require('./routes/searchUtils');







app.use('/homeappliance', homeAppRouter);
app.use('/electronic',electronicRouter);
app.use('/furniture', furnitureRouter);
app.use('/mencloth',menClothingRouter);
app.use('/womencloth',womenClothingRouter);
app.use('/mencosmetic',menCosmeticRouter);
app.use('/womencosmetic', womenCosmeticRouter);
app.use('/products', searchRouter);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected successfully!!");
    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
  });