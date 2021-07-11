import {useState, useEffect} from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from "../src/Navbar";
import TechBox from "../src/techbox";
import PartnerQuality from "../src/PartnerQuality";
import TechQ from "../src/TechQ";
import VCVS from "../src/Studio";
import Footer from "../src/Footer";
import Efficient from "../src/Efficient";

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
                    <h1>We are early backers of <h1><span>legendary</span> companies</h1></h1>
                    <button>Partner with us</button>
                </div>
                <div className={styles.section}>
                    <h2>Technologies which will change the future</h2>
                    <div className={styles.techlist}>
                        <TechBox image={"/ai.png"}/>
                        <TechBox tech={"3D Printing"} image={"/3d.png"}/>
                        <TechBox tech={"Machine Learning"} image={"/ml.png"}/>
                        <TechBox tech={"Blockchain"} image={"/blockchain.png"}/>
                        <TechBox tech={"Cloud Computing"} image={"/cc.png"}/>
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
                <div className={styles.section}>
                    <h2>our growing family</h2>
                    <div className={styles.techlist}>
                        <TechQ image={"/bdr.png"} head={"Buddy Dr. Rx."} description={"Helping physicians with compliance"}/>
                        <TechQ image={"/hi.png"} />
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>the two legs of <span>String Ventures</span></h2>
                    <div className={styles.techlist2}>
                        <VCVS left image={"/vc.png"}/>
                        <VCVS left={false} image={"/vs.png"} head={"Venture Studio"} message={"contact us"} description={"Want to build your company with us?"}/>
                    </div>
                </div>
                <div className={styles.section}>
                    <h2>here's how efficient we are</h2>
                    <div className={styles.techlist3}>
                        <div className={styles.efficientBox} style={{flex: 1}}>
                            <Efficient text={"respond in"} bold={"48 hrs"} image={"/time.png"} />
                            <Efficient text={"on our way to be"} bold={"legendary"} image={"/final.png"}/>
                        </div>
                        <div className={styles.efficientBox} style={{flex: 0.1}}>
                            <Image src={"/tonext1.png"} width={"30vw"} height={"30vw"} />
                            <Image src={"/tonext2.png"} width={"30vw"} height={"30vw"} />
                        </div>
                        <div className={styles.efficientBox} style={{flex: 1}}>
                            <Efficient text={"close the deal in"} bold={"7 days"} image={"/close.png"}/>
                        </div>
                    </div>
                    <div className={styles.techlist3Mobile}>
                        <div className={styles.efficientBox} style={{flex: 1}}>
                            <Efficient text={"respond in"} bold={"48 hrs"} image={"/time.png"} />
                            {/*<Image src={"/tonext1.png"} width={"10vw"} height={"50vw"} />*/}
                            <Efficient text={"close the deal in"} bold={"7 days"} image={"/close.png"}/>
                            {/*<Image src={"/tonext2.png"} width={"30vw"} height={"30vw"} />*/}
                            <Efficient text={"on our way to be"} bold={"legendary"} image={"/final.png"}/>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>If you're not sure your business fits with us, send it to us anyway. We'll let you know within 48 hours.</h3>
                    <button className={styles.getintouch}><span>Get in touch →</span></button>
                </div>
            </div>
            <Footer />
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
