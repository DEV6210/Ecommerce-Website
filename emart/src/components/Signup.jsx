import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './css/signup.css'
import Navbarall from "./NavbarAll";
import { useNavigate } from 'react-router-dom';
import { BottomNav } from './Navbar';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
import { apiurl } from '../services/api';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {

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




    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const defaultUserdata = {
        name: '',
        email: '',
        phone: '',
        password: '',
        conform: '',
        address: '',
        image: 'users_image.png'

    }

    const [user, setUser] = useState(defaultUserdata);

    const InputData = (e) => {
        // console.log(e.target.name, e.target.value)
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    const submitData = async () => {

        // input validation
        // || !user.email || !user.phone || !user.password || !user.conform)
        if (!user.name) {
            handleClick()
            setAlert('info')
            setMessage('Enter Your Full Name')
        }
        else if (!user.email) {
            handleClick()
            setAlert('info')
            setMessage('Enter Your Email ID')
        }
        else if (!user.phone) {
            handleClick()
            setAlert('info')
            setMessage('Enter Your Phone NUmber')
        }
        else if (!user.password) {
            handleClick()
            setAlert('info')
            setMessage('Enter Password');
        }
        else if (!user.conform) {
            handleClick()
            setAlert('info')
            setMessage('Enter Conform Password')
        } else {

            if (user.password === user.conform) {
                if (document.getElementById('spinner2').style.display === 'none') {
                    document.getElementById('spinner2').style.display = 'block';
                    document.getElementById('spinner2').style.float = 'left';
                    document.getElementById('spinner2').style.margin = '5px 5px 0px 0px';


                    //insert data into database...
                    const { name, email, phone, password, conform, address, image } = user;

                    const res = await fetch(`${apiurl}/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name, email, phone, password, conform, address, image
                        })
                    })
                    // const result= await res.text();
                    const result = await res.json();
                    console.log(result)
                    if (result === 'email_match') {
                        handleClick()
                        setAlert('warning')
                        setMessage('Email ID Already Registered')
                        document.getElementById('spinner2').style.display = 'none'
                    }
                    else {
                        //navigate another page 
                        navigate('/SuccessfullyCreatedAccount')
                    }


                } else {
                    // alert('please wait account is creating')
                    document.getElementById('spinner2').style.display = 'none'
                }
            } else {
                handleClick()
                setAlert('warning')
                setMessage('Conform Password Not Match')
            }

        }
    }








    return (

        <>
            {/* Nav Bar */}

            <Navbarall link='/login' navtitle='SignUp' navcssValue='tpnav-4' />

            <div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                        anchorOrigin={{ vertical, horizontal }}
                        key={vertical + horizontal}
                        className='alert'
                    >
                        <Alert onClose={handleClose} severity={alert} sx={{ mt: 3, width: '100%' }} >
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </div>

            <div className='signuproot'>
                <form method='POST' className='signupform' id='signupform' >
                    <div className='signintitle '>
                        Hey, Create Your Emart Account
                        <hr />
                    </div>
                    <div className='field'>
                        <i className="fa-solid fa-user log_i"></i><label className='labels'>Full Name</label><br />
                        <input type='text' value={user.name} onChange={InputData} name='name' autoComplete='disabled' className='col-12 input_field inputs' placeholder="Enter Your Full Name" />
                    </div>
                    <div className='field'>
                        <i className="fa-solid fa-envelope log_i"></i><label className='labels'>Email ID</label><br />
                        <input type='email' value={user.email} onChange={InputData} name='email' className='col-12 input_field inputs' placeholder="Enter Email Id" />
                    </div>
                    <div className='field'>
                        <i className="fa-solid fa-phone log_i"></i><label className='labels'>Phone Number</label><br />
                        <input type='text' value={user.phone} onChange={InputData} name='phone' className='col-12 input_field inputs' placeholder="Enter Phone Number" />
                    </div>
                    <div className='field'>
                        <i className="fa-solid fa-lock log_i"></i><label className='labels'>Password</label><br />
                        <input type='text' value={user.password} onChange={InputData} name='password' className='col-12 input_field inputs' placeholder="Enter Password" />
                    </div>
                    <div className='field'>
                        <i className="fa-solid fa-key log_i"></i><label className='labels'>Conform Password</label><br />
                        <input type='password' value={user.conform} onChange={InputData} name='conform' className='col-12 input_field inputs' placeholder="Re-Enter Password" />
                    </div>

                    <div>
                        <button className="btn-s3" type="button" onClick={submitData}>
                            <span className="spinner-border spinner-border-sm" id='spinner2' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                            Signup
                        </button>
                        <NavLink className="navlogin" to={'/login'} >
                            <span class="spinner-border spinner-border-sm" id='spinner' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                            <abbr id='login_title'>Login</abbr>
                        </NavLink>
                    </div>
                </form>
            </div>

            <BottomNav cssvalue='buttontap-5' />

        </>
    )
}
export default Signup;