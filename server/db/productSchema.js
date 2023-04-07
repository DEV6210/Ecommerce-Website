const mongoose =require('mongoose')

const productSchema=new mongoose.Schema({
  name:String,
  desc:String,
  catagory:String,
  original_price:String,
  p_off_discount:String,
  inr_off:String,
  seles_price:String,
  image:String,
})
// uploadproduct model
const Product=mongoose.model('product',productSchema);
module.exports=Product
