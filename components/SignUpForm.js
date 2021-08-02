import React from  "react";
import styles from "../styles/LoginForm.module.css"
import Image from 'next/image'
import {EMAIL_VALIDATOR, PHONE_VALIDATOR} from "../function/constants";

const SignUpForm =({error, setError, email, password, name, setphone, phone, confirmpassword, setemail, setpassword, setconfirmpassword, setname, signUp})=>{

    function checkFields(){
        if (!EMAIL_VALIDATOR.test(email)){
            setError("Email not valid")
        } else if (name.length < 3){
            setError("Name should be atleast 3 letter long")
        } else if (!PHONE_VALIDATOR.test(phone)){
            setError("Phone number not valid")
        } else if (password !== "" && password.length < 8){
            setError("Password not valid, must be atleast 8 letter long")
        } else if (password !== confirmpassword){
            setError("Passwords don't match. Please retype your passwords")
        } else {
            setError(null)
            signUp()
        }
    }

    return(
        <div className={styles.main_container}>
            <div className={styles.inner_container}>
                <div className={styles.input_fields}>
                    <div className={styles.logo}>
                        <Image src="/logo.png" layout={'intrinsic'} height={100} width={450}/>
                    </div>
                    <h1>Sign up</h1>
                     <input type="Name" placeholder="Name*" className ={styles.input} value={name}
                        onChange={(e)=> setname(e.target.value)} />
                    <input type="Email" placeholder="Email*" className ={styles.input} value={email}
                           onChange={(e)=> setemail(e.target.value)} />
                    <input type="Phone" placeholder="Phone*" className ={styles.input} value={"+1 "+phone}
                           onChange={(e)=> setphone(e.target.value.split("+1 ")[1]||"")} />
                    <input type="Password" placeholder="Password*" className ={styles.input} value={password}
                        onChange={(e)=> setpassword(e.target.value)}/>
                    <input type="Password" placeholder="Confirm Password*" className ={styles.input} value={confirmpassword}
                           onChange={(e)=> setconfirmpassword(e.target.value)}/>
                    {
                        error && <p className={styles.error}>{error}</p>
                    }
                   <button onClick={checkFields} type="Submit" className={styles.button}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;
