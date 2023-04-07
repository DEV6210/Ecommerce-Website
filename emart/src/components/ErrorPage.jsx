import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import './css/ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className="main">
        <h1></h1>
            <div>
                <img src="/images/error-page-404.gif" width='500px' height='500px' className='errori_mage' />
            </div>
            <div className='text-center'>
                <NavLink to={'/'} className='error_nav'><i class="fa-solid fa-house"></i>Go to Home Page</NavLink>
            </div>
        </div>
    )
}
export default ErrorPage;