import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Loading from '../../loading/loading'
import LeftColumn from './LeftColumn'
import RightColumn_TopNav from './RightColumn_TopNav'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './css/registeruser.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, CardActions } from '@mui/material'
import { color } from '@mui/system'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { apiurl } from '../../services/api'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,

};


export const RegisterUser = () => {
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

  const [done, setDone] = useState(undefined)
  const [user, setuser] = useState()
  const getUser = async () => {
    const res = await fetch(`${apiurl}/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const result = await res.json()
    // console.log(result)
    setuser(result)
    setDone(true)
  }
  useEffect(() => {
    getUser()
  })

  const [open, setOpen] = React.useState(false);
  const [viewuser, setviewuser] = useState([])
  const handleOpen = (e) => {
    setOpen(true);
    setviewuser(e)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const suspend = async (e) => {
    const id = e
    const res = await fetch(`${apiurl}/suspend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
    const result = await res.json()
    if (result === 'success') {
      handleClick()
      setAlert('success')
      setMessage('User Successfully Suspended')
      setTimeout(() => {
        handleClose()
      }, 2000);
    }


  }
  const deactive = (e) => {
    handleClick()
    setAlert('warning')
    setMessage('User Successfully Deactive')
    setTimeout(() => {
      handleClose()
    }, 2000);

  }


  return (
    <>

      <div>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={opena} autoHideDuration={1000} onClose={handleClosealert}
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
                <h1 className="modal-title fs-5 up4" id="exampleModalLabel"> User Details</h1>
                <button type="button" className=" up4" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div className='card2-body'>
                <img src={`${apiurl}/users_image/${viewuser.image}`} alt='userphoto' className='userphoto2' />
                <div style={{ marginLeft: '5px' }}>
                  <p>{viewuser.name}</p>
                  <p>{viewuser.phone}</p>
                  <p>{viewuser.email}</p>
                  <p>Address: {viewuser.address}</p>
                </div>
              </div>


              <CardActions
                style={{ float: '' }}>
                <button onClick={() => { suspend(viewuser._id) }} size="small" className='suspend'>SUSPEND</button>
                <button onClick={() => { deactive(viewuser._id) }} size="small" className='deactive'> DEACTIVE </button>
              </CardActions>
            </Card>

          </Box>
        </Modal>
      </div>


      <div className='admin_panel'>
        {/* left column  */}
        <div className='left_col'>
          <div className='left_fixed'>
            <LeftColumn show='show-3' />
          </div>
        </div>

        {/* Right Column */}
        <div className='right_col'>
          <div className='right_fixed'>
            <section className='topnav'>
              <RightColumn_TopNav link={`/adminpanel/${id}`} />
            </section>
            <div className='edit-body'>
              {
                !done ?
                  <Loading />
                  :
                  <div className='userbody'>
                    {
                      user.map((e) => {
                        const { _id, name, phone, email, password, address, image } = e
                        return (
                          <>
                            <Card sx={{ maxWidth: 345 }} className='usercard'>
                              <CardHeader
                                avatar={
                                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    <img src={`${apiurl}/users_image/${image}`} alt='user photo' className='reg-user-image' />
                                  </Avatar>
                                }
                                action={
                                  <IconButton aria-label="settings" onClick={() => { handleOpen({ _id, name, phone, email, password, address, image }) }}>
                                    <MoreVertIcon />
                                  </IconButton>
                                }
                                title={name}
                              />
                              {/* <CardMedia
                                component="img"
                                height="194"
                                image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                              /> */}

                            </Card>
                          </>
                        )
                      })
                    }
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
