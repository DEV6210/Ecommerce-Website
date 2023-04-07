import Navbarall from "./NavbarAll";
import Lottie from "lottie-react";
import groovyWalkAnimation from './json_image/secure-login.json';
import { NavLink } from "react-router-dom";
import './css/cart.css'
import { BottomNav } from "./Navbar";

const Cart = () => {
    return (
        <>
            <Navbarall link='/' navtitle='My Cart' navcssValue='tpnav-2' />

            <div className="lottie-with">
                <div className="cart-login-img">
                    <Lottie animationData={groovyWalkAnimation} />
                </div>
            </div>
            <div className="link-option">
                <NavLink to={'/login'} className='link-button'>Please Login</NavLink>
            </div>

            <BottomNav cssvalue='buttontap-4'/>
        </>
    )
}
export default Cart;