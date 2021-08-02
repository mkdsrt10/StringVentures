import styles from '../styles/compliance.module.css'
import Image from "next/image"

export default function ComplianceCard({name="FDA", head="U.S. Food & Drug Administration - Compliance Policy Guide",
                                           law="FDA CPG Sec 400.900", lawname="Class I Recalls of Prescription Drugs", details={
    details:"When there is a Class I recall of a prescription drug, retail level consignees (retail, hospital, nursing home\n" +
        "                        pharmacists) will be required to review their prescription files for the appropriate time period consistent with the\n" +
        "                        period of distribution of the drug, in order to identify all customers to whom the recalled drug was dispensed.",
    penalty:[
    "Up to $100,000 for a misdemeanor by an individual that does not result in death.",
    ]}, compliant=true}){
    return (
        <div className={styles.card}>
            <div className={styles.details}>
                <div className={styles.heading}>
                    <h1>{name}</h1>
                    {/*<span>.</span>*/}
                    <p>{head}</p>
                </div>
                <div className={styles.subheading}>
                    <p>{lawname} - {law}</p>
                </div>
                <div className={styles.text}>
                    <p>{details.details}</p>
                </div>
                <div className={styles.penalty}>
                    <h4>PENALTY</h4>
                    <ul>
                        {
                            details.penalty.map(penalty => {
                                    return <li>- {penalty}</li>
                                }
                            )
                        }
                    </ul>
                    {
                        details.penalty.length === 0 && <li>N/A</li>
                    }
                </div>
            </div>
            <div className={styles.compliant} style={{backgroundColor:compliant?"#21B867":"#ffd835"}}>
                {
                    compliant?
                        <Image src={"/check-circle.svg"} height={50} width={50}/>
                        :
                        <Image src={"/minus-circle.svg"} height={50} width={50}/>
                }
            </div>
            <div className={styles.compliantMobile} style={{backgroundColor:compliant?"#21B867":"#ffd835"}}>
                {
                    compliant?
                        <Image src={"/check-circle.svg"} height={30} width={30}/>
                        :
                        <Image src={"/minus-circle.svg"} height={30} width={30}/>
                }
            </div>
        </div>
    )
}
