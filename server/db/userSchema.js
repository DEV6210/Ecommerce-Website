const mongoose = require('mongoose');
//create user schema
const userSchema=new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    password:String,
    conform:String,
    address:String,
    image:String,
})

//create user model
const User=mongoose.model('user',userSchema);

module.exports=User;