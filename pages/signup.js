import {useState} from "react";
import {confirmSignUp, signIn, signUp} from "../function/checkAuth";
import SignUpForm from "../components/SignUpForm";
import OTPForm from "../components/OtpScreen";
import {createDoctorProfile} from "../function/doctor";

const SignUp=({token, setToken})=>{
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [phone, setphone] = useState("")
    const [error, seterror] = useState(null)
    const [otpScreen, setOtpScreen] = useState(false)
    const [otp, setOtp] = useState("");

    async function createDoctor(tokenF){
        setToken(tokenF)
        await createDoctorProfile({token:tokenF,doctor:{
                doctorName:name,
                doctorEmailId: email,
                doctorMobileNo: phone,
                doctorHospital:"BuddyDr"
            }})
    }

    async function signUpF(){
        const erro = await signUp({email, phone:"+1"+phone, password, token, setToken})
        if (erro === null){
            setOtpScreen(true);
        }
        seterror(erro)
    }
    async function confirmSignUpF(){
        const erro = await confirmSignUp({email, otp, token, setToken})
        if (erro === null){
            await signIn({email, password, token, setToken:createDoctor})
        }
        seterror(erro)
    }
    if (otpScreen){
        return <OTPForm otp={otp} email={email} setOtp={setOtp} confirmSignUp={confirmSignUpF}/>
    } else {
        return (
            <SignUpForm name={name} setname={setname} confirmpassword={confirmpassword} setconfirmpassword={setconfirmpassword}
                        setphone={setphone} phone={phone} error={error} setError={seterror}
                        signUp={signUpF} email={email} setemail={setemail} password={password} setpassword={setpassword}/>
        )
    }
}

export default SignUp;
