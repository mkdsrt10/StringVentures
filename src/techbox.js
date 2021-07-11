import styles from "../styles/techbox.module.css";
import Image from "next/image";


export default function TechBox({tech="Artificial Intelligence", image="/apply.png"}){

    return (
        <div className={styles.mainbox}>
            <div className={styles.image}>
                <Image src={image} width={"150px"} height={"150px"}/>
            </div>
            <p>{tech}</p>
        </div>
    )
}
