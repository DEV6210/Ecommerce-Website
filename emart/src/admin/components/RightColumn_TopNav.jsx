import { NavLink, useNavigate, useParams } from "react-router-dom";
import './css/RightColumn_TopNav.css'
const RightColumn_TopNav = (props) => {
    const { link } = useParams()
    const navigate = useNavigate()
    const xmark = () => {
        if (document.getElementById('drop').className === 'fa-solid fa-xmark') {
            document.getElementById('drop').className = 'fa-solid fa-bars'
        } else {
            document.getElementById('drop').className = 'fa-solid fa-xmark'
        }
    }
    // logout.......
    const logout = () => {
        navigate('/adminlogin')

    }
    // console.log(props.link)


    return (
        <>
            <div className="navoptions">
                <NavLink to={props.link} className='adhome'>
                    <i class="fa-solid fa-house homeicon"></i> 
                    <p>Home</p>
                </NavLink>
                <button onClick={logout} className='adminlogout'> logout </button>
            </div>

        </>
    );
}

export default RightColumn_TopNav;