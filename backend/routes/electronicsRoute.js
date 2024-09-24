const express = require("express");
const Electronic = require("../models/ElectronicsModel.js");
// const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image } = req.body;
        const electronic =  new Electronic ({ name, price, availiablity, description, image  });
        await electronic.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
);


 // get

 router.get('/',  async (req,res)=>{
    try{
    const electronics = await Electronic.find({});
    res.json(electronics);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

// get by id's

router.get('/:id',  async (req,res)=>{
    try{
    const elecpro = await Electronic.findById(req.params.id);
    if(!elecpro){
        return res.status(404).json({ message: 'property not found' });
    }
    res.json(elecpro);
}catch{
    res.status(500).json({ message: err.message });
}
})



module.exports = router;