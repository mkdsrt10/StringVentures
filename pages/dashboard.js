import styles from "../styles/dashboard.module.css"
import Image from "next/image"
import Link from "next/link"
import RecentPatient from "../components/RecentPatient"
import Reports from "../components/Reports"
import LatestUpdate from "../components/LatestUpdate"
import SampleItems from "../components/sampleItems";
import {CONTACT_EMAIL, compliance} from "../function/constants";
import {getExpiringSamples} from "../function/samples";
import {useEffect, useState} from "react";
import {expiringFunction, timeGone} from "../function/dateFunction";
import {getDisburement} from "../function/disbursment";
import {getReports} from "../function/doctor";

const Dashboard=({token})=>{
    const [expiringSoon, setexpiringSoon] = useState([])
    useEffect(async () => {
        const data = await getExpiringSamples({token});
        setexpiringSoon(data && data.slice(0,5))
    }, [token])

    const [recentPatients, setrecentPatients] = useState([])
    useEffect(async () => {
        const data = await getDisburement({token});
        setrecentPatients(data)
    }, [token])

    const [reports, setResports] = useState({soonExpiring:"", expiredButNotDisposed:"", remaining:""})
    useEffect(async () => {
        const data = await getReports({token});
        if (data){
            setResports(data)
        }
    }, [token])
    return(
    <div className={styles.main}>
        <div className={styles.left}>
            <div className={styles.span0}>
                <span >Expiring Soon</span>
                <span className={styles.semiBorderBottom}/>
            </div>
            <div className={styles.left_top}>
                {
                    (expiringSoon||[]).map(sample => {
                        return (
                            <SampleItems id={sample.ID} name={sample.medicationName} expiringIn={expiringFunction(sample.expiryDate)} quantityOnHand={sample.quantityOnHand} receivedQuantity={sample.receivedQuantity} />
                        )
                    })
                }
            </div>
            <div className={styles.span0}>
                <span>Recent Disbursement</span>
                <span className={styles.semiBorderBottom}/>
            </div>
            <div className={styles.left_top}>
                {
                    (recentPatients||[]).map(patients => {
                        return (
                            <RecentPatient quantity={patients.disburementQuantity} id={patients.ID} name={patients.patientName} contact={patients.patientMobileNo} dosage={patients.medicationName} time={timeGone(patients.CreatedAt)}/>
                        )
                    })
                }
            </div>
{/*//             <div className={styles.assist_card}>*/}
{/*//                 <Image src="/desk.png" width={"auto"} height={280}/>*/}
{/*//                 <div className={styles.assist_details}>*/}
{/*//                     <h1>Need any assistance?</h1>*/}
{/*//                     <span>Facing any issue or want to know more about our service</span>*/}
{/*//                     <button onClick={() => {window.open("mailto:"+CONTACT_EMAIL, "_blank")}} className={styles.button}>Contact us</button>*/}
{/*//                     <span>We’ll get back to you in 24 hr</span>*/}
{/*//                 </div>*/}
{/*//             </div>*/}
        </div>

        <div className={styles.right}>
            <div className={styles.span0}>
                <span>Compliance</span>
                <span className={styles.semiBorderBottom}/>
            </div>
            <div className={styles.right_top}>
                <div className={styles.overallscore}>
                    <p className={styles.overallscoreText}>OVERALL SCORE</p>
                    <div className={styles.overallscoreScoreBox}>
                        <p className={styles.overallscoreScoreText}>{Math.round((100*(2*compliance.good+compliance.bad))/(2*compliance.good+2*compliance.bad))}%</p>
                    </div>
                </div>
                <Reports icon={"/thump.svg"} content={"Compliant"} heading={compliance.good}/>
                <Reports icon={"/not-compliant.png"} content={"Needs review"} heading={compliance.bad}/>
                <Link href={"/compliance"}><a href={"/compliance"} className={styles.seedetails}>See details</a></Link>
            </div>
            <div className={styles.span0}>
                <span>Reports</span>
                {/*<span>Sample units</span>*/}
                <span className={styles.semiBorderBottom}/>
            </div>
            <div className={styles.right_top}>
                <Reports redirectTo={"/samples?modeQ=1"} icon={"/warn.svg"} content={"Units expired but not disposed"} heading={reports.expiredButNotDisposed} />
                <Reports redirectTo={"/samples?modeQ=3"} icon={"/bin.svg"} heading={reports.soonExpiring}/>
                <Reports redirectTo={"/samples?modeQ=0"} icon={"/thump.svg"} content={"Remaining units"} heading={reports.remaining}/>
            </div>
            <div className={styles.latestUpdate}>
                <div className={styles.span0}>
                    <span>Latest Updates</span>
                    <span className={styles.semiBorderBottom}/>
                </div>
                <div className={styles.right_bottom}>
                    <LatestUpdate image={"/rect4.svg"} content={"MPG is going live with  the 'Virtual Pharma Cabinet' functionality by Jul 19th"} />
                </div>
            </div>
        </div>
    </div>
    )
}

export default Dashboard;
