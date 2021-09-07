import styles from "../styles/Impact.module.css";
const Impact = () => {
    return (
        <div className={styles.Impact_container}>
            <div className={styles.Impact_cotent_conainer}>
                <div className={styles.Impact_content_left}>
                    <div className={styles.Impact_content_left_title}>
                        Our stories from idea to impact.
                    </div>
                    <div className={styles.Impact_content_left_subtitle}>
                        Startups that got on board.
                    </div>
                    <div className={styles.Impact_content_right_mobile}></div>
                    <div className={styles.Impact_cotent_grid}>
                        At String Ventures, we are founders and operators first. We work with some of the most intrepid entrepreneurs
                        to build transformational companies. We engage early at the pre-seed and seed stage in areas of our thematic interest.
                    </div>
                </div>
                <div className={styles.Impact_content_right}></div>
            </div>
        </div>
    );
};

export default Impact;
