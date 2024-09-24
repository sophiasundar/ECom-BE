const express = require("express");
const WomenCosmetic = require("../models/womncosmeticModel.js");
// const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image } = req.body;
        const womenCosmetic = new WomenCosmetic({ name, price, availiablity, description, image });
        await womenCosmetic.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
);


 // get

 router.get('/',  async (req,res)=>{
    try{
    const womenCosmetic = await WomenCosmetic.find({});
    res.json(womenCosmetic);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

// get by id's

router.get('/:id',  async (req,res)=>{
    try{
    const womenCosmetics = await WomenCosmetic.findById(req.params.id);
    if(!womenCosmetics){
        return res.status(404).json({ message: 'property not found' });
    }
    res.json(womenCosmetics);
}catch{
    res.status(500).json({ message: err.message });
}
})



module.exports = router;