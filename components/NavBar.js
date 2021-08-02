import styles from "../styles/NavBar.module.css"
import Image from "next/image"
import {getDoctor} from "../function/doctor";
import {useEffect, useState} from "react";

const NavBar=({menu, setmenu, token})=>{
    const [ doctor, setDoctor ] = useState(null)
    useEffect(async () => {
        const doctorP = await getDoctor({token})
        setDoctor(doctorP)
        console.log("doctorP", doctorP)
    }, [token])
    return(
        <div className={styles.main_conatiner}>
            <div className={styles.logo}>
                <div className={styles.menu} onClick={() => setmenu(!menu)}>
                    {
                        // menu ?
                            // <Image src="/menu.svg" alt={"Menu"} layout={"fixed"} width={30} height={30}/>
                            // :
                            <Image src="/menu_green.svg" alt={"Menu"} layout={"fixed"} width={30} height={30}/>
                    }
                </div>
                <Image src="/logo.png" alt={"Logo"} width={191} height={50}/>
            </div>
            {/*<div className={styles.search}>*/}
                {/*<input type="text" placeholder="Search sample or patient..." className={styles.search_input}/>*/}
            {/*</div>*/}
            <div className={styles.nav_content}>
                {/*<Image src="/profile.png" width={60} height={40}/>*/}
                <span className={styles.span1}>{doctor && doctor.doctorName? doctor.doctorName:""}</span>
                {/*<Image src="/down.svg" width={15} height={15}/>*/}
            </div>
        </div>
    )
}

export default NavBar;
