const router = require("express").Router();
const Pin = require("../models/Pin");

//Creating Pin 

router.post("/", async (req, res)=>{
    console.log(req.body)
    const newPin = new Pin(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/", async (req, res)=>{
    console.log(req.body);
    try{
        const data = await Pin.find(req.body);
        res.send("Yes found!!!!!");
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;