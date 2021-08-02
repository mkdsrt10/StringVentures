import React from  "react";
import {useState} from "react";
import styles from "../styles/LoginForm.module.css"
import Image from 'next/image'
import Link from "next/link";
import CircularProgress from '@material-ui/core/CircularProgress';



const LoginForm =({setisLoading, isLoading, email, error, setemail, password, setpassword, signIn})=>{

    const signingLoading =()=>{
        setisLoading(true);
        signIn();
    }

    return(
        <div className={styles.main_container}>
            <div className={styles.inner_container}>
                <div className={styles.input_fields}>
                    <div className={styles.logo}>
                        <Image src="/logo.png" layout={'intrinsic'} height={100} width={450}/>
                    </div>
                    <h1>Login</h1>
                     <input type="Username" placeholder="Email*" className ={styles.input} value={email}
                        onChange={(e)=> setemail(e.target.value)} />
                    <input type="Password" placeholder="Password*" className ={styles.input} value={password}
                        onChange={(e)=> setpassword(e.target.value)}/>
                        <div className={styles.bottom_container}>
                            <div className={styles.remember}>
                                <input type="checkbox"></input>
                                <span >Remember me</span>
                            </div>
                            <Link href={"/forgotpassword"}><a className={styles.a}>Forgot password ?</a></Link>
                        </div>
                        {
                            error !== "" && <p className={styles.error}>{error}</p>
                        }
                        { !isLoading && ( <button onClick={signingLoading} type="Submit" className={styles.button}>
                            Login</button>)
                        }
                        { isLoading &&  (<button onClick={signingLoading} type="Submit" className={styles.button} disabled>
                            <CircularProgress size={20} color="white" disableShrink />
                            </button>)
                        }
                    <Link href={"/signup"}><a><p>Not have an account? Create one by clicking here.</p></a></Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
