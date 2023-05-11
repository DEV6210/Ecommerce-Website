const mongoose =require('mongoose')

const DeviceSchema=new mongoose.Schema({
  device:{
    type:Array
  }
})
// uploadproduct model
const Device=mongoose.model('device',DeviceSchema);
module.exports=Device
