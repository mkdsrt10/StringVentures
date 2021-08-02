import React from 'react'
import styles from "../styles/recentPatient.module.css"
import {useRouter} from "next/router";

export default function RecentPatient({id="1", name="Jane Cooper",contact="(405) 555-0128", quantity="", dosage="",time="2h ago"}) {
    const router = useRouter();

    return (
        <div onClick={() => {router.push("/dispense/"+id)}} className={styles.recent_patient_card}>
            <div className={styles.top_div}>
                {name}
                <span>{time}</span>
            </div>
            <div className={styles.recent_patient_bottom}>
                {/*<div className={styles.recent_patient_bottom_left} ><h2>Contact</h2>{contact}</div>*/}
                <div className={styles.recent_patient_bottom_left} ><h2>Dosage</h2>{dosage}</div>
                <div className={styles.recent_patient_bottom_right} ><h2>Quantity</h2>{quantity}</div>
            </div>
        </div>
    )
}
