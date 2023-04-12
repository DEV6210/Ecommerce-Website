import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import LeftColumn from './LeftColumn'
import RightColumn_TopNav from './RightColumn_TopNav'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './css/orderhistory.css'
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';
import Lottie from "lottie-react";
import groovyWalkAnimation from '../../components/json_image/delivery-truck.json';
import { apiurl } from '../../services/api';
import Loading from '../../loading/loading';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,

};
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  bgcolor: 'background.paper'
};
function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const btn_process = async () => {
    const id = props.id
    const status = 'Processing'
    const res = await fetch(`${apiurl}/updatestatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, status
      })
    })
    const result = await res.json()
    // console.log(result)
    if (result === 'success') {
      alert('item send to the Processing State')
      handleClose()
    }
  }
  const btn_shift = async () => {
    const id = props.id
    const status = 'Shifting'
    const res = await fetch(`${apiurl}/updatestatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, status
      })
    })
    const result = await res.json()
    // console.log(result)
    if (result === 'success') {
      alert('item Successfully Shifting')
      handleClose()
    }
  }
  const btn_deliver = async () => {
    const id = props.id
    const status = 'Delivered'
    const res = await fetch(`${apiurl}/updatestatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, status
      })
    })
    const result = await res.json()
    // console.log(result)
    if (result === 'success') {
      alert('item Successfully Delivered')
      handleClose()
    }
  }
  const btn_cancel = async () => {
    const id = props.id
    const status = 'Cancelled'
    const res = await fetch(`${apiurl}/updatestatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id, status
      })
    })
    const result = await res.json()
    // console.log(result)
    if (result === 'success') {
      alert('Delivery Cancelled')
      handleClose()
    }
  }



  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Status</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style2, width: 450, height: 460 }}>
          <div>
            <Lottie animationData={groovyWalkAnimation} loop={true} className='track-imglottie' />
          </div>
          <div className="modal-header editx settrack">
            <div><h1 className="modal-title fs-5 up4" id="exampleModalLabel"> Set Track Status</h1></div>
            <button type="button" className=" up4" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div>
            <Stack direction="row" className='statusbtn-grp'>
              <Button onClick={btn_process} color="success" variant="outlined" size="small">Processing</Button>
              <Button onClick={btn_shift} color="warning" variant="outlined" size="small">Shifting</Button>
              <Button onClick={btn_deliver} color="primary" variant="outlined" size="small">Delivered</Button>
              <Button onClick={btn_cancel} color="error" variant="outlined" size="small">Cancelled</Button>
            </Stack>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}



