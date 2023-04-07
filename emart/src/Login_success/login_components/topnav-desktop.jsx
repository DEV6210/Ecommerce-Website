import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { apiurl } from "../../services/api";
const TopNavDesktop = (props) => {
    if (props.navcssValue === 'tpnav-1') {
        var Style1 = {
            backgroundColor: 'rgb(96, 197, 172)',
            color: 'white'
        }
    } else if (props.navcssValue === 'tpnav-2') {
        var Style2 = {
            backgroundColor: 'rgb(96, 197, 172)',
            color: 'white'
        }
    } else if (props.navcssValue === 'tpnav-3') {
        var Style3 = {
            backgroundColor: 'rgb(96, 197, 172)',
            color: 'white'
        }
    } else if (props.navcssValue === 'tpnav-4') {
        var Style4 = {
            backgroundColor: 'rgb(96, 197, 172)',
            color: 'white'
        }
    } 












    if (props.search === 'none') {
        var searchStyle = {
            display: 'none'
        }
    }



    const navigate = useNavigate()
    const { uid } = useParams()
    // console.log('contac page ', ' ' + uid)

    // check params id 
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

    return (
        <>
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

                        <ul className="search_op1" style={searchStyle}>
                            <div>
                                <form action="javascript:void(0);" method="post" className="search-area">

                                    <input name='search' type="text" className="search-inp " placeholder="Search..." aria-label="First name" />

                                    <button className="search-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </ul>
                        <ul className="nav_link_option">
                            <NavLink to={`/dashboard/${user._id}`} className='nav_link signup'>
                                <i class="fa-solid fa-house"></i>
                                <span className="nav_title">Home</span>
                            </NavLink>
                            <NavLink to={`/wishlist/${props.uid}`} className='nav_link home' style={Style2}>
                                <i class="fa-solid fa-heart"></i>
                                <span className="nav_title">Wishlist</span>
                            </NavLink>
                            <NavLink  to={`/orderhistory/${uid}`} className='nav_link home' style={Style3}>
                                <svg style={Style3} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3 bottom-option ordericon" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                <span className="nav_title">Orders</span>
                            </NavLink>

                            <NavLink to={`/myaccount/${props.uid}`} className='nav_link login' style={Style4}>
                                <i class="fa-solid fa-user-lock"></i>
                                <span className="nav_title">My Account</span>
                            </NavLink>

                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TopNavDesktop;