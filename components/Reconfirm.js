import React from  "react";
import styles from "../styles/LoginForm.module.css"
import Image from 'next/image'
import {EMAIL_VALIDATOR, PHONE_VALIDATOR} from "../function/constants";

const ForgotForm =({error, email, setemail, otpSent, otp, setOtp, confirmOTP, recieveOTP})=>{

    return(
        <div className={styles.main_container}>
            <div className={styles.inner_container}>
                <div className={styles.input_fields}>
                    <div className={styles.logo}>
                        <Image src="/logo.png" layout={'intrinsic'} height={100} width={450}/>
                    </div>
                    <h1>Confirm your account</h1>
                    <input disabled={otpSent} type="Username" placeholder="Email*" className ={styles.input} value={email}
                           onChange={(e)=> setemail(e.target.value)}/>
                    {
                        otpSent && <input type="otp" placeholder="OTP*" className ={styles.input} value={otp}
                               onChange={(e)=> setOtp(e.target.value)}/>
                    }
                    {
                        error && <p className={styles.error}>{error}</p>
                    }
                    <button onClick={otpSent?confirmOTP:recieveOTP} type="Submit" className={styles.button}>{otpSent?"Confirm OTP":"Recieve OTP"}</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotForm;
