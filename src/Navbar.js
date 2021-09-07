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
                <a target="_blank" href={"mailto:partners@stringventures.ai"}>
                    {/*Email*/}
                    &nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                         className="feather feather-mail">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>
                {/*<div>About us</div>*/}
                {/*<div>Resources</div>*/}
            </div>
        </div>
    )
}
