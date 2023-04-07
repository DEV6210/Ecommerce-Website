import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import groovyWalkAnimation from './json_image/account-created-success.json';
import './css/SuccessfullyCreateAccount.css'
import { useNavigate } from 'react-router';

export default function SuccessfullyCreateAccount() {
    const navigate=useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/login')
        },4000)
    })
    return (
        <>
            <div className='lottie_success'>
                <div>
                    <Lottie animationData={groovyWalkAnimation} loop={false} />
                </div>
            </div>
        </>
    )
}
