import { NavLink, useParams } from "react-router-dom";
import './css/leftoptions.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { apiurl } from "../../services/api";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};



var LeftOptions = (props) => {
    const { id } = useParams()
    if (props.show === 'show-1') {
        var style1 = {
            display: 'block',
        }
    } else if (props.show === 'show-2') {
        var style2 = {
            display: 'block',
        }
    } else if (props.show === 'show-3') {
        var style3 = {
            display: 'block',
        }
    } else if (props.show === 'show-4') {
        var style4 = {
            display: 'block',
        }
    } else if (props.show === 'show-5') {
        var style5 = {
            display: 'block',
        }
    } else if (props.show === 'show-6') {
        var style6 = {
            display: 'block',
        }
    } else if (props.show === 'show-7') {
        var style7 = {
            display: 'block',
        }
    } else if (props.show === 'show-8') {
        var style8 = {
            display: 'block',
        }
    }

    const [open, setOpen] = React.useState(false);
    const [admin, setadmin] = React.useState([])
    const handleOpen = async () => {
        setOpen(true);
        const res = await fetch(`${apiurl}/admindetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
        const result = await res.json()
        // console.log(result)
        setadmin(result)
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <div className="modal-header editx">
                            <h1 className="modal-title fs-5 up4" id="exampleModalLabel"> Admin Details</h1>
                            <button type="button" className=" up4" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div >
                            {
                                admin.map((e) => {
                                    return (
                                        <>
                                            <div style={{padding:'10px'}}>
                                                <strong>SID: {e.sid}</strong><br />
                                                <strong>KEY: {e._id}</strong><br /><br />
                                                <p>If you forget the seller id & password contac the DBA</p>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </Box>
                </Modal>
            </div>



            <div>
                <NavLink to={`/adminpanel/${id}`}>
                    <li className='option1-home'>
                        <i className="fa-solid fa-house"></i>
                        <p>Panel Dashboard</p>
                    </li>
                    <div className="triangle-left" style={style1}></div>
                </NavLink>
                <NavLink to={`/updateproduct/${id}`} >
                    <li className='option1-home'>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <p>Edit &   Update / delete</p>
                    </li>
                    <div className="triangle-left" style={style2}></div>
                </NavLink>
                <NavLink to={`/register_user/${id}`} >
                    <li className='option1-home'>
                        <i className="fa-solid fa-users"></i>
                        <p>Register Users</p>
                    </li>
                    <div className="triangle-left" style={style3}></div>
                </NavLink>
                <NavLink to={`/events/${id}`} >
                    <li className='option1-home'>
                        <i className="fa-solid fa-calendar-days"></i>
                        <p>Events</p>
                    </li>
                    <div className="triangle-left" style={style4}></div>
                </NavLink>
                <NavLink to={`/feedback/${id}`} >
                    <li className='option1-home'>
                        <i className="fa-solid fa-comment"></i>
                        <p>Feedback / Reports</p>
                    </li>
                    <div className="triangle-left" style={style5}></div>
                </NavLink>
                <NavLink to={`/received_order/${id}`} >
                    <li className='option1-home'>
                        <i className=" fa-solid fa-clock-rotate-left"></i>
                        <p>Order History</p>
                    </li>
                    <div className="triangle-left" style={style6}></div>
                </NavLink>
                <NavLink to={`/usersupport/${id}`} >
                    <li className='option1-home'>
                        <i class="fa-solid fa-headphones"></i>
                        <p>Users Support</p>
                    </li>
                    <div className="triangle-left" style={style7}></div>
                </NavLink>
                <NavLink to={`/notifications/${id}`} >
                    <li className='option1-home'>
                        <i className="fa-solid fa-bell"></i>
                        <p>Notifications</p>
                    </li>
                    <div className="triangle-left" style={style8}></div>
                </NavLink>
            </div>

            <div className="adminsetting">
                <NavLink onClick={handleOpen} style={{ color: 'white' }}><i className="fa-solid fa-gear"></i>Setting</NavLink>
            </div>
        </>
    );
}

export default LeftOptions;