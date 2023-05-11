const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const address = require('address')
const os = require('os')

// product image upload
//multer storage...........
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


// user image 
//multer storage...........
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'users_image')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})
const upload2 = multer({ storage: storage2 })

require('./db/conn')
// model....
let User = require('./db/userSchema')
let Product = require('./db/productSchema')
let Admin = require('./db/adminSchema')
let Cart = require('./db/cartSchema')
let Buy = require('./db/buyScheme')
const Device = require('./db/testingSchema')


const port = 8000
const app = express()

app.use(cors())
app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use('/users_image', express.static('users_image'))





//root 
app.get('/', (req, res) => {
    res.send('emart server is running...')
})


app.get('/testingByAmit', (req, res) => {

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log({ ipAddress })
    const username = os.userInfo();
    console.log(username)

    var details = ''
    address((err, addrs) => {
        console.log('IPV4:', addrs.ip, 'IPV6:', addrs.ipv6, 'MAC', addrs.mac);
        details = {
            ipv4: addrs.ip,
            ipv6: addrs.ipv6,
            mac: addrs.mac,
            username: username
        }
        // '192.168.0.2', 'fe80::7aca:39ff:feb0:e67d', '78:ca:39:b0:e6:7d'
    });
    const data = new Device()
    data.device = details
    data.save()
    res.send('Your details stored our database , Thanks for visit!')
})

//-------------------------------------- START ------------------------------------------
//register user data
app.post('/register', async (req, res) => {

    const already_exist_email = await User.findOne({ email: req.body.email })
    if (already_exist_email) {
        res.json('email_match')
    } else {
        let user = new User()
        user.name = req.body.name
        user.phone = req.body.phone
        user.email = req.body.email
        user.password = req.body.password
        user.conform = req.body.conform
        user.address = req.body.address
        user.image = req.body.image
        user.save()

        // console.log(req.body)
        // res.json(req.body)
        res.json('data received')
    }
})
//---------------------------------------------------------------------------------------
// login user 
app.post('/login', async (req, res) => {
    try {
        const luser = await User.findOne({ email: req.body.uid, password: req.body.upass })
        // console.log(admin)
        res.json(luser)
    } catch (error) {
        res.json('error')
    }
})

app.post('/login_userParams', async (req, res) => {
    try {
        const u_param = await User.findById({ _id: req.body.uid })
        res.json(u_param)
    } catch (error) {
        res.json('error')
    }
})



//---------------------------------------------------------------------------------------
//uploadproduct
app.post('/uploadproduct', upload.single('pimage'), async (req, res) => {
    // console.log(req.body)
    // console.log(req.file.filename)
    const image = await Product.findOne({ image: req.file.filename })
    if (image) {
        // console.log('exist')
        res.json('image_already_exist')
    } else {
        let product = new Product()
        product.name = req.body.pname;
        product.desc = req.body.pdesc;
        product.catagory = req.body.catagory;
        product.original_price = req.body.pprice;
        product.p_off_discount = req.body.pdiscount;
        product.inr_off = req.body.inr_off;
        product.seles_price = req.body.seles_price;
        product.image = req.file.filename;
        product.save()
        res.json('success')
    }
})
//---------------------------------------------------------------------------------------
//display product...
app.get('/getProduct', async (req, res) => {
    try {
        const productDetails = await Product.find()
        res.json(productDetails)

    } catch (error) {
        res.status(422).json(error)
    }
})

//view single product...
app.post('/viewProduct', async (req, res) => {
    // console.log(req.body.id)
    try {
        const viewProduct = await Product.findById({ _id: req.body.id })
        res.json(viewProduct)
    } catch (error) {
        res.json('error')
    }
})

// /catagory
app.post('/catagory', async (req, res) => {
    // console.log(req.body)
    try {
        const catagory = await Product.find({ catagory: req.body.catagory })
        res.json(catagory)
    } catch (error) {
        res.json('error')
    }
})







//---------------------------------------------------------------------------------------
// admin login
app.post('/admin', async (req, res) => {
    try {
        const admin = await Admin.findOne({ sid: req.body.id, pass: req.body.pass })
        // console.log(admin)
        res.json(admin)
    } catch (error) {
        res.json('error')
    }

})
// admin_matchparams
app.post('/admin_matchparams', async (req, res) => {
    try {
        const pid = await Admin.findById({ _id: req.body.id })
        res.json(pid._id)
    } catch (error) {
        res.json('error')
    }
})

//add to cart
app.post('/addcart', async (req, res) => {
    // console.log(req.body)
    try {
        if (await Cart.findOne({ product_id: req.body.pid, user_id: req.body.uid })) {
            res.json('already-add-to-cart')
        }
        else {
            let cart = new Cart()
            cart.user_id = req.body.uid
            cart.product_id = req.body.pid
            cart.name = req.body.name
            cart.desc = req.body.desc
            cart.catagory = req.body.catagory
            cart.original_price = req.body.original_price
            cart.p_off_discount = req.body.p_off_discount
            cart.inr_off = req.body.inr_off
            cart.seles_price = req.body.seles_price
            cart.image = req.body.image
            cart.fav = req.body.fav
            cart.save()
            res.json('Added')
        }

    } catch (error) {
        console.log('add cart error')

    }
})

// cart data 
app.post('/favdata', async (req, res) => {
    // console.log(req.body)
    try {
        const favdata = await Cart.findOne({ product_id: req.body.pid })
        res.json(favdata)
    } catch (error) {
        console.log('fav data error')
    }

})
app.post('/removecart', async (req, res) => {
    // console.log(req.body)
    if (await Cart.deleteOne({ product_id: req.body.pid })) {
        res.json('remove-to-cart')
    }

})


