import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.logo}>String Ventures</div>
                <div className={styles.copy}>
                    Copyright by 2021 | All Rights Reserved
                </div>
                <div className={styles.social}>
                    <img src={"/linkedin.svg"}/>
                    <img src={"/tw.svg"}/>
                </div>
            </div>
        </div>
    )
}
