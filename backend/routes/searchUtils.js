const express = require("express");
const Product = require("../models/searchfilterModels");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image, category } = req.body;
        const products =  new Product({ name, price, availiablity, description, image, category });
        await products.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
  );
  
  
  // API route for search and filter
  router.get('/search', async (req, res) => {
    const  category  = req.query.category;
    const  searchQuery = req.query.searchQuery;
    console.log(searchQuery);
  
    const query = {};
  
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: 'i' };
    }
  
    if (category) {
      query.category = {$regex:category, $options: 'i' };
    }
  
    try {
      const products = await Product.find(query);
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
module.exports = router;