const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// const  searchInAllCollections  = require('./searchUtils');


const homeAppRouter = require('./routes/homeAppRoute');
const electronicRouter = require('./routes/electronicsRoute');
const furnitureRouter = require('./routes/homeFurnitureRoute');
const menClothingRouter = require('./routes/menClothRoute');
const womenClothingRouter = require('./routes/womnClothRoute');
const menCosmeticRouter = require('./routes/mencosmeticsRoute');
const womenCosmeticRouter = require('./routes/womncosmeticRoute');
const MenCloth = require("./models/menClothModel");
const Electronic = require("./models/ElectronicsModel");
const HomeApp = require("./models/homeAppModel");
const WomenCloth = require("./models/womnClothModel");
const MenCosmetic = require("./models/mencosmeticsModel");
const WomenCosmetic = require("./models/womncosmeticModel");
const Furniture = require("./models/homeFurnitureModel");







app.use('/homeappliance', homeAppRouter);
app.use('/electronic',electronicRouter);
app.use('/furniture', furnitureRouter);
app.use('/mencloth',menClothingRouter);
app.use('/womencloth',womenClothingRouter);
app.use('/mencosmetic',menCosmeticRouter);
app.use('/womencosmetic', womenCosmeticRouter);

async function searchInAllCollections(query) {
  if (!query) {
    return { message: 'Missing search query parameter.'};
  }

  const collections = [
    Electronic,
    HomeApp,
    MenCloth,
    WomenCloth,
    MenCosmetic,
    WomenCosmetic,
    Furniture,
    
  ];

  try {
    const searchResults = await Promise.all(
      collections.map(collection => collection.find({ $text: { $search: query } }))
    );

    return searchResults.flat(); // Combine all results into a single array
  } catch (error) {
    console.error('Error searching:', error);
    return { message: 'Internal server error' };
  }
}

app.get('/search', async (req, res) => {
  const searchQuery = req.query.q;

  const results = await searchInAllCollections(searchQuery);
  res.json(results);
});

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected successfully!!");
    app.listen(8000, () => {
      console.log(`Server is running on port 8000`);
    });
  });