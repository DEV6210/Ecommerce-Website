import { NavLink } from "react-router-dom";

// Top Navbar 
const TopNavbarAll_login = (props) => {

    // console.log(props.link)


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
                    <NavLink to={`${props.link}`} className='nav_link home'>
                        <i class="fa-solid fa-house"></i>
                        <span className="nav_title">Home</span>
                    </NavLink>     

                </ul>
            </div>
        </div>

    );
}

export default TopNavbarAll_login;