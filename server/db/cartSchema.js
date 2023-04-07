const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id: String,
    product_id: String,
    
    name: String,
    desc: String,
    catagory: String,
    original_price: String,
    p_off_discount: String,
    inr_off: String,
    seles_price: String,
    image: String,
    fav: String,
})

const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart
