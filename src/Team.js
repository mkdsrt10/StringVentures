import styles from "../styles/Team.module.css";
import Image from "next/image"

const Team = () => {
    function applyNow(){

    }
    return (
        <div className={styles.Impact_container}>
            <div className={styles.Impact_cotent_conainer}>
                <div className={styles.top_contianer_content}>
                    <div className={styles.hero_subhead}>
                        STARTUP STUDIO
                    </div>
                    <div className={styles.hero_heading}>
                        Smart technology requires <br/> <span>smarter team</span>.
                    </div>
                    <div className={styles.border}/>
                    <p>
                        We provide a smart team to your start-ups who build your vision
                        to a working model. We’ve a team of developers, designers, marketers,
                        sales and management who want to make you a great success.
                    </p>
                </div>
            </div>
            <div className={styles.workTogether}>
                <div className={styles.text}>
                    <div className={styles.connect}>
                        Want to <span>build your company</span> with us?
                    </div>
                    <p>Lets work together.</p>
                </div>
                <div className={styles.button}>
                    <div style={{cursor:'pointer'}} onClick={applyNow}>
                        <Image src={"/apply.png"} width={500} height={500}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;
