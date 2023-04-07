import { NavLink } from "react-router-dom";
import './css/navbarall.css'

// Top Navbar 
const Navbarall = (props) => {
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

    return (
        <div className="sticky-top" id="navbar">
            <div className="nav nav2 container-fluid navbar-scroll">

                <ul>
                    <NavLink to={`${props.link}`}>
                        <img src="/applogo/applogo.png" height='50px' className="applogo2" alt="" />

                        <i class="fa-solid fa-arrow-left"></i>
                    </NavLink>
                    <span className="nav_titlex">{props.navtitle}</span>
                </ul>

                <ul className="nav_link_option">
                    <NavLink to={`/`} className='nav_link signup'>
                        <i class="fa-solid fa-house"></i>
                        <span className="nav_title">Home</span>
                    </NavLink>
                    <NavLink to={`/cart`} className='nav_link home' style={Style2}>
                        <i class="fa-solid fa-heart"></i>
                        <span className="nav_title">Wishlist</span>

                    </NavLink>
                    <NavLink to={`/signup`} className='nav_link login' style={Style4}>
                        <i class="fa-solid fa-user-plus"></i>
                        <span className="nav_title">Signup </span>
                    </NavLink>
                    <NavLink to={`/login`} className='nav_link home' style={Style3}>
                        <i class="fa-solid fa-user-lock"></i>
                        <span className="nav_title">Login </span>
                    </NavLink>


                </ul>
            </div>
        </div>

    );
}

export default Navbarall;