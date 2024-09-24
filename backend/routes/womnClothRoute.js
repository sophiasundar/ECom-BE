const express = require("express");
const WomenCloth  = require("../models/womnClothModel.js");
// const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image } = req.body;
        const womenCloth = new WomenCloth({ name, price, availiablity, description, image });
        await womenCloth.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
);


 // get

 router.get('/',  async (req,res)=>{
    try{
    const womenClothing = await WomenCloth.find({});
    res.json(womenClothing);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

// get by id's

router.get('/:id',  async (req,res)=>{
    try{
    const womenClothings = await WomenCloth.findById(req.params.id);
    if(!womenClothings){
        return res.status(404).json({ message: 'property not found' });
    }
    res.json(womenClothings);
}catch{
    res.status(500).json({ message: err.message });
}
})



module.exports = router;