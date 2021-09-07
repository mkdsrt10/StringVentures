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
                <a target="_blank" href={"mailto:partners@stringventures.ai"}>partners@stringventures.ai</a>
                {/*<div>About us</div>*/}
                {/*<div>Resources</div>*/}
            </div>
        </div>
    )
}
