import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

import Lottie from "lottie-react";
import groovyWalkAnimation from '../../components/json_image/134704-cancel.json';
import './css/ordersuccess.css'
import { apiurl } from "../../services/api";

const OnlinePaymentCancel = () => {
    const navigate = useNavigate()



    const { id, uid } = useParams()
    // console.log(uid)
    // check params id 
    const [user, setUser] = useState('')
    const userid = user._id
    // user params -------------
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



    // display single product -------------
    const [viewProduct, setviewProduct] = useState([])
    const getProduct = async () => {
        const getResult = await fetch(`${apiurl}/viewProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify({
                id
            })
        })
        var viewResult = await getResult.json()
        // console.log(product)
        if (viewResult === 'error') {
            // console.log('worng params')
            navigate(`/wrongparams/${id}`)

        } else {
            setviewProduct(viewResult)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const { _id, image, name, desc, seles_price, inr_off, p_off_discount, original_price } = viewProduct;
    const pid = _id;

    useEffect(() => {
        setTimeout(() => {
            navigate(`/buyproduct/${pid}/${uid}`)
        }, 3000)
    })

    return (
        <>
            <div className="ordsuccress">
                <Lottie animationData={groovyWalkAnimation} loop={false} className='ordersuccessimage' />
            </div>
            <div className="ordsuccress2">
            <b className="ordcnf">Order Conformed</b>
            </div>
        </>
    );
}

export default OnlinePaymentCancel;