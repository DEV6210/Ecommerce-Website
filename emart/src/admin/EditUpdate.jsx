import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { NavLink } from "react-router-dom"
import Loading from "../loading/loading"
import LeftColumn from "./components/LeftColumn"
import RightColumn_TopNav from "./components/RightColumn_TopNav"
import './css/updateproduct.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import StoreIcon from '@mui/icons-material/Store';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { apiurl } from "../services/api"

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
    border: '2px solid #000',
    boxShadow: 24,

};
const UpdateDelete = () => {
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
    const uid = id
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


    // display product............
    const [product, setProduct] = useState([])
    const [done, setDone] = useState(undefined)

    const getProduct = async () => {
        const getResult = await fetch(`${apiurl}/getProduct`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        var result = await getResult.json()
        // console.log(product)
        setProduct(result)
        setDone(true)
    }

    useEffect(() => {
        getProduct()
    })

    const [productData, setProductData] = useState({
        id: '',
        pname: '',
        pdesc: '',
        catagory: '',
        pprice: '',
        pdiscount: '',
        inr_off: '',
        seles_price: '',
    })

    const inputData = (e) => {
        // console.log(e.target.name, e.target.value);
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    // var cost = productData.pprice
    // var discount = productData.pdiscount

    // var off = discount / 100
    // var inr_off = Math.round(cost * off)
    // var seles_off = Math.round(cost - inr_off)

    // var inroff = '₹' + inr_off
    // var seles = '₹' + seles_off


    // if (productData.pdiscount > 100) {
    //     alert('Please Enter Discount  0 to 100 %')
    // }
    // if (productData.pdiscount && productData.pprice) {
    //     document.getElementById('cal').style.display = 'block'
    //     document.getElementById('cal').style.display = 'flex'
    //     document.getElementById('cal').style.justifyContent = 'space-between'
    // }
    // const hide = () => {
    //     document.getElementById('cal').style.display = 'none'

    // }

    const publishButton = async () => {

        if (document.getElementById('spinner').style.display === 'none') {
            document.getElementById('spinner').style.display = 'block';
            document.getElementById('spinner').style.float = 'left';
            document.getElementById('spinner').style.margin = '5px 5px 0px 0px';
            document.getElementById('login_title').innerHTML = 'Updating...';
        }

        const { id, pname, desc, catagory, pprice, pdiscount } = productData
        const res = await fetch(`${apiurl}/updateproduct`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id, pname, desc, catagory, pprice, pdiscount
                })
            }
        );

        const result = await res.json()
        // console.log(result)
        if (result === 'update success') {
            handleClick()
            setAlert('success')
            setMessage('Details Successfully Updated')
            setTimeout(() => {
                handleClose()
            }, 2000);
        }

    }
    const [open, setOpen] = React.useState(false);
    const [dis, setdis] = useState()

    const handleOpen = (e) => {
        setOpen(true);
        console.log(e.p_off_discount)
        setdis(e.p_off_discount)
        setProductData({ ...productData, id: e._id, pname: e.name, desc: e.desc, catagory: e.catagory, pprice: e.original_price, pdiscount: e.p_off_discount })
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [openDelete, setOpenDelete] = React.useState(false);
    const [deleteid, setdeleteid] = useState('')
    const handleOpenDelete = (e) => {
        setOpenDelete(true);
        setdeleteid(e)
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const deleteProduct = async () => {
        // console.log(deleteid)
        const id = deleteid
        const res = await fetch(`${apiurl}/deleteproduct`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id
                })
            }
        );

        const result = await res.json()
        // console.log(result)
        if (result === 'delete success') {
            handleClick()
            setAlert('success')
            setMessage('Product Successfully Deleted')
            setTimeout(() => {
                handleCloseDelete()
            }, 2000);
        }
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
            {/* delete  */}
            <div>
                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }} className='deletebox'>
                        <div className="modal-header editx">
                            <h1 className="modal-title fs-5 up4" id="exampleModalLabel"> Delete Conformation </h1>
                            <button type="button" className=" up4" onClick={handleCloseDelete}><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="yesno">
                            <button onClick={deleteProduct} className="yes">Yes</button>
                            <button onClick={handleCloseDelete} className="no">No</button>
                        </div>
                    </Box>
                </Modal>
            </div>



            {/* update  */}
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        {/* form modal  */}
                        <div >
                            <div className="modal-dialog">
                                <div className="modal-content">

                                    <div className="modal-header editx">
                                        <h1 className="modal-title fs-5 up4" id="exampleModalLabel">Update Product Details</h1>
                                        <button type="button" className=" up4" onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
                                    </div>


                                    <form className="up_form" method="post" enctype="multipart/form-data">

                                        <div className='field_margin'>
                                            <label className='field_title'>Product Name</label>
                                            <input className='form-control' value={productData.pname} onChange={inputData} name='pname' type='text' placeholder='Enter Product Name' />
                                        </div>
                                        <div className='field_margin'>
                                            <label className='field_title'>Description</label>
                                            <textarea className="form-control" value={productData.desc} onChange={inputData} name='pdesc' id="" rows="3" placeholder='Product Description...'></textarea>
                                        </div>
                                        <div className='field_margin'>
                                            <select className="form-select" onChange={inputData} name='catagory'>
                                                <option value={productData.catagory}>{productData.catagory}</option>
                                                <option value="cloths">Men & Women Cloths</option>
                                                <option value="laptop">Laptop and Computer</option>
                                                <option value="mobiles">Mobiles & Tablets</option>
                                                <option value="watch">Watch</option>
                                                <option value="headphones">Head phones</option>
                                                <option value="sunglasses">Sunglasses</option>
                                                <option value="camera">Camera</option>
                                                <option value="speakers">Speakers</option>

                                            </select>
                                        </div>

                                        <div className='field_margin field_margin2'>
                                            <div>
                                                <label className='field_title'>Price</label>
                                                <input className='form-control fieldx' value={productData.pprice} onChange={inputData} name='pprice' type='text' placeholder="₹" />
                                            </div>
                                            <div>
                                                <label className='field_title'> Discount %</label>
                                                <input className='form-control fieldx1' value={productData.pdiscount} onChange={inputData} name='pdiscount' placeholder='%' type='text' />
                                            </div>
                                        </div>
                                        <div id='cal'>
                                            {/* <div>{seles} <u> ({inroff})</u> <b>{' ' + discount + '% Off'}</b></div>
                                            <div><NavLink onClick={hide} ><i className="fa-solid fa-eye-slash"></i></NavLink></div> */}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn-cancel" onClick={handleClose}> Cancel </button>
                                            <button type="button" className="btn-submit" onClick={publishButton}>
                                                <span className="spinner-border spinner-border-sm" id='spinner' style={{ display: 'none' }} role="status" aria-hidden="true"></span>
                                                <abbr id='login_title'> Update </abbr>
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
            <div className='admin_panel'>
                {/* left column  */}
                <div className='left_col'>
                    <div className='left_fixed'>
                        <LeftColumn show='show-2' />
                    </div>
                </div>

                {/* Right Column */}
                <div className='right_col'>
                    <div className='right_fixed'>
                        <section className='topnav'>
                            <RightColumn_TopNav link={`/adminpanel/${id}`} />
                        </section>

                        {/* div-2 */}
                        <div className=''>
                            <div className='edit-body'>
                                {
                                    !done ?
                                        <Loading />
                                        :
                                        <div className='product-list row'>
                                            <div className="editproductbody  ">

                                                {
                                                    product.map((item) => {
                                                        const { _id, image, name, desc, seles_price, original_price, inr_off, p_off_discount } = item;

                                                        return (
                                                            <>
                                                                <div className='cartstyle'>
                                                                    <NavLink className=' productcard'>
                                                                        <div className="imgsection">
                                                                            <img src={`${apiurl}/uploads/${image}`} alt='product image' className='edit-product-image' />
                                                                        </div>
                                                                        <div className="card_body2">
                                                                            <b className='p_title'>{name}</b>
                                                                            <p>{desc}</p>
                                                                            <div className='inr'>
                                                                                <span className='rs'>₹{seles_price} </span>
                                                                                <span className='discount'>₹{original_price}</span>
                                                                            </div>
                                                                            <b>Best Offer {p_off_discount}% off</b>
                                                                            <div className="btn-action">
                                                                                <button className="btn-delete" onClick={() => { handleOpenDelete(_id) }}>Delete</button>
                                                                                <button className="btn-update" onClick={() => { handleOpen(item) }} >Update</button>
                                                                            </div>
                                                                        </div>
                                                                    </NavLink>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateDelete;