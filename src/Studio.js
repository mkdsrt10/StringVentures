import styles from "../styles/vcvs.module.css";
import Image from "next/image";


export default function VCVS({left= true, head="Venture Capital", description="Already working on early-stage company?", message="partner with us", image="/apply.png"}){

    return (
        <div className={styles.mainbox} style={{margin: left?"0 2rem 0 0":"0 0 0 2rem"}}>
            <div className={styles.image}>
                <Image src={image} width={"200px"} height={"200px"}/>
            </div>
            <h1>{head}</h1>
            <p>{description}</p>
            <button>{message}</button>
        </div>
    )
}
