import styles from "../styles/vcvs.module.css";
import Image from "next/image";


export default function VCVS({head="Venture Capital", description="Already working on early-stage company?", message="partner with us", image="/apply.png"}){

    return (
        <div className={styles.mainbox}>
            <div className={styles.image}>
                <Image src={image} width={"200px"} height={"200px"}/>
            </div>
            <h1>{head}</h1>
            <p>{description}</p>
            <button>{message}</button>
        </div>
    )
}
