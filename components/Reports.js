import React from 'react'
import styles from "../styles/reports.module.css"
import Image from "next/image"
import {useRouter} from "next/router";
export default function Reports({redirectTo="/samples?modeQ=0", icon="/warn.svg",content="Units expiring in 60 days",heading="200"}) {
    const router = useRouter();
    function redirect(){
        router.push(redirectTo).then(r => {})
    }
    return (
        <div onClick={redirect} className={styles.report_card}>
            <div className={styles.report_head}>
                <Image src={icon} width={40} height={40}/>
                <span className={styles.content}>{content}</span>
            </div>
            <div className={styles.details}>
                <h1 className={styles.heading}>{heading}</h1>
            </div>
        </div>
    )
}
