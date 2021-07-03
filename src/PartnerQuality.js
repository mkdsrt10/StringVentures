import styles from "../styles/partnerquality.module.css";

export default function PartnerQuality({adj="have", main="courage"}){

    return (
        <div className={styles.main}>
            <div className={styles.mainbox}>
                <div>
                    <h3>{adj}</h3>
                    <h1>{main}</h1>
                </div>
            </div>
        </div>
    )
}
