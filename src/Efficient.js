import styles from "../styles/Efficient.module.css";
import Image from "next/image";


export default function TechBox({text="", bold="", image="/apply.png"}){

    return (
        <div className={styles.mainbox}>
            <div className={styles.image}>
                <Image src={image} width={"180px"} height={"180px"}/>
            </div>
            <p>{text} <span>{bold}</span></p>
        </div>
    )
}
