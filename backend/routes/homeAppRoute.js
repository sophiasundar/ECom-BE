const express = require("express");
const HomeApp = require("../models/homeAppModel");
// const   authentication  = require("../middleware/auth.js");
const router = express.Router();


//   post

router.post("/", async (req, res) => {
    try {
        const { name, price, availiablity, description, image } = req.body;
        const homeApp = new HomeApp({ name, price, availiablity, description, image  });
        await homeApp.save();
        res.status(201).send("Product Added Succesfully");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
    }
);


 // get

 router.get('/',  async (req,res)=>{
    try{
    const homeappliances = await HomeApp.find({});
    res.json(homeappliances);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

// get by id's

router.get('/:id',  async (req,res)=>{
    try{
    const homeapplys = await HomeApp.findById(req.params.id);
    if(!homeapplys){
        return res.status(404).json({ message: 'property not found' });
    }
    res.json(homeapplys);
}catch{
    res.status(500).json({ message: err.message });
}
})



module.exports = router;