export default function OrderReceived() {
  // validation alert
  const [message, setMessage] = React.useState('')
  const [alert, setAlert] = React.useState('')
  const [opena, setOpena] = React.useState(false);

  const handleClick = () => {
    setOpena(true);
  };
  const vertical = 'bottom'
  const horizontal = 'right'

  const handleClosealert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpena(false);
  };
  const navigate = useNavigate()

  const { id } = useParams()
  const matchParams = async () => {
    const resultx = await fetch(`${apiurl}/admin_matchparams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
    const resx = await resultx.json()
    if (resx !== id) {
      navigate(`/wrongparams/${id}`)
    }
  }

  useEffect(() => {
    matchParams()
  }, [])


  const [order, setorder] = useState([])
  const orders = async () => {
    const res = await fetch(`${apiurl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await res.json()
    setorder(result)

  }
  useEffect(() => {
    orders()
  })

  const [open, setOpen] = React.useState(false);
  const [productdeatils, setproductdeatils] = useState([])
  const handleOpen = (e) => {
    setOpen(true);
    setproductdeatils(e)
    // console.log(e)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteitem = async (e) => {
    // console.log(e)
    const id = e
    const res = await fetch(`${apiurl}/deleteorderitem`, {
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

    handleClick()
    setAlert('warning')
    setMessage('Order item Successfully Deleted')
    setTimeout(() => {
      handleClose()
    });
  }


  return (
    <>
      <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={opena} autoHideDuration={4000} onClose={handleClosealert}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            className='updatealert'
          >
            <Alert onClose={handleClosealert} severity={alert} sx={{ width: '100%' }} >
              {message}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 400, }} className='deletebox'>

            <Card sx={{ maxWidth: 400 }} >
              <div className="modal-header editx">
                <h1 className="modal-title fs-5 up4" id="exampleModalLabel"> Order Details</h1>
                <button type="button" className=" up4" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div className='ordercard'>
                <img src={`${apiurl}/uploads/${productdeatils.pimage}`} alt='pimage' className='ord-image card_bodyx' />
              </div>
              <div class="card_bodyx">
                <b className='p_title'>{productdeatils.pname}</b>
                <p>{productdeatils.desc}</p>
                <div className='inr'>
                  <span className='rs'>₹{productdeatils.totalprice} </span>
                  <span>Qty: {productdeatils.qty}</span>
                </div>
                <b>Payment Mode: {productdeatils.payment}</b>
              </div>
              <div class="card_body3">
                <strong>Delivery Address</strong>
                <p>{productdeatils.uname}</p>
                <p>{productdeatils.phone}</p>
                <p>{productdeatils.email}</p>
                <p>{productdeatils.address}</p>
              </div>

              <Stack direction="row" className='action-button'>
                <Button color="error" onClick={() => { deleteitem(productdeatils._id) }}>delete</Button>
                <ChildModal id={productdeatils._id} />
              </Stack>


            </Card>


          </Box>
        </Modal>
      </div>




      <div className='admin_panel'>
        {/* left column  */}
        <div className='left_col'>
          <div className='left_fixed'>
            <LeftColumn show='show-6' />
          </div>
        </div>

        {/* Right Column */}
        <div className='right_col'>
          <div className='right_fixed'>
            <section className='topnav'>
              <RightColumn_TopNav link={`/adminpanel/${id}`} />
            </section>
            <div className='edit-body'>
              <div >
                {
                  !order ? <Loading />
                    :
                    order.map((item) => {
                      const { _id, uid, uname, email, phone, address, uimage, pid, pname, desc, catagory, price, qty, totalprice, payment, status, pimage } = item

                      return (
                        <>
                          <Card sx={{ maxWidth: 345, }} className='histoirybody usercard'>
                            <CardHeader
                              avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                  <img src={`${apiurl}/users_image/${uimage}`} alt='user photo' className='reg-user-image' />
                                </Avatar>
                              }
                              action={
                                <IconButton  aria-label="settings" onClick={() => { handleOpen({ _id, uid, uname, email, phone, address, uimage, pid, pname, desc, catagory, price, qty, totalprice, payment, status, pimage }) }}>
                                  <MoreVertIcon />
                                </IconButton>
                              }
                              title=<div className='user_title'>{uname}</div>
                              // subheader=<div className='user_title'>{email}</div>
                            />
                            <div className='ordercard'>
                              <img src={`${apiurl}/uploads/${pimage}`} alt='pimage' className='ord-image' />
                            </div>
                            <div class="card_body2">
                              <b className='p_title'>{pname}</b>
                              <p>{desc}</p>
                              <div className='inr'>
                                <span className='rs'>₹{totalprice} </span>
                                <span>Qty: {qty}</span>
                              </div>
                              <b>Payment Mode: {payment}</b>
                            </div>
                            <div>
                              <div >
                                {/* step-1 */}
                                {
                                  status === 'Processing' ?
                                    <div className="ordersteper">
                                      <div className="st-icon-1">
                                        <div className="text-center">
                                          <NavLink><i id="step-1-complete" className="fa-solid fa-circle"></i></NavLink>
                                        </div>
                                        <div className="stage1">Processing</div>
                                      </div>
                                      <hr className="hr1 hrx1 border-3 opacity-100" />
                                      {/* step-2 */}
                                      <div className="st-icon-1">
                                        <div className="text-center">
                                          <NavLink><i id="step-2x" className="fa-solid fa-circle"></i></NavLink>
                                        </div>
                                        <div className="stage1">Shifting</div>
                                      </div>
                                      <hr className="hr2 hrx2 border-3 opacity-100" />
                                      {/* step-3 */}
                                      <div className="st-icon-1">
                                        <div className="text-center">
                                          <NavLink><i id="step-2x" className="fa-solid fa-circle"></i></NavLink>
                                        </div>
                                        <div className="stage1">Delivered</div>
                                      </div>
                                    </div>
                                    :
                                    'no'
                                      &&
                                      status === 'Shifting' ?
                                      <div className="ordersteper">
                                        <div className="st-icon-1">
                                          <div className="text-center">
                                            <NavLink><i id="step-1-complete" className="fa-solid fa-circle"></i></NavLink>
                                          </div>
                                          <div className="stage1">Processing</div>
                                        </div>
                                        <hr className="hr1 hrx1 border-3 opacity-100" />
                                        {/* step-2 */}
                                        <div className="st-icon-1">
                                          <div className="text-center">
                                            <NavLink><i id="step-2-complete" className="fa-solid fa-circle"></i></NavLink>
                                          </div>
                                          <div className="stage1">Shifting</div>
                                        </div>
                                        <hr className="hr2 hrx2 border-3 opacity-100" />
                                        {/* step-3 */}
                                        <div className="st-icon-1">
                                          <div className="text-center">
                                            <NavLink><i id="step-2x" className="fa-solid fa-circle"></i></NavLink>
                                          </div>
                                          <div className="stage1">Delivered</div>
                                        </div>
                                      </div>
                                      :
                                      'no'
                                        &&
                                        status === 'Delivered' ?
                                        <div className="ordersteper">
                                          <div className="st-icon-1">
                                            <div className="text-center">
                                              <NavLink><i id="step-1-complete" className="fa-solid fa-circle"></i></NavLink>
                                            </div>
                                            <div className="stage1">Processing</div>
                                          </div>
                                          <hr className="hr1 hrx1 border-3 opacity-100" />
                                          {/* step-2 */}
                                          <div className="st-icon-1">
                                            <div className="text-center">
                                              <NavLink><i id="step-2-complete" className="fa-solid fa-circle"></i></NavLink>
                                            </div>
                                            <div className="stage1">Shifting</div>
                                          </div>
                                          <hr className="hr2 hrx2 border-3 opacity-100" />
                                          {/* step-3 */}
                                          <div className="st-icon-1">
                                            <div className="text-center">
                                              <NavLink><i id="step-3-complete" className="fa-solid fa-circle"></i></NavLink>
                                            </div>
                                            <div className="stage1">Delivered</div>
                                          </div>
                                        </div>
                                        :
                                        'no'
                                          ||
                                          status === 'Cancelled' ?
                                          <div className="ordersteper">
                                            <div className="st-icon-1">
                                              <div className="text-center">
                                                <NavLink><i id="step-1-complete" className="fa-solid fa-circle"></i></NavLink>
                                              </div>
                                              <div className="stage1">Processing</div>
                                            </div>
                                            <hr className="hr1 hrx1 border-3 opacity-100" />
                                            {/* step-2 */}
                                            <div className="st-icon-1">
                                              <div className="text-center">
                                                <NavLink><i id="step-2-complete" className="fa-solid fa-circle"></i></NavLink>
                                              </div>
                                              <div className="stage1">Shifting</div>
                                            </div>
                                            <hr className="hr2 hrx2 border-3 opacity-100" />
                                            {/* step-3 */}
                                            <div className="st-icon-1">
                                              <div className="text-center">
                                                <NavLink>
                                                  <i id="step-4-complete" className="fa-solid fa-circle"></i>

                                                </NavLink>
                                              </div>
                                              <div className="stage1">Canceled</div>
                                            </div>
                                          </div>
                                          : 'no'
                                }
                              </div>
                            </div>

                          </Card>
                        </>
                      )
                    })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
