import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import TopNavDesktop from "./topnav-desktop";
import TopNavbarAll_login from "./TopNavbarAll_login";
import BottomNavbar from "../login_components/BottomNavbar";
import './css/orderhistory.css'
import { NavLink } from "react-router-dom";

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



const OrderHostiry = () => {
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



    const navigate = useNavigate()
    const { uid } = useParams()
    // console.log('contac page ', ' ' + uid)

    // check params id 
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


    const [history, setHistory] = useState([])
    // get order history 
    const orderhistor = async () => {
        const res = await fetch(`${apiurl}/orderhistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid
            })
        })
        const result = await res.json();
        // console.log(result)
        setHistory(result)
    }

    useEffect(() => {
        orderhistor()
    })

    //Status
    const [trackstatus, setTrackStatus] = useState([])
    const Status = async (bid) => {
        document.getElementById('wlshide').style.display = 'none'
        document.getElementById('stepers').style.display = 'flex'
        // console.log(bid)

        const res = await fetch(`${apiurl}/buyingstatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bid
            })
        })
        const result = await res.json();
        // console.log(result)
        setTrackStatus(result)
    }
    useEffect(() => {
        if (trackstatus.status === 'Processing') {
            document.getElementById('step-1').className = 'fa-solid fa-check'
            //
            document.getElementById('step-2').className = 'fa-solid fa-circle'
            document.getElementById('step-3').className = 'fa-solid fa-circle'
            //
            document.getElementById('remark').innerHTML = 'Product will be delivered within 7 days'
            document.getElementById('remark').style.color = 'black'

        } else if (trackstatus.status === 'Shifting') {
            document.getElementById('step-1').className = 'fa-solid fa-check'
            document.getElementById('step-2').className = 'fa-solid fa-check'
            //
            document.getElementById('step-3').className = 'fa-solid fa-circle'
            //
            document.getElementById('remark').innerHTML = 'Product will be delivered within 7 days'
            document.getElementById('remark').style.color = 'black'
        } else if (trackstatus.status === 'Delivered') {
            document.getElementById('step-1').className = 'fa-solid fa-check'
            document.getElementById('step-2').className = 'fa-solid fa-check'
            document.getElementById('step-3').className = 'fa-solid fa-check'
            //
            document.getElementById('remark').innerHTML = 'Product has been Successfully Delivered'
            document.getElementById('remark').style.color = 'green'

        } else if (trackstatus.status === 'Cancelled') {
            document.getElementById('step-1').className = 'fa-solid fa-check'
            document.getElementById('step-2').className = 'fa-solid fa-check'
            document.getElementById('step-3').className = 'fa-sharp fa-solid fa-xmark xxx'

            //
            document.getElementById('remark').innerHTML = 'Order Cancelled'
            document.getElementById('remark').style.color = 'red'
        }
        else {
            document.getElementById('step-1').className = 'fa-solid fa-circle'

        }
    })


    const StatusClose = () => {
        document.getElementById('stepers').style.display = 'none'
        document.getElementById('wlshide').style.display = 'block'
    }

    //order canceled....

    const cancelOrder = async (bid) => {
        // console.log('canceled')
        const res = await fetch(`${apiurl}/ordercancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bid
            })
        })
        const result = await res.json();
        // console.log(result)
        if (result === 'Cancelled') {
            handleClick()
            setAlert('info')
            setMessage('You have already cancelled order')
        } else if (result === 'Delivered') {
            handleClick()
            setAlert('warning')
            setMessage('You cannot cancel order because you are order already delivered')
        } else {
            handleClick()
            setAlert('warning')
            setMessage('You are order successfully cancelled')
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }


    }

    const reOrder = async (bid) => {
        const res = await fetch(`${apiurl}/reorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bid
            })
        })
        const result = await res.json();
        console.log(result)
        if (result === 'success') {
            handleClick()
            setAlert('success')
            setMessage('You are Order successfully Placed')

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }

    }





    return (
        <>
            <div className="navdesktop">
                <TopNavDesktop uid={`${uid}`} search='none' navcssValue='tpnav-3' />
            </div>
            <div className="navmobile">
                <TopNavbarAll_login link={`/myaccount/${uid}`} navtitle='Order History' />

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


            <div id='stepers'>
                <div className="steperbody">
                    {/* step-1 */}
                    <div className="st-icon-1">
                        <div className="text-center">
                            <i id="step-1" className="fa-solid fa-circle"></i>
                        </div>
                        <div className="stage1">Processing</div>
                    </div>
                    <hr className="hr1 border-3 opacity-100" />
                    {/* step-2 */}
                    <div className="st-icon-1">
                        <div className="text-center">
                            <i id="step-2" className="fa-solid fa-circle"></i>
                        </div>
                        <div className="stage1">Shifting</div>
                    </div>
                    <hr className="hr2 border-3 opacity-100" />
                    {/* step-3 */}
                    <div className="st-icon-1">
                        <div className="text-center">
                            <i id="step-3" className="fa-solid fa-circle"></i>
                        </div>
                        <div className="stage1">Delivered</div>
                    </div>
                    <NavLink onClick={StatusClose}><i className="fa-solid fa-xmark closestep"></i></NavLink>

                    <p id="remark" className="devd">Product will be delivered within 7 days</p>
                </div>
            </div>



            <div className="wslist">
                <div className="wishlist" id="wlshide">
                    {
                        history.length > 0 ?
                            history.map((p) => {
                                return (
                                    <>
                                        <div className="cartBody">
                                            <div className="towDiv">
                                                <div className="imageDiv">
                                                    <img src={`${apiurl}/uploads/${p.pimage}`} alt="favimg" className="pimage" />
                                                </div>
                                                <div className="textDiv">
                                                    <b className='p_title'>{p.pname}</b>
                                                    <p>{p.desc}</p>
                                                    <div className='inr'>
                                                        <span className='rs'>Quantiy: {p.qty} </span>

                                                    </div>
                                                    <b>Price: ₹{p.totalprice}</b>
                                                </div>
                                            </div>
                                            <div className="btn-can">
                                                {p.status === 'Cancelled' ?
                                                    <div><button onClick={() => { reOrder(`${p._id}`) }} className="btn-reorder">Reorder</button></div>
                                                    :
                                                    <div>{
                                                        p.status === 'Delivered' ? ' '
                                                            :
                                                            <button onClick={() => { cancelOrder(`${p._id}`) }} className="btn-ordercancel">Cancel</button>
                                                    }

                                                    </div>
                                                }
                                                <NavLink onClick={() => { Status(`${p._id}`) }}>{p.status}</NavLink>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :
                            <div className="orderhist-title">
                                <div>
                                    <b>History Not Found !</b>

                                </div>
                            </div>
                    }
                </div>
            </div>

            <BottomNavbar uid={uid} />
        </>
    );
}

export default OrderHostiry;