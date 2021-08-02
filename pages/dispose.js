import React from 'react'
import styles from "../styles/dispose.module.css"
import Image from  "next/image"
export default function dispose() {
    return (
        <div className={styles.add_samples_main}>
            <Image src="/dispose.svg" width={180} height={180}/>
        <div className={styles.add_samples_title}>Disposed Successfully!</div>
        <div className={styles.add_samples_input_add}>
            <Image src="/Frame.svg" width={20} height={20}/>
            <span>Duoresp Spiromax</span>
            <div className={styles.dispose_sample}>
                <div className={styles.content}>
                        <span className={styles.heading}>Lot#</span>
                        <span className={styles.value}>DuroESP01</span>
                    </div>
                    <div className={styles.contents}>
                        <span className={styles.heading}>Quantity disposed</span>
                        <span className={styles.value}>10</span>
                    </div>
            </div>
            <div className={styles.dispose_sample}>
                <div className={styles.content}>
                        <span className={styles.heading}>Quantity left</span>
                        <span className={styles.value}>30</span>
                    </div>
            </div>
        </div>

        <button className={styles.add_samples_button}>Add to Cabinet</button>
    </div>

    )
}
