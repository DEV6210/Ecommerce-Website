import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BottomNavbar from "./BottomNavbar";
import TopNavbarAll_login from "./TopNavbarAll_login";
import './css/wishlist.css'
import TopNavDesktop from "../login_components/topnav-desktop";
import Lottie from "lottie-react";
import groovyWalkAnimation from '../../components/json_image/empty-sad-shopping-bag.json'
//alert library
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { apiurl } from "../../services/api";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Wishlist = () => {
    // validation alert
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState('')
    const [open, setOpen] = React.useState(false);
    const [duration, setduration] = useState('6000')

    const handleClick = () => {
        setOpen(true);
    };
    const vertical = 'bottom'
    const horizontal = 'right'

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    const { uid } = useParams()
    // console.log('cart page uid', ' ' + uid)
    const navigate = useNavigate()

    // match params 
    const [user, setUser] = useState('')
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

    // console.log(luid)
    const [product, setproduct] = useState([])



    //fetch cart data
    const favData = async () => {
        const cartresult = await fetch(`${apiurl}/favdata_uid`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid
            })
        })
        const res = await cartresult.json()
        // console.log(res)  
        setproduct(res)
    }
    useEffect(() => {
        favData()
    })

    //remove cart data
    const removeCart = async (pid) => {
        console.log(pid)
        const cartresult = await fetch(`${apiurl}/removecart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pid
            })
        })
        const rmv = await cartresult.json()
        // console.log(rmv)
        if (rmv === 'remove-to-cart') {
            handleClick()
            setAlert('success')
            setMessage('Item Removed From Wishlist')
        }
    }
    //buy now
    const buynow = (pid) => {
        navigate(`/buyproduct/${pid}/${uid}`)
    }




    return (
        <>
            <div className="navdesktop">
                <TopNavDesktop uid={`${uid}`} search='none' navcssValue='tpnav-2' />
            </div>
            <div className="navmobile">
                <TopNavbarAll_login link={`/dashboard/${user._id}`} navtitle='My Cart' />
            </div>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={`${duration}`} onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                // className='muialert odpg'
                >
                    <Alert onClose={handleClose} severity={alert} sx={{ mt: 5, width: '100%' }} >
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>


            <div className="wslist">
                <div className="wishlist">
                    {

                        product.length > 0 ?
                            product.map((p) => {
                                return (
                                    <>
                                        <div className="cartBody">
                                            <div className="towDiv">
                                                <div className="imageDiv">
                                                    <img src={`${apiurl}/uploads/${p.image}`} alt="favimg" className="pimage" />
                                                </div>
                                                <div className="textDiv">
                                                    <b className='p_title'>{p.name}</b>
                                                    <p>{p.desc}</p>
                                                    <div className='inr'>
                                                        <span className='rs'>₹{p.seles_price} </span>
                                                        <span className='discount'>₹{p.inr_off}</span>
                                                    </div>
                                                    <b>Best Offer {p.p_off_discount}% off</b>
                                                </div>
                                            </div>
                                            <div className="btn-fav">
                                                <button onClick={() => { removeCart(`${p.product_id}`) }} className="btn-f1">Remove</button>
                                                <button onClick={() => { buynow(`${p.product_id}`) }} className="btn-f2"> BUY NOW </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :
                            <div className='emptycard-lottie-body'>
                                <Lottie animationData={groovyWalkAnimation} loop={true} className='emptycard-lottie'/>
                                <p className="emptytitle">Your Card is Empty !</p>
                            </div>
                    }
                </div>
            </div>
            <BottomNavbar cssvalue='buttontap-4' uid={uid} />
        </>
    );
}

export default Wishlist;