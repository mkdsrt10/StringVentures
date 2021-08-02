import React from 'react'
import styles from "../styles/latestUpdate.module.css"
import Image from "next/image"
export default function LatestUpdate({link="", image="/rect1.svg",content="COVID-19 Global & USA Wearable Medical Devices Market",time="3 hours ago"}) {
    function redirectToNews(){
        window.open(link, "_blank")
    }
    return (
        <div className={styles.latest_update}>
            <Image src={image} width={120} height={120}/>
            <div className={styles.details}>
                <h2 className={styles.heading}>{content}</h2>
                {/*<span className={styles.time}>{time}</span>*/}
            </div>
        </div>
    )
}
