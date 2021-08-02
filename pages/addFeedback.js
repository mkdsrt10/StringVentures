import React from 'react'
import styles from "../styles/addFeedback.module.css"
export default function addFeedback() {
    return (
        <div className={styles.add_samples_main}>
        <div className={styles.add_samples_title}>Add Feedback
            <hr/>
        </div>
        <input placeholder="Write down the behavior of the patient..." className={styles.add_samples_input}/>
        
        <button className={styles.add_samples_button}>Add Feedback</button>
    </div>     
    )
}
