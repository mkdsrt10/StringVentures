import styles from "../styles/techQ.module.css";
import Image from "next/image";

export default function TechQ({image="/apply.png", head="HealthIntel", description="Predictive health company"}){

    return (
        <div className={styles.main}>
            <div className={styles.mainbox}>
                <div className={styles.image}>
                    <Image src={image} width={"200px"} height={"200px"}/>
                </div>
                <div className={styles.imageMobile}>
                    <Image src={image} width={"100px"} height={"100px"}/>
                </div>
                <div className={styles.about}>
                    <h1>{head}</h1>
                    <p>{description}</p>
                    <button>Learn more →</button>
                </div>
            </div>
        </div>
    )
}
