import { NavLink } from 'react-router-dom'
import './css/top_&_bottom-navbar.css'


// Bottom Navbar for Mobile Screen 

const BottomNavbar = (props) => {

    // console.log(props.cssvalue)
    if(props.cssvalue === 'buttontap-1'){
        var cssStyle1={
            color: '#3b32b3',
            borderTop: 'solid #3b32b3 2px',
            paddingTop: '5px',
            marginTop: '-5px',
        }
    }else if(props.cssvalue === 'buttontap-2'){
        var cssStyle2={
            color: '#3b32b3',
            borderTop: 'solid #3b32b3 2px',
            paddingTop: '5px',
            marginTop: '-5px',
        }
    }else if(props.cssvalue === 'buttontap-3'){
        var cssStyle3={
            color: '#3b32b3',
            borderTop: 'solid #3b32b3 2px',
            paddingTop: '5px',
            marginTop: '-5px',
        }
    }else if(props.cssvalue === 'buttontap-4'){
        var cssStyle4={
            color: '#3b32b3',
            borderTop: 'solid #3b32b3 2px',
            paddingTop: '5px',
            marginTop: '-5px',
        }
    }else if(props.cssvalue === 'buttontap-5'){
        var cssStyle5={
            color: '#3b32b3',
            borderTop: 'solid #3b32b3 2px',
            paddingTop: '5px',
            marginTop: '-5px',
        }
    }
   
    
    
    
    return (
        <>
            <div className="BottomNav">
                <NavLink className='bottomnav' style={cssStyle1} to={`/dashboard/${props.uid}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door bottom-option" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                    </svg>
                    <span>Home</span>
                </NavLink>

                <NavLink className='bottomnav' to={`/customersupport/${props.uid}`} style={cssStyle2} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle bottom-option" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <span>Help</span>
                </NavLink>

                <NavLink className='bottomnav' to={`/itemcatagory/${props.uid}`} style={cssStyle3} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-columns-gap bottom-option" viewBox="0 0 16 16">
                        <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z" />
                    </svg>
                    <span>Catagories</span>
                </NavLink>

                <NavLink className='bottomnav' to={`/wishlist/${props.uid}`} style={cssStyle4} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart3 bottom-option" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <span>Cart</span>
                </NavLink>

                <NavLink className='bottomnav' to={`/myaccount/${props.uid}`} style={cssStyle5} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person bottom-option" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                    </svg>
                    <span>Account</span>
                </NavLink>
            </div>

        </>
    )
}
export default BottomNavbar;