import React from 'react'
import styles from "../styles/dispenseSample.module.css"
import Image from "next/image";

export default function dispenseSample() {
    return (
        <div className={styles.add_samples_main}>
        <div className={styles.add_samples_title}>Dispense Sample
            <hr/>
        </div>
        <div className={styles.add_samples_input_add}>
            <Image src="/Frame.svg" width={20} height={20}/>
            <span>Duoresp Spiromax</span>
            <div className={styles.dispose_sample}>
                <div className={styles.content}>
                        <span className={styles.heading}>Lot#</span>
                        <span className={styles.value}>DuroESP01</span>
                    </div>
                    <div className={styles.contents}>
                        <span className={styles.heading}>Quantity left</span>
                        <span className={styles.value}>40</span>
                    </div>
            </div>
        </div>
        <span className={styles.add_samples_label}>Receiving patient</span>
        <input placeholder="Search sample" className={styles.add_samples_input}/>
        <span className={styles.add_samples_label}>Additional details</span>
        <input  className={styles.add_samples_input_additional}/>

        <div className={styles.add_samples_sub_row}>
            <div className={styles.add_samples_sub_row_left}>
                <span className={styles.add_samples_label}>Disbursement date</span>
                <input placeholder= "MM/DD/YY" className={styles.add_samples_input}/>
            </div>
            <div className={styles.add_samples_sub_row_right}>
                <span className={styles.add_samples_label}>Disbursed quantity</span>
                <input className={styles.add_samples_input}/>
            </div>
        </div>
        <span className={styles.add_samples_label}>Disbursed by (Optional)</span>
        <input  placeholder=" Administrator" className={styles.add_samples_input}/>

        <button className={styles.add_samples_button}>Dispense</button>
    </div>
    )
}
