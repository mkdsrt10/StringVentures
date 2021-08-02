import LoginForm from "../components/LoginForm"
import {useState} from "react";
import {signIn} from "../function/checkAuth";
import {useRouter} from "next/router";

const Login=({token, setToken})=>{
    const router = useRouter()
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    async function signInF(){
        const err = await signIn({email, password, token, setToken});
        setisLoading(false);
        if (err && err.code==="UserNotConfirmedException"){
            await router.push("/reconfirm");
        } else if (err){
            setError(err.message);
        } else {
            setError("");
        }
    }

    return(
        <LoginForm setisLoading={setisLoading} isLoading={isLoading} error={error} signIn={signInF} email={email} setemail={setemail} password={password} setpassword={setpassword}/>
    )
}

export default Login;
