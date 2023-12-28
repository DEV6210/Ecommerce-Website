import { NavLink, useNavigate } from "react-router-dom";
import './css/login.css'
import Navbarall from "./NavbarAll";
import { BottomNav } from "./Navbar";
import { useState } from "react";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from "react";
import { apiurl } from "../services/api";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {

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






    const navigate = useNavigate();

    const [loginuser, setLoginData] = useState({
        uid: '',
        upass: '',
    })
    const inputData = (e) => {
        setLoginData({ ...loginuser, [e.target.name]: e.target.value })
        console.log(loginuser)
    }

    const loginButton = async () => {

        if (!loginuser.uid) {
            handleClick()
            setAlert('info')
            setMessage('Please Enter User ID')
        } else if (!loginuser.upass) {
            handleClick()
            setAlert('info')
            setMessage('Enter Your Correct Password')
        } else {

            if (document.getElementById('spinner').style.display === 'none') {
                document.getElementById('spinner').style.display = 'block';
                document.getElementById('spinner').style.float = 'left';
                document.getElementById('spinner').style.margin = '5px 5px 0px 0px';
                document.getElementById('login_title').innerHTML = 'Login';
            }
            //user data
            const { uid, upass } = loginuser;

            const res = await fetch(`${apiurl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid, upass
                })
            })
            const result = await res.json();
            if (result) {
                // console.log(result)
                //navigate another page 
                navigate(`/dashboard/${result._id}`);
            } else {
                // alert('User Id and Password not match')
                handleClick()
                setAlert('error')
                setMessage('Wrong User ID and Password')
                document.getElementById('spinner').style.display = 'none'
            }


        }

    }

    return (
        <>
            <div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                        anchorOrigin={{ vertical, horizontal }}
                        key={vertical + horizontal}
                        className='alert login-page-alert'
                    >
                        <Alert onClose={handleClose} severity={alert} sx={{ mt: 3, width: '100%' }} >
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </div>



            {/* Nav Bar  */}

            <Navbarall link='/' navtitle='Login' navcssValue='tpnav-3' />



            <div className='Login_Signup'>
                <form className='login_form' id='loginForm'>
                    <div className='signintitle2 '>
                        <img src="/favicon/icon.ico" alt="logo" className="loginglogo" />
                        Hey there, Welcome...
                        <hr />
                    </div>
                    <div className='field'>
                        <i class="fa-solid fa-user log_i"></i><label className="labelX"> Enter You'r Email ID</label><br />
                        <input type='text' onChange={inputData} name='uid' autoComplete='disabled' className='col-12 input_field inputx' placeholder="Entre Email Id" />
                    </div>
                    <div className='field'>
                        <i class="fa-solid fa-key log_i"></i><label className="labelX"> Enter Your Password</label><br />
                        <input type='password' onChange={inputData} name='upass' className='col-12 input_field inputx' placeholder="Entre Password" />
                    </div>

                    <div>
                        <button className="btn-2" type="button" onClick={loginButton}>
                            <span className="spinner-border spinner-border-sm" id='spinner' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                            <abbr id='login_title'>Login</abbr>
                        </button>
                        <NavLink className="btn-s2" to={'/signup'} >
                            <span class="spinner-border spinner-border-sm" id='spinner' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                            <abbr id='login_title'>SignUp</abbr>
                        </NavLink>

                    </div>


                    {/* <div className='already_have_ac'>
                     <NavLink to={'/signup'}>Create Account?</NavLink>
                    </div> */}
                </form>
            </div>

            <BottomNav cssvalue='buttontap-5' />



        </>
    )
}
export default Login;