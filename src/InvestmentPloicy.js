import styles from "../styles/Investment.module.css";
import Image from 'next/image';

const Investment = () => {
    return (
        <div className={styles.Investment_container}>
            <div className={styles.top_contianer_content}>
                <div className={styles.hero_subhead}>
                    We're the future
                </div>
                <div className={styles.hero_heading}>
                    We invest in the start-ups with <span>deep tech</span> focus.
                </div>
            </div>
            <div className={styles.tech_container}>
                <div className={styles.tech_wrap}>
                    <div className={styles.tech}>
                        <Image src={"/analytics_tech.png"} width={70} height={70} layout={"fixed"}/>
                        <h4>Artificial Intelligence</h4>
                        <p>
                            We love AI tool builders and those that leverage data streams to solve problems.
                        </p>
                    </div>
                </div>
                <div className={styles.tech_wrap}>
                    <div className={styles.tech}>
                        <Image src={"/calc_tech.png"} width={70} height={70} layout={"fixed"}/>
                        <h4>Cloud Computing</h4>
                        <p>
                            Technology that deliver the computing services on a large scale and do high-end computation.
                        </p>
                    </div>
                </div>
                <div className={styles.tech_wrap}>
                    <div className={styles.tech}>
                        <Image src={"/bit_tech.png"} width={70} height={70} layout={"fixed"}/>
                        <h4>Blockchain</h4>
                        <p>
                            Technology revolutionized the distributed ledger that records the provenance of a digital asset.
                        </p>
                    </div>
                </div>
                <div className={styles.tech_wrap}>
                    <div className={styles.tech}>
                        <Image src={"/ML_tech.png"} width={70} height={70} layout={"fixed"}/>
                        <h4>Machine Learning</h4>
                        <p>
                            Self-learning algorithms that execute tasks, or that substantially augment human intelligence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Investment;
