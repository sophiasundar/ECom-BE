const express = require("express");
const Furniture  = require("../models/homeFurnitureModel.js");
// const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image } = req.body;
        const furniture = new Furniture({ name, price, availiablity, description, image  });
        await furniture.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
);


 // get

 router.get('/',  async (req,res)=>{
    try{
    const homefurniture = await Furniture.find({});
    res.json(homefurniture);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

// get by id's

router.get('/:id',  async (req,res)=>{
    try{
    const homefurs = await Furniture.findById(req.params.id);
    if(!homefurs){
        return res.status(404).json({ message: 'property not found' });
    }
    res.json(homefurs);
}catch{
    res.status(500).json({ message: err.message });
}
})



module.exports = router;