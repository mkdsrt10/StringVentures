import styles from "../styles/Offile.module.css"
import Image from "next/image"

export default function Offline(){
    return (
        <div className={styles.main}>
            <Image src={"/desk.png"} width={250} height={250}/>
            <h1>You are offline.</h1>
        </div>
    )
}
