import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import TopNavbarAll_login from "./TopNavbarAll_login";
import {apiurl} from '../../services/api'
const Item_Catagory = () => {
    const { uid } = useParams()
    console.log('item page ', ' ' + uid)
    const navigate = useNavigate()

    const [user, setUser] = useState('')
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


    // ------------------------------------------------------





    return (
        <>
            <TopNavbarAll_login link={`/dashboard/${user._id}`} navtitle='Catagory' />






            <div className="AllPageBody">
                {/*    catagory   */}

                <div className='mid_12'>
                    <div className='row' >
                        <div className='col-12 col-sm-12 col-md-3'>

                            <NavLink to={`/viewcatagory/${uid}/mobiles`} className='cat_item'>
                                <div className='catimg'>
                                    <img src='/images/c2.png' alt='catagory' className='cat_img' />
                                </div>
                                <div className='cat_text'>
                                    <span className='cat_title'>Mobile & Tablet</span>
                                    <p className='cat_description'> 58% off</p>
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

            <BottomNavbar cssvalue='buttontap-3' uid={uid} />
        </>
    );
}

export default Item_Catagory;