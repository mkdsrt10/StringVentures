import React from  "react";
import styles from "../styles/LoginForm.module.css"
import Image from 'next/image'
import {EMAIL_VALIDATOR, PHONE_VALIDATOR} from "../function/constants";

const ForgotForm =({error, setError, confirmpassword, setConfirmPassword, password, setpassword, email, setemail, otpSent, otp, setOtp, confirmOTP, recieveOTP})=>{

    function checkFields(){
        if (!EMAIL_VALIDATOR.test(email)){
            setError("Email not valid")
        } else if (password !== "" && password.length < 8){
            setError("Password not valid, must be atleast 8 letter long")
        } else if (password !== confirmpassword){
            setError("Passwords don't match. Please retype your passwords")
        } else {
            setError(null)
            confirmOTP()
        }
    }

    return(
        <div className={styles.main_container}>
            <div className={styles.inner_container}>
                <div className={styles.input_fields}>
                    <div className={styles.logo}>
                        <Image src="/logo.png" layout={'intrinsic'} height={100} width={450}/>
                    </div>
                    <h1>Reset your password</h1>
                    <input disabled={otpSent} type="Username" placeholder="Email*" className ={styles.input} value={email}
                           onChange={(e)=> setemail(e.target.value)}/>
                    {
                        !otpSent && <input type="Password" placeholder="Password*" className ={styles.input} value={password}
                                          onChange={(e)=> setpassword(e.target.value)}/>
                    }
                    {
                        !otpSent && <input type="Password" placeholder="Confirm Password*" className ={styles.input} value={confirmpassword}
                                           onChange={(e)=> setConfirmPassword(e.target.value)}/>
                    }
                    {
                        otpSent && <input type="otp" placeholder="OTP*" className ={styles.input} value={otp}
                               onChange={(e)=> setOtp(e.target.value)}/>
                    }
                    {
                        error && <p className={styles.error}>{error}</p>
                    }
                    <button onClick={otpSent?checkFields:recieveOTP} type="Submit" className={styles.button}>{otpSent?"Confirm OTP":"Recieve OTP"}</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotForm;
