import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import BottomNavbar from "../login_components/BottomNavbar";
import './css/dashboard.css'
import Loading from "../../loading/loading";
import Profile from "../login_components/Profile";
import Footer from "../../components/Footer";
// import Footer from "../login_components/footer";
import './css/slider.scss'
import { apiurl } from '../../services/api'
const Dashboard = () => {
    
    var Style1 = {
        backgroundColor: 'rgb(96, 197, 172)',
        color: 'white'
    }

    const navigate = useNavigate()
    const [user, setUser] = useState('')

    const { uid } = useParams()
    // console.log(uid)
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





    return (
        <>
            {/* TopNavbar */}
            <div>
                <div className="sticky-top" id="navbar">
                    <div className="nav container-fluid navbar-scroll">

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
                            <NavLink to={`/dashboard/${uid}`} className='nav_link signup' style={Style1}>
                                <i class="fa-solid fa-house"></i>
                                <span className="nav_title">Home</span>
                            </NavLink>
                            <NavLink to={`/wishlist/${uid}`} className='nav_link home'>
                                <i class="fa-solid fa-heart"></i>
                                <span className="nav_title">Wishlist</span>

                            </NavLink>
                            <NavLink to={`/orderhistory/${uid}`} className='nav_link home'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3 bottom-option ordericon" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <span className="nav_title">Orders</span>
                            </NavLink>

                            <NavLink to={`/myaccount/${uid}`} className='nav_link login'>
                                <i class="fa-solid fa-user-lock"></i>
                                <span className="nav_title">My Account</span>
                            </NavLink>

                        </ul>

                    </div>
                </div>
            </div>




            {/* body  */}
            <div className="l_dashboard">
                {
                    searchresult.length > 3
                        ?
                        <div>
                            {/* product  */}
                            {/* <h3 className='head_title'>Buy Now</h3> */}

                            <div className='product-list row sres'>
                                <div className="pl-1 col-12 col-md-11 ">

                                    {
                                        searchresult.map((item) => {
                                            const { _id, image, name, desc, seles_price, original_price, p_off_discount } = item;

                                            return (
                                                <>
                                                    <div className='cartstyle'>
                                                        <NavLink to={`/viewproduct/${_id}/${user._id}`} className='card'>
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
                                                    <NavLink to={`/viewcatagory/${uid}/laptop`} >
                                                        <div className='item_title'>
                                                            <div className='it_title'> Laptop & Computer</div>
                                                            <p>Best Offer 59% off</p>
                                                        </div>
                                                        <img src='/images/catbanner-01.jpg' className='item_pic_1' alt='img1' />
                                                    </NavLink>
                                                    <NavLink to={`/viewcatagory/${uid}/watch`}>
                                                        <div className='item_title'>
                                                            <div className='it_title' > Smart Watch</div>
                                                            <p>Best Offer 20% off</p>
                                                        </div>  <img src='/images/catbanner-02.jpg' className='item_pic_1' alt='img2' />
                                                    </NavLink>
                                                </div>

                                                {/* col-3 */}
                                                <div className='col-12 col-sm-12 col-sm-12 col-md-3 col_3'>
                                                    <NavLink to={`/viewcatagory/${uid}/mobiles`}>
                                                        <div className='item_title'>
                                                            <div className='it_title'> Mobile & Tablets</div>
                                                            <p>Best Offer 40% off</p>
                                                        </div>
                                                        <img src='/images/catbanner-03.jpg' className='item_pic_2' alt='img3' />
                                                    </NavLink>
                                                    <NavLink to={`/viewcatagory/${uid}/headphones`}>
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

                                                        <NavLink to={`/viewcatagory/${uid}/mobiles`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c2.png' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Mobile & Tablet</span>
                                                                <p className='cat_description'> 28% off</p>
                                                            </div>
                                                        </NavLink>
                                                        <NavLink to={`/viewcatagory/${uid}/cloths`} className='cat_item'>
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
                                                        <NavLink to={`/viewcatagory/${uid}/laptop`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='https://rukminim1.flixcart.com/image/416/416/xif0q/computer/b/e/h/-original-imagjyc69gh3a8wu.jpeg?' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'>Laptop & Computer</span>
                                                                <p className='cat_description'> 12% off</p>
                                                            </div>
                                                        </NavLink>
                                                        <NavLink to={`/viewcatagory/${uid}/watch`} className='cat_item'>
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
                                                        <NavLink to={`/viewcatagory/${uid}/sunglasses`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c8.png' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'> Sunglasses</span>
                                                                <p className='cat_description'> 85% off</p>
                                                            </div>
                                                        </NavLink>
                                                        <NavLink to={`/viewcatagory/${uid}/speakers`} className='cat_item'>
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
                                                        <NavLink to={`/viewcatagory/${uid}/camera`} className='cat_item'>
                                                            <div className='catimg'>
                                                                <img src='/images/c7.jpg' alt='catagory' className='cat_img' />
                                                            </div>
                                                            <div className='cat_text'>
                                                                <span className='cat_title'> Camera</span>
                                                                <p className='cat_description'> 34% off</p>
                                                            </div>
                                                        </NavLink>

                                                        <NavLink to={`/viewcatagory/${uid}/headphones`} className='cat_item'>
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

                                        <div>

                                        </div>

                                        <div className='product-list row'>
                                            <div className="pl-1 col-12 col-md-11 ">

                                                {
                                                    product.map((item) => {
                                                        const { _id, image, name, desc, seles_price, original_price, p_off_discount } = item;

                                                        return (
                                                            <>
                                                                <div className='cartstyle'>
                                                                    <NavLink to={`/viewproduct/${_id}/${user._id}`} className='card'>
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

            <BottomNavbar cssvalue='buttontap-1' uid={`${user._id}`} />
        </>
    );
}

export default Dashboard;