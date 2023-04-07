import { BottomNav } from "./Navbar";
import Navbarall from "./NavbarAll";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { apiurl } from '../../src/services/api'
const Catagories = () => {
    const navigate = useNavigate()
    const { catagory } = useParams()


    // display product............
    const [product, setProduct] = useState([])
    const [done, setDone] = useState(undefined)

    const getProduct = async () => {
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
        // console.log(product)
        setProduct(result)
        setDone(true)
    }

    useEffect(() => {
        setTimeout(() => {
            getProduct()
        })
    }, [])
    return (
        <>
            <Navbarall link='/' navtitle='Catagories' />
            {/* <Catagory /> */}
            <div className="AllPageBody">
                {/*    catagory   */}

                <div className='mid_12'>
                    <div className='row' >
                        <div className='col-12 col-sm-12 col-md-3'>

                            <NavLink to={`/viewcatagory/mobiles`} className='cat_item'>
                                <div className='catimg'>
                                    <img src='/images/c2.png' alt='catagory' className='cat_img' />
                                </div>
                                <div className='cat_text'>
                                    <span className='cat_title'>Mobile & Tablet</span>
                                    <p className='cat_description'> 58% off</p>
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
            <BottomNav cssvalue='buttontap-3' />

        </>
    )
}
export default Catagories;