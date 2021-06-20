import styles from '../styles/Navbar.module.css'
import {useRouter} from "next/router";
import {useState} from "react";

export default function Navbar({clickhandler}) {
    const router=useRouter();
    const [nav, setnav] = useState(false);
    const handler = () => {
        setnav(!nav);
    };
    return (
        <div className={styles.container}>
            <div className={styles.logo}>String Ventures</div>
            <div className={styles.menu}>
                {/*<div onClick={() => {}}>Team</div>*/}
                <div>STUDIO</div>
                <div>Portfolio</div>
                <div>Resources</div>
            </div>
            <div className={styles.start_now} onClick={clickhandler}>
                <div className={styles.text} >
                    Partner with us
                </div>
            </div>
            <div
                className={nav == true ? styles.Hamburger_change : styles.Hamburger}
                onClick={handler}
            >
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            <div
                className={nav == true ? styles.nav_items_active : styles.nav_items_mobile}
            >
                {/*<div onClick={() => {}}>Team</div>*/}
                <div>STUDIO</div>
                <div>Portfolio</div>
                <div>Resources</div>
                <div className={styles.mobil} onClick={clickhandler}>
                    <div className={styles.text} >
                        Partner with us
                    </div>
                </div>
            </div>
        </div>
    )
}
