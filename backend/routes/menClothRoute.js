const express = require("express");
const MenCloth  = require("../models/menClothModel.js");
// const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image } = req.body;
        const menCloth = new MenCloth({ name, price, availiablity, description, image  });
        await menCloth.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
);


 // get

 router.get('/',  async (req,res)=>{
    try{
    const menClothing = await MenCloth.find({});
    res.json(menClothing);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

// get by id's

router.get('/:id',  async (req,res)=>{
    try{
    const menClothings = await MenCloth.findById(req.params.id);
    if(!menClothings){
        return res.status(404).json({ message: 'property not found' });
    }
    res.json(menClothings);
}catch{
    res.status(500).json({ message: err.message });
}
})



module.exports = router;