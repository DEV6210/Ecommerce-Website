import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import './css/profile.css'
import TopNavDesktop from "./topnav-desktop";

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

const Profile = () => {

    // validation alert
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState('')
    const [open, setOpen] = React.useState(false);


    const handleClick = () => {
        setOpen(true);
    };
    const vertical = 'bottom'
    const horizontal = 'left'

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const navigate = useNavigate()

    const { uid } = useParams()

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


    // ----------------------------------------------------------------
    const showButton = () => {
        document.getElementById('u_logout').style.display = 'initial';
        document.getElementById('ul_out').style.display = 'none'
    }
    const hideButton = () => {
        document.getElementById('u_logout').style.display = 'none';
        document.getElementById('ul_out').style.display = 'initial'
    }
    const logoutBouuton = () => {
        navigate(`/login`)
    }
    //edit name or  photo
    const [newName, setNewName] = useState({
        name: ''
    })

    const chname = (e) => {
        // console.log(e.target.name, e.target.value)
        setNewName({ ...newName, [e.target.name]: e.target.value })
    }
    const editNP = () => {
        document.getElementById('updataname').style.display = 'flex'
        document.getElementById('address').style.display = 'none'
    }
    const updatename = async () => {
        const { name } = newName
        if (!name) {
            handleClick()
            setAlert('warning')
            setMessage('Enter Your New Name')
        } else {
            const res = await fetch(`${apiurl}/changename`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid, name
                })
            })
            const chn = await res.json()
            // console.log(chn)
            handleClick()
            setAlert('success')
            setMessage('Successfully Updated Your Name')

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }

    }
    // updateAddress
    const updateAddress = () => {
        document.getElementById('updataname').style.display = 'none'
        document.getElementById('address').style.display = 'block'
    }
    // cancelupdateAddress
    const cancelupdateAddress = () => {
        document.getElementById('address').style.display = 'none'
    }
    //nupcancel
    const nupcancel = () => {
        document.getElementById('updataname').style.display = 'none'

    }
    ///addinp
    const [address, setaddress] = useState({
        vill: '',
        po: '',
        ps: '',
        dist: '',
        pin: '',
        state: '',
    })
    const addinp = (e) => {
        // console.log(e.target.name, e.target.value)
        setaddress({ ...address, [e.target.name]: e.target.value })
    }
    const submitAddress = async () => {
        const { vill, po, ps, dist, pin, state } = address
        const ads = vill + ', ' + po + ', ' + ps + ', ' + dist + ', ' + pin + ', ' + state
        if (vill === '' || po === '' || ps === '' || dist === '' || pin === '' || state === '') {
            handleClick()
            setAlert('warning')
            setMessage('All Field is required')
        } else {
            const res = await fetch(`${apiurl}/updateaddress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid, ads
                })
            })
            const chn = await res.json()
            // console.log(chn)
            handleClick()
            setAlert('success')
            setMessage('Address Successfully Updated')

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }
    }
    //update user image
    const [image, setimage] = useState({
        uid: uid,
        img: ''
    })
    const fileData = (e) => {
        setimage({ ...image, img: e.target.files[0] })
    }
    const updateimage = async () => {
        const formdata = new FormData()
        formdata.append('img', image.img, image.img.name)
        formdata.append('uid', image.uid)
        const res = await fetch(`${apiurl}/changeimage`, {
            method: 'POST',
            body: formdata
        });
    }
    if (image.img === '') {
        console.log('noooo')
    } else {
        updateimage()
        setTimeout(() => {
            window.location.reload()
        })
    }





    return (
        <>
            <div className="navdesktop">
                <TopNavDesktop uid={`${uid}`} search='none' navcssValue='tpnav-4' />
            </div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                    anchorOrigin={{ vertical, horizontal }}
                    key={vertical + horizontal}
                // className='muialert odpg'
                >
                    <Alert onClose={handleClose} severity={alert} sx={{ mt: 5, width: '100%' }} >
                        {message}
                    </Alert>
                </Snackbar>
            </Stack>
            

            <div id="updataname" >
                <input onChange={chname} name='name' className="nup-inp" type='text' placeholder={`${user.name}`} />
                <button onClick={updatename} className="upnbtn">Update</button>
                <NavLink onClick={nupcancel} className='closenameupdate'> <i className="fa-solid fa-xmark"></i></NavLink>
            </div>
            <div id="address">
                <p className="adchtitile">Update Address</p>
                <div className="from-control">
                    <label>Village</label>
                    <input onChange={addinp} name='vill' className="form-control adinp" type='text' placeholder='Enter Your Village' />
                    <label>Post Office</label>
                    <input onChange={addinp} name='po' className="form-control adinp" type='text' placeholder='Enter Your Police Station' />
                    <label>Police Station</label>
                    <input onChange={addinp} name='ps' className="form-control adinp" type='text' placeholder='Enter Your Police Station' />
                    <label>District</label>
                    <input onChange={addinp} name='dist' className="form-control adinp" type='text' placeholder='Enter Your District' />
                    <label>Pincode</label>
                    <input onChange={addinp} name='pin' className="form-control adinp" type='text' placeholder='Enter Your Pincode' />
                    <label>State</label>
                    <input onChange={addinp} name='state' className="form-control adinp" type='text' placeholder='Enter Your State' />
                    <div className="adupbtngrp">
                        <button onClick={cancelupdateAddress} className="upnbtn upnbtn1">Cancel</button>
                        <button onClick={submitAddress} className="upnbtn upnbtn2">Update</button>
                    </div>
                </div>
            </div>

            <div className="profilebody" id="pfbody">
                <div className="profilebody1">
                    {/* ---------- logout ---------- */}
                    <div id="u_logout">
                        <div className="conform">
                            <button onClick={hideButton} className='conform1'>
                                <i class="fa-solid fa-xmark"></i> Cancel
                            </button>
                            <button onClick={logoutBouuton} className='conform2'>
                                <i className="fa-solid fa-right-from-bracket"></i> Logout
                            </button>
                        </div>
                    </div>

                    {/* --------- Profile ---------- */}
                    <div className="profile">
                        <button onClick={showButton} className="threeline">
                            <div class="one"></div>
                            <div class="two"></div>
                            <div class="three"></div>
                        </button>
                        <div className="profile_row_1">
                            <div className="profile_body">

                                <input type="file" id="suimg" className="form-control" onChange={fileData} name='img' hidden />

                                <label for="suimg" className="image_area container" >
                                    <img src={`${apiurl}/users_image/${user.image}`} for='suimg' alt="use photo" className="userphoto" />
                                    <div class="middle">
                                        <div class="text userphoto">Change</div>
                                    </div>
                                </label>
                                <h4 className="username">{user.name}
                                    <NavLink className='editicon' onClick={editNP}> <i className="fa-solid fa-pen"></i></NavLink>
                                </h4>
                                <p className="useremail">{user.email}</p>
                                <div className="divs1">
                                    <NavLink to={`/orderhistory/${uid}`} className='box1 odbtn'>
                                        <i class="fa-solid fa-cart-shopping"></i> <span className="box_title"> Orders</span>
                                    </NavLink>
                                    <NavLink to={`/wishlist/${uid}`} className='box1 wishbtn'>
                                        <i class="fa-solid fa-heart"></i> <span className="box_title "> Wishlist</span>
                                    </NavLink>
                                </div>

                                <div className="divs">
                                    <div className="address-title" >
                                        <div><i class="fa-solid fa-circle-info"></i> Personal Details</div>
                                        {/* <NavLink className='editicon'> <i className="fa-solid fa-pen"></i></NavLink> */}
                                    </div>
                                    <div className="address_details">
                                        <div className="a_detail">
                                            <div>Name: {user.name}</div>
                                            <div>Phone: {user.phone}</div>
                                            <div>Email: {user.email}</div>
                                        </div>
                                    </div>

                                </div>

                                <div className="divs">
                                    <div className="address-title" >
                                        <div><img src="/logo/location.svg" alt="location" /> Delivery Address</div>
                                        <NavLink onClick={updateAddress} className='editicon'> <i className="fa-solid fa-pen"></i></NavLink>
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
                                <div className="divs">
                                    <a href="tel:9382370394"><i class="fa-solid fa-headphones"></i> Help Center</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;