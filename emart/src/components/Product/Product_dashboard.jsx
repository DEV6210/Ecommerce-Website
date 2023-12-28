import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './css/product_dashboard.css'
import Loading from '../../loading/loading';
import Footer from '../Footer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { apiurl } from '../../services/api';
import { Card, CardActions } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    borderRadius: '0px'

};



const Product_dashboard = () => {
    
    var Style1 = {
        backgroundColor: 'rgb(96, 197, 172)',
        color: 'white'
    }


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
        setTimeout(() => {
            getProduct()
        })
    }, [])

    // Search option............

    const [searchresult, setsearchresult] = useState([])
    const [searchitem, setsearch] = useState({
        search: ''
    })
    const searchinput = (e) => {
        setsearch({ ...searchitem, [e.target.name]: e.target.value })
    }

    const searchBtn = async () => {
        const { search } = searchitem
        const catagory = search
        // console.log(catagory)
        const getResult = await fetch(`${apiurl}/catagory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                catagory
            })
        })
        var result = await getResult.json()
        // console.log(result)
        setsearchresult(result)
    }
    // console.log(searchresult)
    useEffect(() => {
        searchBtn()
    })

    ////showopval
    useEffect(() => {
        if (searchitem.search !== '') {
            document.getElementById('searchvalue').style.display = 'block';
            document.getElementById('sa').style.backgroundColor = 'white'
            document.getElementById('sa').style.borderBottomRightRadius = '0px'
            document.getElementById('sa').style.borderBottomLeftRadius = '0px'
        } else {
            document.getElementById('searchvalue').style.display = 'none'
            document.getElementById('sa').style.backgroundColor = 'none'
            document.getElementById('sa').style.borderBottomRightRadius = '5px'
            document.getElementById('sa').style.borderBottomLeftRadius = '5px'
        }
        if (searchresult.length > 1) {
            document.getElementById('searchvalue').style.display = 'none'
            document.getElementById('sa').style.backgroundColor = 'none'
            document.getElementById('sa').style.borderBottomRightRadius = '5px'
            document.getElementById('sa').style.borderBottomLeftRadius = '5px'
        }
    })
    const [inpval, setinpval] = useState()
    // search value of option 
    const stv = (search) => {
        setsearch({ search: search })
        // console.log(search)      
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const showoption = () => {
        setOpen(true);
    }
    useEffect(() => {
        showoption()
    }, [])


    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style }} className='loadalertbody'>

                        <Card sx={{ maxWidth: 400 }} className='loadbodycard' >
                            <div className="modal-header editx">
                                <h1 className="modal-title fs-5 up4" id="exampleModalLabel"> Notice</h1>
                                <button type="button" className="up4" onClick={handleClose}><i className="fa-solid fa-xmark cls_alert"></i></button>
                            </div>
                            <div className='card2-body'>
                                <img src='/images/ourapp.jpg' alt='userphoto' className='ourapp' />
                            </div>



                            <div className="d-grid gap-2" style={{ padding: '0px 6px', marginBottom: '10px' }}>
                                <a href='https://www.mediafire.com/file/zgacg3ddpms2oiy/emart_v2.3.1.apk/file' target="_blank" className="downloadlink">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cloud-arrow-down downloadicon" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z" />
                                            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        Download
                                    </div>
                                </a>
                            </div>

                        </Card>

                    </Box>
                </Modal>
            </div>

            {/* TopNavbar */}
            <div>
                <div className="sticky-top" id="navbar">
                    <div className="nav container-navbar-scroll">

                        <ul>

                            <NavLink>
                                <img src="/applogo/applogo.png" height='50px' className="applogo" alt="" />
                            </NavLink>
                        </ul>
                        <ul className="ul_none" >

                        </ul>
                        <ul className="ul_none">

                        </ul>

                        <ul className="search_op1" >
                            <NavLink>
                                <form action="javascript:void(0);" method="post" className="search-area" id="sa" autocomplete="off">
                                    <input value={searchitem.search} onChange={searchinput} name='search' id="sa2" type="text" className="search-inp " placeholder="Search..." aria-label="First name" />
                                    <button onClick={searchBtn} className="search-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </form>

                            </NavLink>
                            <div id="searchvalue">
                                <NavLink onClick={() => { stv('mobiles') }} className="lis"><li className="svbtn">Mobiles and Tablets</li></NavLink>
                                <NavLink onClick={() => { stv('headphones') }} className="lis"><li className="svbtn">Headphones</li></NavLink>
                                <NavLink onClick={() => { stv('laptop') }} className="lis"><li className="svbtn">Laptops and Computers</li></NavLink>
                                <NavLink onClick={() => { stv('speakers') }} className="lis"><li className="svbtn">Sprakers</li></NavLink>
                                <NavLink onClick={() => { stv('watch') }} className="lis"><li className="svbtn">Watches</li></NavLink>
                                <NavLink onClick={() => { stv('cloths') }} className="lis"><li className="svbtn">Cloth's womens and mens cloths</li></NavLink>
                                <NavLink onClick={() => { stv('sunglasses') }} className="lis"><li className="svbtn">Sunglasses</li></NavLink>
                                <NavLink onClick={() => { stv('camera') }} className="lis"><li className="svbtn">Camera</li></NavLink>
                            </div>
                        </ul>
                        <ul className="nav_link_option">
                            <NavLink to={`/`} className='nav_link signup' style={Style1}>
                                <i class="fa-solid fa-house"></i>
                                <span className="nav_title">Home</span>
                            </NavLink>
                            <NavLink to={`/cart`} className='nav_link home'>
                                <i class="fa-solid fa-heart"></i>
                                <span className="nav_title">Wishlist</span>
                            </NavLink>
                            <NavLink to={`/signup`} className='nav_link login'>
                                <i class="fa-solid fa-user-plus"></i>
                                <span className="nav_title">Signup </span>
                            </NavLink>
                            <NavLink to={`/login`} className='nav_link home' >
                                <i class="fa-solid fa-user-lock"></i>
                                <span className="nav_title">Login </span>
                            </NavLink>



                        </ul>
                    </div>
                </div>
            </div>

            {/* body  */}
            <div className="l_dashboard">
                {
                    searchresult.length > 0
                        ?
                        <div>
                            {/* product  */}
                            {/* <h3 className='head_title'>Buy Now</h3> */}

                            <div className='product-list row sres'>
                                <div className="pl-1 col-12 col-md-11 ">

                                    {
                                        searchresult.map((item) => {
                                            const { _id, image, name, desc, seles_price, inr_off, p_off_discount } = item;
                                            const id = _id

                                            return (
                                                <>
                                                    <div className='cartstyle'>
                                                        <NavLink to={`/viewproduct/${id}`} className='card'>
                                                            {/* <NavLink id='hart'><i class="fa-regular fa-heart love"></i></NavLink> */}
                                                            <div className="imgsection">
                                                                <img src={`${apiurl}/uploads/${image}`} alt='product image' className='card-img-top' />
                                                            </div>
                                                            <div class="card_body">
                                                                <b className='p_title'>{name}</b>
                                                                <p>{desc}</p>
                                                                <div className='inr'>
                                                                    <span className='rs'>₹{seles_price} </span>
                                                                    <span className='discount'>₹{inr_off}</span>
                                                                </div>
                                                                <b>Best Offer {p_off_discount}% off</b>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className="footer">
                                <Footer />
                            </div>
                        </div>
                        :

                        <div>
                            {
                                !done ?
                                    <div>
                                        <Loading />
                                    </div>
                                    :
                                    <>
                                        <div className='row_1'>
                                            <div className='row'>
                                                {/* col-1 */}
                                                <div className='col-12 col-sm-12 col-md-6 slider col_1'>
                                                    <div className='banner-text'>
                                                        <h5 className='h5'>Online Shopping</h5>
                                                        <h3 className='h3'>SIMPLE AND EASY</h3>

                                                    </div>
                                                    <div className='slide_img'>

                                                    </div>
                                                </div>

                                                {/* col-2 */}
                                                <div className='col-12 col-sm-12 col-sm-12 col-md-3 col_2'>
                                                    <NavLink to={`/viewcatagory/laptop`} >
                                                        <div className='item_title'>
                                                            <div className='it_title'> Laptop & Computer</div>
                                                            <p>Best Offer 59% off</p>
                                                        </div>
                                                        <img src='/images/catbanner-01.jpg' className='item_pic_1' alt='img1' />
                                                    </NavLink>
                                                    <NavLink to={`/viewcatagory/watch`}>
                                                        <div className='item_title'>
                                                            <div className='it_title' > Smart Watch</div>
                                                            <p>Best Offer 20% off</p>
                                                        </div>  <img src='/images/catbanner-02.jpg' className='item_pic_1' alt='img2' />
                                                    </NavLink>
                                                </div>

                                                {/* col-3 */}
                                                <div className='col-12 col-sm-12 col-sm-12 col-md-3 col_3'>
                                                    <NavLink to={`/viewcatagory/mobiles`}>
                                                        <div className='item_title'>
                                                            <div className='it_title'> Mobile & Tablets</div>
                                                            <p>Best Offer 40% off</p>
                                                        </div>
                                                        <img src='/images/catbanner-03.jpg' className='item_pic_2' alt='img3' />
                                                    </NavLink>
                                                    <NavLink to={`/viewcatagory/headphones`}>
                                                        <div className='item_title'>
                                                            <div className='it_title'> Head Phones</div>
                                                            <p>Best Offer 59% off</p>
                                                        </div>
                                                        <img src='/images/catbanner-04.jpg' className='item_pic_2' alt='img4' />
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>


                                        {/*    catagory   */}
                                        <h3 className='head_title2'>Product Catagories</h3>
                                        <div className='mid_div'>
                                            <div className='mid_1'>
                                                <div className='row' >
                                                    <div className='col-12 col-sm-12 col-md-3'>

                                                        <NavLink to={`/viewcatagory/mobiles`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c2.png' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Mobile & Tablet</span>
                                                                <p className='cat_description'> 28% off</p>
                                                            </div>
                                                        </NavLink>
                                                        <NavLink to={`/viewcatagory/cloths`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c1.jpeg' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Cloth's</span>
                                                                <p className='cat_description'> 65% off</p>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-3'>
                                                        <NavLink to={`/viewcatagory/laptop`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='https://rukminim1.flixcart.com/image/416/416/xif0q/computer/b/e/h/-original-imagjyc69gh3a8wu.jpeg?' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Laptop & Computer</span>
                                                                <p className='cat_description'> 12% off</p>
                                                            </div>
                                                        </NavLink>
                                                        <NavLink to={`/viewcatagory/watch`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c4.jpg' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Watch</span>
                                                                <p className='cat_description'> 70% off</p>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-3'>
                                                        <NavLink to={`/viewcatagory/sunglasses`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c8.png' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'> Sunglasses</span>
                                                                <p className='cat_description'> 85% off</p>
                                                            </div>
                                                        </NavLink>
                                                        <NavLink to={`/viewcatagory/speakers`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c6.jpg' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Speakers</span>
                                                                <p className='cat_description'> 58% off</p>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                    <div className='col-12 col-sm-12 col-md-3'>
                                                        <NavLink to={`/viewcatagory/camera`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c7.jpg' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'> Camera</span>
                                                                <p className='cat_description'> 34% off</p>
                                                            </div>
                                                        </NavLink>

                                                        <NavLink to={`/viewcatagory/headphones`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c5.jpg' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Head Phone</span>
                                                                <p className='cat_description'> 28% off</p>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* product  */}
                                        <h3 className='head_title'>Brand New Popular Product</h3>


                                        <div className='product-list row' >
                                            <div className="pl-1 col-12 col-md-11 ">

                                                {
                                                    product.map((item, index) => {
                                                        const { _id, image, name, desc, seles_price, inr_off, original_price, p_off_discount } = item;
                                                        const id = _id
                                                        if (index) {
                                                            return (
                                                                <>
                                                                    <div className='cartstyle'>
                                                                        <NavLink to={`/viewproduct/${id}`} className='card'>
                                                                            {/* <NavLink id='hart'><i class="fa-regular fa-heart love"></i></NavLink> */}
                                                                            <div className="imgsection">
                                                                                <img src={`${apiurl}/uploads/${image}`} alt='product image' className='card-img-top' />
                                                                            </div>
                                                                            <div class="card_body">
                                                                                <b className='p_title'>{name}</b>
                                                                                <p>{desc}</p>
                                                                                <div className='inr'>
                                                                                    <span className='rs'>₹{seles_price} </span>
                                                                                    <span className='discount'>₹{original_price}</span>
                                                                                </div>
                                                                                <b>Best Offer {p_off_discount}% off</b>
                                                                            </div>
                                                                        </NavLink>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>



                                        <div className="footer">
                                            <Footer />
                                        </div>
                                    </>
                            }
                        </div>
                }
            </div>
        </>
    )
}





const Catagory = () => {
    return (
        <>
            {/*    catagory   */}

            <div className='mid_12'>
                <div className='row' >
                    <div className='col-12 col-sm-12 col-md-3'>

                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c2.png' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'>Mobile & Tablet</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>
                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c1.jpeg' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'>Cloth's</span>
                                <p className='cat_description'> cat_desc</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className='col-12 col-sm-12 col-md-3'>
                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='https://rukminim1.flixcart.com/image/416/416/xif0q/computer/b/e/h/-original-imagjyc69gh3a8wu.jpeg?' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'>Laptop & Computer</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>
                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c4.jpg' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'>Watch</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className='col-12 col-sm-12 col-md-3'>
                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c8.png' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'> Sunglasses</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>
                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c6.jpg' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'>Speakers</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className='col-12 col-sm-12 col-md-3'>
                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c7.jpg' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'> Camera</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>

                        <NavLink className='cat_item'>
                            <div className='catimg'>
                                <img src='/images/c5.jpg' alt='catagory' className='cat_img' />
                            </div>
                            <div className='cat_text'>
                                <span className='cat_title'>Head Phone</span>
                                <p className='cat_description'> cat_description</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}

export { Product_dashboard, Catagory }
