import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BottomNavbar from "./BottomNavbar";
import TopNavbarAll_login from "./TopNavbarAll_login";
import './css/contacus.css'
import SendIcon from '@mui/icons-material/Send';
import { apiurl } from "../../services/api";

const Customer_Support = () => {
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

    // ------------------------------------------------------
    const chatlist = [
        {
            chat: 'hello'
        }
    ]
    const chatlist2 = [
        {
            chat: 'hi'
        }
    ]

    const chatbutton = () => {

    }



    return (
        <>
            <TopNavbarAll_login link={`/dashboard/${user._id}`} navtitle='Contac US' />
            <div className="helpbody">
                <div className="chatbody">
                    {
                        chatlist.map((e) => {
                            return (
                                <>
                                    <div className="chatline">
                                        <div>
                                            Hello, How Can i help you?
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className="chatline">
                                        <div></div>
                                        <div>
                                            Hello
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="chatinput">
                    <input className="chatinp form-control" type='text' />
                    <button onClick={chatbutton} className="chaticon"><SendIcon /></button>
                </div>
            </div>


            {/* <BottomNavbar cssvalue='buttontap-2' uid={uid} /> */}
        </>
    );
}

export default Customer_Support;