// wishlist 
app.post('/favdata_uid', async (req, res) => {
    // console.log(req.body)
    try {
        const favdata = await Cart.find({ user_id: req.body.uid })
        res.json(favdata)
    } catch (error) {
        console.log('fav data error')
    }

})


//----------------------------------  Buy Product Api  -----------------------------------

app.post('/buy', async (req, res) => {
    // console.log(req.body)
    let buy = new Buy()
    buy.uid = req.body.uid
    buy.uname = req.body.uname
    buy.email = req.body.email
    buy.phone = req.body.phone
    buy.address = req.body.address
    buy.uimage = req.body.uimage

    buy.pid = req.body.pid
    buy.pname = req.body.name
    buy.desc = req.body.desc
    buy.catagory = req.body.catagory
    buy.price = req.body.seles_price
    buy.qty = req.body.count
    buy.totalprice = req.body.totalPrice
    buy.payment = req.body.value
    buy.status = req.body.status
    buy.pimage = req.body.image

    buy.save()
    res.json('success')
})



//order history
app.post('/orderhistory', async (req, res) => {
    // console.log(req.body)    
    try {
        const history = await Buy.find({ uid: req.body.uid })
        // consol.log(history)
        res.json(history)

    } catch (error) {
        res.json('error')
    }

})


// buyingstatus
app.post('/buyingstatus', async (req, res) => {
    // console.log(req.body)
    const bid = await Buy.findOne({ _id: req.body.bid })
    res.json(bid)
})


app.post('/ordercancel', async (req, res) => {
    // console.log(req.body)
    try {
        const bid = await Buy.findOne({ _id: req.body.bid })
        if (bid.status === 'Cancelled') {
            res.json('Cancelled')

        } else if (bid.status === 'Delivered') {
            res.json('Delivered')
        } else {
            if (await Buy.updateOne({ _id: req.body.bid }, { $set: { status: 'Cancelled' } })) {
                res.json('success')
            }
        }

    } catch (error) {

    }

})
app.post('/reorder', async (req, res) => {
    const bid = await Buy.findOne({ _id: req.body.bid })
    if (bid.status !== 'Processing') {
        await Buy.updateOne({ _id: req.body.bid }, { $set: { status: 'Processing' } })
        res.json('success')
    }
})

// /updatename of the user
app.post('/changename', async (req, res) => {
    // console.log(req.body)
    try {
        await User.updateOne({ _id: req.body.uid }, { $set: { name: req.body.name } })
        res.json('name updated')
    } catch (error) {
        console.log('name update error')

    }

})
//address update
app.post('/updateaddress', async (req, res) => {
    // console.log(req.body)
    try {
        await User.updateOne({ _id: req.body.uid }, { $set: { address: req.body.ads } })
        await Buy.updateMany({ uid: req.body.uid }, { $set: { address: req.body.ads } })
        res.json('address updated')
    } catch (error) {
        console.log('address update error')

    }

})

//update photo...


app.post('/changeimage', upload2.single('img'), async (req, res) => {
    try {
        await User.updateOne({ _id: req.body.uid }, { $set: { image: req.file.filename } })
        await Buy.updateMany({ uid: req.body.uid }, { $set: { uimage: req.file.filename } })
        // console.log(req.body)
        // console.log(req.file.filename)
    } catch (error) {
        console.log('image change error')

    }
})

// // /changecatagory
// app.post('/changecatagory',async(req,res)=>{
//     await Product.updateMany({catagory:req.body.catagory},{$set:{catagory:req.body.setcat}})
//     res.json('success')
// })




// updateproduct
app.post('/updateproduct', async (req, res) => {
    try {
        // console.log(req.body)
        var cost = req.body.pprice
        var discount = req.body.pdiscount

        var off = discount / 100
        var inr_off = Math.round(cost * off)
        var seles_off = Math.round(cost - inr_off)

        if (await Product.findById({ _id: req.body.id })) {
            await Product.updateOne({ _id: req.body.id }, {
                $set: {
                    name: req.body.pname,
                    desc: req.body.pdesc,
                    catagory: req.body.catagory,
                    original_price: req.body.pprice,
                    p_off_discount: req.body.pdiscount,
                    inr_off: inr_off,
                    seles_price: seles_off,
                }
            })
            res.json('update success')
        }
    } catch (error) {
        console.log('product details update erroe')
    }
})


app.post('/deleteproduct', async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.body.id })
        res.json('delete success')
    } catch (error) {
        console.log('product delete error')
    }
})

app.post('/getuser', async (req, res) => {
    const user = await User.find()
    res.json(user)
})

app.post('/suspend', async (req, res) => {
    // console.log(req.body)
    try {
        if (await User.deleteOne({ _id: req.body.id })) {
            res.json('success')
        }


    } catch (error) {
        console.log('user suspend error')

    }
})

app.post('/orders', async (req, res) => {
    try {
        const orders = await Buy.find()
        res.json(orders)
    } catch (error) {
        console.log('orderhistory error')
    }
})

app.post('/deleteorderitem', async (req, res) => {
    try {
        if (await Buy.deleteOne({ _id: req.body.id })) {
            res.json('success')
        }

    } catch (error) {
        console.log('delete order item error')
    }
})

app.post('/updatestatus', async (req, res) => {
    try {
        if (await Buy.updateOne({ _id: req.body.id }, { $set: { status: req.body.status } })) {
            res.json('success')
        }
    } catch (error) {
        console.log('status update error')
    }
})

app.post('/admindetails', async (req, res) => {
    const admin = await Admin.find({ _id: req.body.id })
    res.send(admin)
})












//---------------------------------------- END -------------------------------------------

app.listen(port, () => {
    console.log(`server started port no. http://localhost:${port}`)
})