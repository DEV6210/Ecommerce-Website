import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BottomNavbar from "./BottomNavbar";
import Profile from "./Profile";
import './css/myaccount.css'
import { apiurl } from "../../services/api";
const MyAccount = () => {
    const { uid } = useParams()
    // console.log('myac page ', ' ' + uid)
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



    return (
        <>
            <div className="myaccount">
                <Profile />
            </div>
            <div id="ul_out">
                <BottomNavbar cssvalue='buttontap-5' uid={uid} />
            </div>
        </>
    );
}

export default MyAccount;