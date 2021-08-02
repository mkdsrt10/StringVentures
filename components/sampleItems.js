import styles from "../styles/dashboard.module.css";
import Image from "next/image";
import {useRouter} from "next/router";

export default function SampleItems({id, name, receivedQuantity, quantityOnHand, expiringIn}){
    const router = useRouter();
    return (
        <div onClick={() => {router.push("/samples/"+id)}} className={styles.sampleBox}>
            <div className={styles.leftSample}>
                <div className={styles.sampleHead}>
                    <Image src="/Frame.svg" width={20} height={20}/>
                    <p>{name}</p>
                </div>
                <div className={styles.sampleSummary}>
                    <div className={styles.sampleSummaryItem}>
                        <label>Total Quantity</label>
                        <p>{receivedQuantity}</p>
                    </div>
                    <div className={styles.sampleSummaryItem}>
                        <label>Quantity Left</label>
                        <p>{quantityOnHand}</p>
                    </div>
                </div>
            </div>
            <div className={styles.rightSample}>
                <div className={styles.exp_button}>
                    Expiring in {expiringIn} days
                </div>
                <p className={styles.timeAgo}>now</p>
            </div>
        </div>
    )
}
