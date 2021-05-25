import styles from "../styles/Investment.module.css";
const Investment = () => {
    return (
        <div className={styles.Investment_container}>
            <div className={styles.Investment_cotent_conainer}>
                <div className={styles.Investment_content_right}></div>
                <div className={styles.Investment_content_left}>
                    <div className={styles.Investment_content_left_title}>
                        We invest in TECH that'll eat the world.
                    </div>
                    <div className={styles.Investment_content_left_subtitle}>
                        Investment philosophy that paves our way
                    </div>
                    <div className={styles.Investment_content_right_mobile}></div>
                    <div className={styles.Investment_cotent_grid}>
                        We imagine a future driven by extraordinary machine intelligence that would define the world as we know it today.
                        We work with entrepreneurs who seek to leverage the power of AI/ML and disrupt the world across four paradigms.
                    </div>
                    <div className={styles.explore_more}>
                        Explore Details →
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investment;
