const mongoose = require('mongoose');
//create user schema
const userSchema=new mongoose.Schema({
    sid:String,
    pass:String
})

//create user model
const Admin=mongoose.model('admin',userSchema);
module.exports=Admin;