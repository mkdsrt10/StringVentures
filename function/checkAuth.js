import {Auth} from "aws-amplify";

export async function checkAuth({token, setToken}) {
    try {
        const user = await Auth.currentAuthenticatedUser();
        console.log('user:', user)
        if (user) {
            setToken(user.getSignInUserSession().getIdToken().getJwtToken());
        } else {
            setToken(null)
        }
    } catch (e){
        console.log('error:', e)
        setToken(null)
    }
}

export async function signIn({email, password, token, setToken}) {
    try {
        await Auth.signIn(email, password);
        /* Once the user successfully signs in, update the form state to show the signed in state */
        await checkAuth({token, setToken})
        return null
    } catch (err) {
        console.log({ err });
        return err
    }
}

export async function signUp({email, phone, password, token, setToken}) {
    try {
        await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: phone
            }
        });
        /* Once the user successfully signs in, update the form state to show the signed in state */
        // await checkAuth({token, setToken})
        return null
    } catch (err) {
        console.log({ err });
        return err.message
    }
}

export async function confirmSignUp({email, otp, token, setToken}) {
    try {
        await Auth.confirmSignUp(email, otp);
        /* Once the user successfully signs in, update the form state to show the signed in state */
        // await checkAuth({token, setToken})
        return null
    } catch (err) {
        console.log({ err });
        return err.message
    }
}

export async function recieveOTP({email}) {
    try {
        await Auth.resendSignUp(email);
        /* Once the user successfully signs in, update the form state to show the signed in state */
        // await checkAuth({token, setToken})
        return null
    } catch (err) {
        console.log({ err });
        return err.message
    }
}

export async function recieveForgotOTP({email}) {
    try {
        await Auth.forgotPassword(email);
        /* Once the user successfully signs in, update the form state to show the signed in state */
        // await checkAuth({token, setToken})
        return null
    } catch (err) {
        console.log({ err });
        return err.message
    }
}

export async function forgotPasswordSubmit({email, otp, password}) {
    try {
        await Auth.forgotPasswordSubmit(email, otp, password);
        /* Once the user successfully signs in, update the form state to show the signed in state */
        // await checkAuth({token, setToken})
        return null
    } catch (err) {
        console.log({ err });
        return err.message
    }
}

export async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
