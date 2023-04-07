import './css/admin_login.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import StoreIcon from '@mui/icons-material/Store';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router';
import { apiurl } from '../services/api';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function InputAdornments() {
    // validation alert
    const [message, setMessage] = React.useState('')
    const [alert, setAlert] = React.useState('')
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


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // form data.......
    const navigate = useNavigate()



    const [data, setData] = React.useState({
        sid: '',
        pass: '',
    })
    const onInput = (e) => {
        // console.log(e.target.name,e.target.value)
        setData({ ...data, [e.target.name]: e.target.value })
        // console.log(data)
    }

    const adminLogin = async () => {

        const { sid, pass } = data;
        if (!sid) {
            handleClick()
            setAlert('info')
            setMessage('Enetr You are Seller ID')
        } else if (!pass) {
            handleClick()
            setAlert('warning')
            setMessage('Enter Correct Password')
        } else {
            if (document.getElementById('spinner').style.display === 'none') {
                document.getElementById('spinner').style.display = 'block';
                document.getElementById('spinner').style.float = 'left';
                document.getElementById('spinner').style.margin = '0px 5px 0px 0px';
            }
            let id = sid.toLowerCase()
            console.log(id, pass)
            const result = await fetch(`${apiurl}/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id, pass
                })
            })
            const res = await result.json()
            // console.log(res)
            if (res) {
                navigate(`/adminpanel/${res._id}`)
            } else {
                handleClick()
                setAlert('error')
                setMessage('Wrong User ID and Password')
                document.getElementById('spinner').style.display = 'none';

            }
        }



    }

    // const chcat= async()=>{
    //     const catagory='camera'
    //     const setcat='camera'
    //     const result = await fetch('${apiurl}/changecatagory', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             catagory,setcat
    //         })
    //     })
    //     const res = await result.json()
    //     console.log(res)


    // }

    return (
        <>
       
        
            {/* <button onClick={chcat}>submit</button> */}
       
            <div>
                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                        anchorOrigin={{ vertical, horizontal }}
                        key={vertical + horizontal}
                    >
                        <Alert onClose={handleClose} severity={alert} sx={{ width: '100%' }} >
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            </div>
            <div className='admin_login'>

                <div className='adminlogin_form'>
                    <h6 className='etitle'>{<StoreIcon sx={{ fontSize: 35, mt: -1 }} />} Ecom Seller</h6>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            {/* <InputLabel htmlFor="outlined-adornment-password">Seller ID</InputLabel> */}
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                }
                                // label="Password"
                                placeholder='Enter Seller ID'
                                name='sid'
                                onChange={onInput}
                            />
                            <FormControl sx={{ mt: 2, width: '35ch' }} variant="outlined">
                                {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    // label="Password"
                                    placeholder='Enter Password'
                                    name='pass'
                                    onChange={onInput}
                                />

                            </FormControl>

                        </FormControl>

                    </Box>
                    <Box sx={{ ml: 1.3, mt: 1 }}>
                        <Button onClick={adminLogin} variant="contained" size="medium">
                            <span class="spinner-border spinner-border-sm" id='spinner' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                            <abbr id='login_title'>Login</abbr>
                        </Button>
                    </Box>

                </div>





            </div>
        </>


    );
}
