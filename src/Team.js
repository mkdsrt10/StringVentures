import styles from "../styles/Team.module.css";
const Team = () => {
    return (
        <div className={styles.Impact_container}>
            <div className={styles.Impact_cotent_conainer}>
                <div className={styles.Impact_content_left}>
                    <div className={styles.Impact_content_left_title}>
                        Smart technology needs smarter team.
                    </div>
                    <div className={styles.Impact_content_left_subtitle}>
                        People who amplify companies over their lifespan.
                    </div>
                    <div className={styles.Impact_content_right_mobile}></div>
                    <div className={styles.Impact_cotent_grid}>
                        Startups need more than capital to build and scale companies. We nurture an environment full of unfair advantages.
                        We muster the smartest resources to catalyse your journey with our combined experience and network.
                    </div>
                </div>
                <div className={styles.Impact_content_right}></div>
            </div>
        </div>
    );
};

export default Team;
