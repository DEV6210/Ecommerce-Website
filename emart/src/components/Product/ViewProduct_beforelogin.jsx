import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

//alert library
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Loading from '../../loading/loading';
import Footer from '../../components/Footer';
import Navbarall from '../NavbarAll';
import { BottomNav } from '../Navbar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { apiurl } from '../../services/api';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ViewProductBeforeLogin = () => {
    const navigate = useNavigate()


    //loading..
    const [done, setDone] = useState(undefined)


    // validation alert
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState('')
    const [open, setOpen] = React.useState(false);
    const [duration, setduration] = useState('6000')

    const handleClick = () => {
        setOpen(true);
    };
    const vertical = 'top'
    const horizontal = 'center'

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    const { id } = useParams()
    console.log(id)



    // display single product -------------
    const [viewProduct, setviewProduct] = useState([])
    const getProduct = async () => {
        const getResult = await fetch(`${apiurl}/viewProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify({
                id
            })
        })
        var viewResult = await getResult.json()
        // console.log(product)
        if (viewResult === 'error') {
            console.log('worng params')


        } else {
            setviewProduct(viewResult)
            setDone(true)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const { _id, image, name, desc, seles_price, inr_off, p_off_discount, original_price } = viewProduct;
    const pid = _id;




    //--------XXXXXXXXXXXXXXX----------
    // Add to cart insert into database
    const cart = async () => {
        handleClick()
        setAlert('warning')
        setMessage('Please Login Your Account')
        setduration('2000')
    }
    //removeCart
    const removeCart = async () => {
        handleClick()
        setAlert('warning')
        setMessage('Please Login Your Account')
        setduration('2000')
    }

    // buy product insert into database
    const buy = () => {
        handleClick()
        setAlert('warning')
        setMessage('Please Login Your Account')
        setduration('2000')

    }




    // pin code check 
    const [pincode, setPincode] = useState({
        pincode: ''
    })
    const pincodeInput = (e) => {
        console.log(e.target.value)
        setPincode({ ...pincode, [e.target.name]: e.target.value })
    }
    const checkPincode = () => {
        console.log(pincode.pincode)
        if (pincode.pincode === '') {
            handleClick()
            setAlert('warning')
            setMessage('Please Enter Pin Code')
        } else if (pincode.pincode !== '742135') {
            handleClick()
            setAlert('info')
            setMessage('Sorry we are unable to Delever Product in this area..')
        } else {
            handleClick()
            setAlert('success')
            setMessage('We are Able to Delever Product in this area')
            // document.getElementById('available').innerHTML = 'Available'
            // document.getElementById('available').style.color = 'green'
        }
    }

    // display product............
    const [product, setProduct] = useState([])

    const displayProduct = async () => {
        const getResult = await fetch(`${apiurl}/getProduct`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        var result = await getResult.json()
        // console.log(product)
        setProduct(result)
        setDone(true)
    }

    useEffect(() => {
        setTimeout(() => {
            displayProduct()
        })
    }, [])

    //reload page 
    const reloadSamePage = async () => {
        const getResult = await fetch(`${apiurl}/viewProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify({
                id
            })
        })
        var viewResult = await getResult.json()
        // console.log(product)
        if (viewResult === 'error') {
            // console.log('worng params')
            navigate(`/wrongparams/${id}`)

        } else {
            setviewProduct(viewResult)
            window.location.reload()

        }
    }

    const [value, setValue] = React.useState(0);

    // Search option............

    const [searchresult, setsearchresult] = useState([])
    const [searchitem, setsearch] = useState({
        search: ''
    })
    const searchinput = (e) => {
        setsearch({ ...searchitem, [e.target.name]: e.target.value })
    }

    const searchBtn = async () => {
        const { search } = searchitem
        const catagory = search
        // console.log(catagory)
        const getResult = await fetch(`${apiurl}/catagory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                catagory
            })
        })
        var result = await getResult.json()
        // console.log(result)
        setsearchresult(result)
    }
    // console.log(searchresult)
    useEffect(() => {
        searchBtn()
    })

    ////showopval
    useEffect(() => {
        if (searchitem.search !== '') {
            document.getElementById('searchvalue').style.display = 'block';
            document.getElementById('sa').style.backgroundColor = 'white'
            document.getElementById('sa').style.borderBottomRightRadius = '0px'
            document.getElementById('sa').style.borderBottomLeftRadius = '0px'
        } else {
            document.getElementById('searchvalue').style.display = 'none'
            document.getElementById('sa').style.backgroundColor = 'none'
            document.getElementById('sa').style.borderBottomRightRadius = '5px'
            document.getElementById('sa').style.borderBottomLeftRadius = '5px'
        }
        if (searchresult.length > 1) {
            document.getElementById('searchvalue').style.display = 'none'
            document.getElementById('sa').style.backgroundColor = 'none'
            document.getElementById('sa').style.borderBottomRightRadius = '5px'
            document.getElementById('sa').style.borderBottomLeftRadius = '5px'
        }
    })
    const [inpval, setinpval] = useState()
    // search value of option 
    const stv = (search) => {
        setsearch({ search: search })
        // console.log(search)      
    }

    const reloadproduct=(e)=>{
        console.log(e)
        navigate(e)
        window.location.reload()
    }



    return (
        <>
            <Navbarall link='/' navtitle='View Product' className='mobnav' />
            {/* TopNavbar */}
            <div className='desknav'>
                <div className="sticky-top" id="navbar">
                    <div className="nav container-navbar-scroll">

                        <ul>

                            <NavLink>
                                <img src="/applogo/applogo.png" height='50px' className="applogo" alt="" />
                            </NavLink>
                        </ul>
                        <ul className="ul_none" >

                        </ul>
                        <ul className="ul_none">

                        </ul>

                        <ul className="search_op1" >
                            <NavLink>
                                <form action="javascript:void(0);" method="post" className="search-area" id="sa" autocomplete="off">
                                    <input value={searchitem.search} onChange={searchinput} name='search' id="sa2" type="text" className="search-inp " placeholder="Search..." aria-label="First name" />
                                    <button onClick={searchBtn} className="search-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </form>

                            </NavLink>
                            <div id="searchvalue">
                                <NavLink onClick={() => { stv('mobiles') }} className="lis"><li className="svbtn">Mobiles and Tablets</li></NavLink>
                                <NavLink onClick={() => { stv('headphones') }} className="lis"><li className="svbtn">Headphones</li></NavLink>
                                <NavLink onClick={() => { stv('laptop') }} className="lis"><li className="svbtn">Laptops and Computers</li></NavLink>
                                <NavLink onClick={() => { stv('speakers') }} className="lis"><li className="svbtn">Sprakers</li></NavLink>
                                <NavLink onClick={() => { stv('watch') }} className="lis"><li className="svbtn">Watches</li></NavLink>
                                <NavLink onClick={() => { stv('cloths') }} className="lis"><li className="svbtn">Cloth's womens and mens cloths</li></NavLink>
                                <NavLink onClick={() => { stv('sunglasses') }} className="lis"><li className="svbtn">Sunglasses</li></NavLink>
                                <NavLink onClick={() => { stv('camera') }} className="lis"><li className="svbtn">Camera</li></NavLink>
                            </div>
                        </ul>
                        <ul className="nav_link_option">
                            <NavLink to={`/`} className='nav_link signup' >
                                <i class="fa-solid fa-house"></i>
                                <span className="nav_title">Home</span>
                            </NavLink>
                            <NavLink to={`/cart`} className='nav_link home'>
                                <i class="fa-solid fa-heart"></i>
                                <span className="nav_title">Wishlist</span>
                            </NavLink>
                            <NavLink to={`/signup`} className='nav_link login'>
                                <i class="fa-solid fa-user-plus"></i>
                                <span className="nav_title">Signup </span>
                            </NavLink>
                            <NavLink to={`/login`} className='nav_link home' >
                                <i class="fa-solid fa-user-lock"></i>
                                <span className="nav_title">Login </span>
                            </NavLink>



                        </ul>
                    </div>
                </div>
            </div>



            {
                searchresult.length > 0
                    ?
                    <div className="l_dashboard">
                        {/* product  */}
                        {/* <h3 className='head_title'>Buy Now</h3> */}

                        <div className='product-list row'>
                            <div className="pl-1 col-12 col-md-11 ">

                                {
                                    searchresult.map((item) => {
                                        const { _id, image, name, desc, seles_price, inr_off,original_price, p_off_discount } = item;
                                        const id = _id

                                        return (
                                            <>
                                                <div className='cartstyle'>
                                                    <NavLink onClick={()=>reloadproduct(`/viewproduct/${id}`)} className='card'>
                                                        {/* <NavLink id='hart'><i class="fa-regular fa-heart love"></i></NavLink> */}
                                                        <div className="imgsection">
                                                            <img src={`${apiurl}/uploads/${image}`} alt='product image' className='card-img-top' />
                                                        </div>
                                                        <div class="card_body">
                                                            <b className='p_title'>{name}</b>
                                                            <p>{desc}</p>
                                                            <div className='inr'>
                                                                <span className='rs'>₹{seles_price} </span>
                                                                <span className='discount'>₹{original_price}</span>
                                                            </div>
                                                            <b>Best Offer {p_off_discount}% off</b>
                                                        </div>
                                                    </NavLink>
                                                </div>
                                            </>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className="footer">
                            <Footer />
                        </div>
                    </div>
                    :
                    !done ?
                        <div>
                            <Loading />
                        </div>
                        :
                        <div>
                            <div className='picodeError'>
                                <Stack spacing={2} sx={{ width: '100%' }}>
                                    <Snackbar open={open} autoHideDuration={`${duration}`} onClose={handleClose}
                                        anchorOrigin={{ vertical, horizontal }}
                                        key={vertical + horizontal}
                                        className='muialert'
                                    >
                                        <Alert onClose={handleClose} severity={alert} sx={{ mt: 5, width: '100%' }} >
                                            {message}
                                        </Alert>
                                    </Snackbar>
                                </Stack>
                            </div>


                            <div id='viewarea'>
                                {/* single product  */}
                                <div className="singleProduct">
                                    <div className="singleProduct-row-1">
                                        <div className="singleProduct-sub-row">
                                            <div className="singleProduct-modal">
                                                <div className='rl1'>
                                                    <div className='imgcenter'>
                                                        <img src={`${apiurl}/uploads/${image}`} alt="view" className="singleImage" />
                                                    </div>
                                                    <div className="btn-group">
                                                        <button onClick={cart} className="btn-cart">Add To Cart</button>
                                                        <button onClick={buy} className="btn-buy" > BUY NOW </button>
                                                    </div>
                                                </div>
                                                {/* ----------- part 2 ----------- */}
                                                <div className="content-body">
                                                    <button onClick={removeCart} id='hert_link'>
                                                        <i id='fav' className="fa-regular fa-heart love"></i>
                                                    </button>

                                                    <div class="card_body">
                                                        <b className='v_title'>{name}</b>
                                                        <p className="v_desc">{desc}</p>
                                                        <div className='v_inr'>
                                                            <span className='v_rs'>₹{seles_price} </span>
                                                            <span className='v_discount'>₹{original_price} </span>
                                                        </div>
                                                        <b className="v_b">Best Offer {p_off_discount}% off</b>
                                                    </div>
                                                    <div>
                                                        <Box
                                                            sx={{
                                                                ml: 0.5
                                                            }}
                                                        >
                                                            <h6>Ratings</h6>
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={value}
                                                                onChange={(event, newValue) => {
                                                                    setValue(newValue);
                                                                }}
                                                            />
                                                        </Box>
                                                    </div>
                                                    <div className="offers">
                                                        <h6>Available offers</h6>
                                                        <p><i class="fa-sharp fa-solid fa-tag"></i> Buy this Product and Get Extra ₹500 Off on Bikes & ScootersT&</p>
                                                        <p><i class="fa-sharp fa-solid fa-tag"></i> Bank Offer10% off on ICICI Bank Credit Card EMI Transactions, up to ₹1250, on orders of ₹5,000 and aboveT</p>
                                                        <p><i class="fa-sharp fa-solid fa-tag"></i> Bank OfferFlat ₹100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account</p>
                                                        <p><i class="fa-sharp fa-solid fa-tag"></i> Partner OfferPurchase now & get a surprise cashback coupon till November 2023</p>
                                                        <img src="/logo/location.svg" alt="location" className='locationicon' /><h6 className="location"> Deliver to</h6>
                                                        <div className='checkpincode'>
                                                            <FormControl variant="standard" sx={{ m: 1, mt: 0, width: '25ch' }}>
                                                                <Input
                                                                    id="standard-adornment-weight"
                                                                    endAdornment={<button id='available' onClick={checkPincode}>Check</button>}
                                                                    aria-describedby="standard-weight-helper-text"
                                                                    placeholder='Enter Delivery Pincode'
                                                                    onChange={pincodeInput}
                                                                    name='pincode'

                                                                />
                                                            </FormControl>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* display product  */}
                                    <div className='product-list row'>
                                        <div className="pl-1 col-12 col-md-11 ">
                                            {
                                                product.map((item) => {
                                                    const { _id, image, name, desc, seles_price, inr_off,original_price, p_off_discount } = item;

                                                    return (
                                                        <>
                                                            <div className='cartstyle'>
                                                                <NavLink onClick={reloadSamePage} to={`/viewproduct/${_id}`} className='card'>
                                                                    {/* <NavLink id='hart'><i class="fa-regular fa-heart love"></i></NavLink> */}
                                                                    <div className="imgsection">
                                                                        <img src={`${apiurl}/uploads/${image}`} alt='product image' className='card-img-top' />
                                                                    </div>
                                                                    <div class="card_body">
                                                                        <b className='p_title'>{name}</b>
                                                                        <p>{desc}</p>
                                                                        <div className='inr'>
                                                                            <span className='rs'>₹{seles_price} </span>
                                                                            <span className='discount'>₹{original_price}</span>
                                                                        </div>
                                                                        <b>Best Offer {p_off_discount}% off</b>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <Footer />
                            </div>
                        </div>
            }
            <BottomNav />
        </>
    );
}

export default ViewProductBeforeLogin;