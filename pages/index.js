import {useState, useEffect} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from "../src/Navbar";
import TechBox from "../src/techbox";
import PartnerQuality from "../src/PartnerQuality";

export default function Home({resource}) {
    const [partner, setPartner] = useState(0);
    useEffect(() => {
        const interval = setTimeout(() => {
            setPartner((partner+1)%3)
            console.log("TIME", new Date(), partner)
        }, 4000)
        return () => {clearInterval(interval)}
    }, [partner]);
    function clickhandler(){

    }
    return (
        <div className={styles.Root}>
            <Head>
                <title>String Ventures | Investing in Technology Companies</title>
                <meta name="description" content="We are a venture capitol + venture studio, who want to improve the startup success rate in tech sector." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.mainContainer}>
                <Navbar clickhandler={clickhandler}/>
                <div className={styles.hero}>
                    <h1>We are early backers of <span>legendary</span> companies</h1>
                    <button>Partner with us</button>
                </div>
                <div className={styles.section}>
                    <h2>Technologies which will change the future</h2>
                    <div className={styles.techlist}>
                        <TechBox /><TechBox />
                        <TechBox /><TechBox />
                        <TechBox />
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>we partner with founder who</h2>
                    <div className={styles.scrollList}>
                        {
                            partner === 0 && <PartnerQuality />
                        }
                        {
                            partner === 1 && <PartnerQuality adj={"willing to"} main={"scale exponentially"}/>
                        }
                        {
                            partner === 2 && <PartnerQuality adj={"keeps"} main={"consumers at top"} />
                        }
                    </div>
                    <div className={styles.scrollListIndicator}>
                        <div onClick={() => setPartner(0)} className={styles.indicator} style={{backgroundColor: partner === 0 ? "#0D2573":""}}/>
                        <div onClick={() => setPartner(1)} className={styles.indicator} style={{backgroundColor: partner === 1 ? "#0D2573":""}}/>
                        <div onClick={() => setPartner(2)} className={styles.indicator} style={{backgroundColor: partner === 2 ? "#0D2573":""}}/>
                    </div>
                </div>
            </div>
            {/*<Footer />*/}
        </div>
    )
}

export async function getStaticProps({ params }) {

    // const res = await fetch(`https://.../data`)
    // const data = await res.json()

    return {
        props: {resource:[]},
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 5,
    }
}
