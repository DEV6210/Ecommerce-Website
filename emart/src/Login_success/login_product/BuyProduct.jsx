import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import BottomNavbar from "../login_components/BottomNavbar"
import TopNavbarAll_login from "../login_components/TopNavbarAll_login"
import './css/buyproduct.css'

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TopNavDesktop from "../login_components/topnav-desktop"
import { apiurl } from "../../services/api"
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const BuyProduct = () => {

    // validation alert
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };
    const vertical = 'top'
    const horizontal = 'right'

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    //loading..
    const [done, setDone] = useState(undefined)

    const navigate = useNavigate()
    const { id, uid } = useParams()
    // console.log(uid)
    // check params id 
    const [user, setUser] = useState('')
    const userid = user._id
    // user params -------------
    const match_userParams = async () => {
        const res = await fetch(`${apiurl}/login_userParams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid
            })
        })
        const login_user = await res.json();
        if (login_user !== 'error') {
            // console.log(login_user)
            setUser(login_user)

        } else {
            navigate(`/wrongparams/${uid}`)
        }
    }
    useEffect(() => {
        match_userParams()
    }, [])
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
            // console.log('worng params')
            navigate(`/wrongparams/${id}`)

        } else {
            setviewProduct(viewResult)
            setDone(true)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const { _id, image, name, desc, catagory, seles_price, inr_off, p_off_discount, original_price } = viewProduct;
    const pid = _id;



    // quantity
    const [count, setCount] = useState(1);
    const totalPrice = seles_price * count
    // console.log(totalPrice)

    const increment = () => {
        setCount((prev) => {
            // console.log(prev)
            if (prev === 10) {
                return prev = 10
            } else {
                return prev + 1
            }

        });
    }
    const decrement = () => {
        setCount((prev) => {
            // console.log(prev)
            if (prev === 1) {
                return prev = 1
            } else {
                return prev - 1
            }

        });
    }

    //payment..
    const [value, setValue] = React.useState('');


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // place order 

    const status = 'Processing'
    const placeOrder = async () => {
        //product details
        const { _id, image, name, desc, catagory, seles_price, inr_off, p_off_discount, original_price } = viewProduct;
        const pid = _id;

        //user details 
        const uid = user._id
        const uname = user.name
        const uimage = user.image
        const { address, email, phone } = user
        if (value === '') {
            handleClick()
            setAlert('warning')
            setMessage('Plese Select Payment Method')
        } else if (value === 'online') {
            setRunTimer(true)
            document.getElementById('buy').style.display = 'none'
            document.getElementById('conform-order').style.display = 'flex'
            document.getElementById('conform-order').style.justifyContent = 'center'
            document.getElementById('conform-order').style.alignItems = 'center'
            document.getElementById('conform-order').style.height = '100vh'

            const paymentSuccess = async () => {
                const buy = await fetch(`${apiurl}/buy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    ,
                    body: JSON.stringify({
                        pid, name, desc, catagory, seles_price, totalPrice, count, value, image, uid, uname, uimage, address, email, phone, status
                    })
                })
                const res = await buy.json()
                // console.log(res)
                if (res === 'success') {
                    navigate(`/ordersuccess/${pid}/${uid}`)
                }
            }

            setTimeout(() => {
                setRunTimer(false);
                paymentSuccess()
            }, 20000)






        } else {
            const buy = await fetch(`${apiurl}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify({
                    pid, name, desc, catagory, seles_price, totalPrice, count, value, image, uid, uname, uimage, address, email, phone, status
                })
            })
            const res = await buy.json()
            // console.log(res)
            if (res === 'success') {
                navigate(`/ordersuccess/${pid}/${uid}`)
            }
        }

    }


    //end time
    const [countDown, setCountDown] = React.useState(0);
    const [runTimer, setRunTimer] = React.useState(true);

    React.useEffect(() => {
        let timerId;

        if (runTimer) {
            setCountDown(60 * 5);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);

    React.useEffect(() => {
        if (countDown < 0 && runTimer) {
            console.log("expired");
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]);

    // const togglerTimer = () => setRunTimer((t) => !t);

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);


    //payCancel
    const payCancel = () => {
        setRunTimer(false)
        // document.getElementById('buy').style.display = 'block'
        document.getElementById('conform-order').style.display = 'none'
        document.getElementById('cancel-order').style.display = 'flex'
        document.getElementById('cancel-order').style.justifyContent = 'center'
        document.getElementById('cancel-order').style.alignItems = 'center'
        document.getElementById('cancel-order').style.height = '100vh'
        window.location.reload()
    }

    return (
        <>
            <div className="navdesktop">
                <TopNavDesktop uid={`${uid}`} search='none' />
            </div>
            <div className="navmobile">
                <TopNavbarAll_login link={`/viewproduct/${pid}/${uid}`} navtitle='Buy Now' />
            </div>


            <div className='picodeError'>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
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



            <div id="conform-order">
                <div className="onlinepay">
                    <div className="payrs">
                        Pay ₹{totalPrice}
                    </div>
                    <div className="timer">
                        {minutes}:{seconds}
                    </div>

                    <img src="/images/qrcode.jpg" alt='qrcode' className="qrcode" />

                    <p>Don't Press Back or Cancel</p>
                    <button onClick={payCancel} className="paycancel">Cancel</button>
                </div>
            </div>

            {/* cancel order  */}
            <div id="cancel-order">
                <div className="onlinepay payonline2">
                    <img src="/images/cancelorder.png" alt='payment cancel' className="cancelorder" />
                    <h3>Order Not Comform</h3>
                </div>

            </div>


            <div className="buyproduct" id='buy'>
                <div className="buy-1">
                    <div className="buy">
                        <div className="bdiv-1">
                            <img src={`${apiurl}/uploads/${image}`} alt="view" className="buyimage" />
                        </div>
                        <div class="card_body bdiv-2">
                            <b className='v_title'>{name}</b>
                            <p className="v_desc">{desc}</p>
                            <div className='v_inr'>
                                <span className='v_rs'>₹{seles_price} </span>
                                <span className='v_discount'>₹{inr_off} </span>
                            </div>
                            <b>{catagory}</b>
                            {/* <b className="v_b">Best Offer {p_off_discount}% off</b> */}
                        </div>
                    </div>
                    <div className="qty">
                        <label className="qty-2">
                            <button onClick={decrement} className='decriment'> <i class="fa-solid fa-minus"></i> </button>
                            <input value={count} type='text' name="quantity" className="quantity" />
                            <button onClick={increment} className='incriment'> <i class="fa-solid fa-plus"></i> </button>
                        </label>
                        <label className='totalprice'>Total: ₹{totalPrice} </label>
                    </div>
                    <div>
                        <FormControl
                            sx={{
                                mt: 2, mb: 2
                            }}
                        >
                            <FormLabel id="demo-controlled-radio-buttons-group">Payment Mode</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="online" control={
                                        <Radio sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 22,
                                            }
                                        }} />
                                    } label="Pay on Online"

                                />
                                <FormControlLabel
                                    value="ofline" control={
                                        <Radio sx={{
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 22,
                                            }
                                        }} />
                                    } label="Cash on Delivery"

                                />
                            </RadioGroup>
                        </FormControl>

                    </div>

                    <div>
                        <button onClick={placeOrder} className="btn-buy">Place Order</button>
                    </div>




                    <div className="dads">
                        <div className="address-title" >
                            <div><img src="/logo/location.svg" alt="location" /> Delivery Address</div>
                            {/* <NavLink className='editicon'> <i className="fa-solid fa-pen"></i></NavLink> */}
                        </div>
                        <div className="address_details">
                            <div className="a_detail">
                                {user.address}
                            </div>
                            <div className="a_detail">
                                <div>Phone: {user.phone}</div>
                                <div>Email: {user.email}</div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>

            <BottomNavbar uid={uid} />
        </>
    );
}

export default BuyProduct;