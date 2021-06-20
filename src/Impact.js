import styles from "../styles/Impact.module.css";
import Image from "next/image"

const Impact = () => {
    return (
        <div className={styles.Impact_container}>
            <div className={styles.top_contianer_content}>
                <div className={styles.hero_subhead}>
                    We’re Making the change
                </div>
                <div className={styles.hero_heading}>
                    Companies that <span>trust us</span>.
                </div>
                <div className={styles.image}>
                    <Image src={"/hi_invest.png"} height={350} width={600}/>
                </div>
            </div>
            <div className={styles.top_contianer_content}>
                <div className={styles.image}>
                    <Image src={"/bdr_invest.png"} height={590} width={600}/>
                </div>
            </div>
        </div>
    );
};

export default Impact;
