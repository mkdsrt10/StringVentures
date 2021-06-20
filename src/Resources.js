import styles from "../styles/Resources.module.css";

const Resources = ({resource=[]}) => {
    return (
        <div className={styles.Resources_container}>
            <div className={styles.Resources_cotent_conainer}>
                <div className={styles.Resources_content_left_title}>
                    Resources
                </div>
                <div className={styles.Resources_row}>
                    {
                        resource.map((res, i) => {
                            return (
                                <div key={i} className={styles.Resources_container_resource}>
                                    <img height={200} width={320} src={"/thumb_article1.jpeg"}/>
                                    <div className={styles.Resources_content_date}>May 26, 2021</div>
                                    <div className={styles.Resources_content_title}>Blockchain is the future.</div>
                                    <div className={styles.Resources_content_left_subtitle}>
                                        Beberapa waktu lalu saya membuat eksplorasi design pitch deck atau design slide presentasi.
                                        Saya tertarik membuat design presentasi yang bersih, mudah dibaca dan memiliki layout yang unik.
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Resources;
