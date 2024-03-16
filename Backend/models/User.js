const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        username:{
            type: String,
            require: true,
            min:3,
            max:18,
            unique: true,
        },
        email:{
            type: String,
            require: true,
            max:49,
            unique: true,
        },
        password:{
            type:String,
            require: true, min:6,
        },
    }, 
    {timestamps: true}
);


module.exports = mongoose.model("User", UserSchema);