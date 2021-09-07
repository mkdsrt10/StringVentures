import styles from "../styles/WorkTogether.module.css";

const WorkTogether = ({clickhandler}) => {
    return (
        <div className={styles.WorkTogether_container}>
            <div className={styles.WorkTogether_cotent_conainer}>
                <div className={styles.WorkTogether_content_left_title}>
                    Let’s work together!
                </div>
                <div className={styles.WorkTogether_content_left_subtitle}>
                    We’ll be pleased to talk to you and listen to your ideas. You’re few pixels away from getting funding.
                </div>
                <div className={styles.start_now} onClick={clickhandler}>
                    <div className={styles.text} >
                        Apply Now
                    </div>
                </div>
                <img style={{marginTop: "5rem"}} src={"/work.png"}/>
            </div>
        </div>
    );
};

export default WorkTogether;
