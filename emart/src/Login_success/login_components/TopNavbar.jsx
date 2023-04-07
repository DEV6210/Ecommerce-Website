import { NavLink } from "react-router-dom";
import './css/top_&_bottom-navbar.css'
import SearchBar from "./SearchBar";
const TopNavbar = () => {

    return (
        <div className="sticky-top" id="navbar">
            <div className="nav container-fluid navbar-scroll">

                <ul>

                    <NavLink to='/'>
                        <img src="/applogo/applogo.png" height='50px' className="applogo" alt="" />
                    </NavLink>
                </ul>
                <ul className="ul_none" >

                </ul>
                <ul className="ul_none">

                </ul>

                <ul className="search_op1">
                    <div>
                        <SearchBar />
                    </div>
                </ul>




                <ul className="nav_link_option">
                    <NavLink to={'/dashboard'} className='nav_link signup'>
                        <i class="fa-solid fa-house"></i>
                        <span className="nav_title">Home</span>
                    </NavLink>
                    <NavLink className='nav_link home'>
                        <i class="fa-solid fa-cart-shopping"></i>
                        <span className="nav_title">Order History</span>
                    </NavLink>

                    <NavLink className='nav_link login'>
                        <i class="fa-solid fa-user-lock"></i>
                        <span className="nav_title">My Account</span>
                    </NavLink>

                </ul>
            </div>
        </div>

    );
}

export default TopNavbar;