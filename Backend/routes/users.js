const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register....

router.post("/register", async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPswd = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPswd
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res)=>{
    try{
        const user = await User.find({
            email: req.body.email,
        });
        if(user.length != 0){
            console.log("user Found", user);
            res.status(200).json(user);
        }
        else{
            res.send("User not exists");
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;