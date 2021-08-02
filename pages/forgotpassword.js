import {useState} from "react";
import {forgotPasswordSubmit, recieveForgotOTP, signIn} from "../function/checkAuth";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const Forgot=({token, setToken})=>{
    const [email, setemail] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [error, setError] = useState("")

    async function recieveOTPF(){
        const err = await recieveForgotOTP({email})
        if (err === null){
            setOtpSent(true)
        }
        setError(err)
    }

    async function confirmOTPF(){
        const err = await forgotPasswordSubmit({email, otp, password})
        if (err === null){
            await signIn({email, password, token, setToken})
        }
        setError(err)
    }

    return(
        <ForgotPasswordForm password={password} setpassword={setpassword} email={email} setemail={setemail} confirmpassword={confirmpassword}
                            setError={setError} setConfirmPassword={setConfirmPassword}
                            recieveOTP={recieveOTPF} otp={otp} setOtp={setOtp} otpSent={otpSent} error={error} confirmOTP={confirmOTPF}/>
    )
}

export default Forgot;
