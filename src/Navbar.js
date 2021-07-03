import styles from '../styles/Navbar.module.css'

export default function Navbar({clickhandler}) {

    return (
        <div className={styles.container}>
            <div className={styles.logo}>String Ventures</div>
            <div className={styles.start_now} onClick={clickhandler}>
                <div className={styles.text} >
                    Partner with us
                </div>
            </div>
        </div>
    )
}
