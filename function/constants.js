export const PAGE_SIZE = 12;
export const CONTACT_EMAIL = ""
export const adminRoute = ["/admin/hil"];
export const nonAuthRoutes = ["/", "/login", "/signup", "/forgotpassword", "/offline", "/reconfirm"];
export const nonDashboardRoute = nonAuthRoutes+adminRoute;

export const adminUsers = ["dmayank0@gmail.com", "admin@buddydrrx.com"]

export const NOCORS = "https://heruko-nocors.herokuapp.com/"
export const BASE_BACKEND = "https://bye6meiro4.execute-api.us-east-2.amazonaws.com/live"
    // + process.env.NEXT_PUBLIC_ENVSTAGE

export const EMAIL_VALIDATOR = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const PHONE_VALIDATOR = /^\d{10}$/
export const PASSWORD_VALIDATOR = ""

export const compliance = {good: 6, bad: 0}
