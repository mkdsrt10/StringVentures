import React from 'react'
import Image from "next/image"
import styles from "../styles/disposeSample.module.css"
import CloseIcon from '@material-ui/icons/Close';

export default function disposeSample() {
    return (
        <div className={styles.add_samples_main}>
        <div className={styles.add_samples_title}>Dispose Sample
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
        <div className={styles.add_samples_sub_row}>
            <div className={styles.add_samples_sub_row_left}>
                <span className={styles.add_samples_label}>Dispose date</span>
                <input placeholder= "MM/DD/YY" className={styles.add_samples_input}/>
            </div>
            <div className={styles.add_samples_sub_row_right}>
                <span className={styles.add_samples_label}>Dispose to</span>
                <input className={styles.add_samples_input}/>
            </div>
        </div>
        <span className={styles.add_samples_label}>Dispose by (Optional)</span>
        <input placeholder="Administrator" className={styles.add_samples_input}/>
        <div className={styles.add_samples_sub_row}>
            <div className={styles.add_samples_sub_row_left}>
                <span className={styles.add_samples_label}>Disposal method</span>
                <input className={styles.add_samples_input}/>
            </div>
            <div className={styles.add_samples_sub_row_right}>
                <span className={styles.add_samples_label}>Disposed quantity</span>
                <input className={styles.add_samples_input}/>
            </div>
        </div>
        <button className={styles.add_samples_button}>Add to Cabinet</button>
    </div>
    )
}
