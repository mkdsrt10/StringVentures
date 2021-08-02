import NavBar from '../components/NavBar'
import {nonDashboardRoute} from "../function/constants";
import {useRouter} from "next/router";
import LeftNav from "./LeftNav";
import styles from "../styles/NavBar.module.css"
import Head  from 'next/head'
import {useState} from "react";

const Layout=({children, token})=>{
    const router = useRouter();

    const [menu, setmenu] = useState(false)

    return(
        <div className={styles.SuperbodyPart}>
            {!nonDashboardRoute.includes(router.pathname)&&<NavBar token={token} menu={menu} setmenu={setmenu}/>}
            <div className={styles.bodyPart} style={{height: !nonDashboardRoute.includes(router.pathname)?"88vh":"100%"}}>
                <Head>
                    <link
                        rel="preload"
                        as="font"
                        href="/fonts/PlusJakarta_Sans-2.5/static/PlusJakartaSans-Regular.ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/PlusJakarta_Sans-2.5/static/PlusJakartaSans-Medium.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <title>Buddy Dr. Rx.</title>
                    <link rel="manifest" href="/manifest.json"/>

                    <meta name="mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="application-name" content="BuddyDrRx"/>
                    <meta name="apple-mobile-web-app-title" content="BuddyDrRx"/>
                    <meta name="theme-color" content="#0db1a1"/>
                    <meta name="msapplication-navbutton-color" content="#0db1a1"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
                    <meta name="msapplication-starturl" content="/login"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                    <link rel="icon" sizes="192x192" href="/PWA_LOGO_192.png"/>
                    <link rel="apple-touch-icon" sizes="192x192" href="/PWA_LOGO_192.png"/>
                    <link rel="icon" sizes="512x512" href="/PWA_LOGO_512.png"/>
                    <link rel="apple-touch-icon" sizes="512x512" href="/PWA_LOGO_512.png"/>
                </Head>
                {!nonDashboardRoute.includes(router.pathname)&&<LeftNav token={token} menu={menu} setmenu={setmenu} />}
                <div className={styles.bodyPartScroll}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
