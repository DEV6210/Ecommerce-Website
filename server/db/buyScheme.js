const mongoose=require('mongoose')


const buySchema=new mongoose.Schema({
    uid:String,
    uname:String,
    email:String,
    phone:String,
    address:String,
    uimage:String,

    pid:String,
    pname:String,
    desc:String,
    catagory:String,
    price:String,
    qty:String,
    totalprice:String,
    payment:String,
    status:String,
    pimage:String,
})
const Buy=mongoose.model('buy',buySchema)
module.exports=Buy