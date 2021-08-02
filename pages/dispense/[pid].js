import styles from "../../styles/sampleDetails.module.css"
import Image from "next/image"
import {useRouter} from "next/router";
import {getSamplesFromId} from "../../function/samples";
import {getPatientFromId} from "../../function/disbursment";
import {useEffect, useState} from "react";
import {formateIncomingDate} from "../../function/dateFunction";
import AddPatients from "../../components/AddPatients";
import {Modal} from "@material-ui/core";

const SampleDetails=({token})=>{
    const router = useRouter()
    const { pid } = router.query
    const [patient, setPatient] = useState(null);

    const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false)

    useEffect(async () => {
        const patientL = await getPatientFromId({token, id:pid})
        if (patientL)
            setPatient(patientL)
    }, [token, pid])

    function editDetails(){
        setAddPatientsModalVisible(true)
    }

    return(
        <div className={styles.main}>
            <Modal open={addPatientsModalVisible} onClose={()=>{setAddPatientsModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddPatients onClose={()=>{setAddPatientsModalVisible(false)}} update={true} patient={patient} token={token}/>
            </Modal>
            <div className={styles.full}>
                <div onClick={() => router.back()} className={styles.back}>
                    <Image src="/left.svg" width={18} height={18}/>
                    <p>Back</p>
                </div>
                <div className={styles.headBar}>
                    <div className={styles.span0}>
                        <span>Dispense Details</span>
                        <span className={styles.semiBorderBottom}/>
                    </div>
                </div>
                <div className={styles.bodyP}>
                    <div className={styles.SS}>
                        <div className={styles.sampleBox}>
                            <div className={styles.sampleHead}>
                                <Image src="/patientDetail.svg" width={35} height={35}/>
                                <p>{patient ? patient.patientName:""}</p>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.detailItem}>
                                    <label>Dosage provided</label>
                                    <p>{patient ? patient.medicationName:""}</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <label>Dosage quantity</label>
                                    <p>{patient ? patient.disburementQuantity:""}</p>
                                </div>
                                <div className={styles.detailItem}>
                                    <label>Date dispensed</label>
                                    <p>{patient ? formateIncomingDate(patient.CreatedAt):"Jan 12, 2021"}</p>
                                </div>
                                {/*<div className={styles.detailItem}>*/}
                                {/*    <label><Image width={15} height={15} src={"/phone.svg"}/>&nbsp; Phone</label>*/}
                                {/*    <p>{patient ? patient.patientMobileNo:""}</p>*/}
                                {/*</div>*/}
                                {/*<div className={styles.detailItem}>*/}
                                {/*    <label><Image width={15} height={15} src={"/note.svg"}/>&nbsp;Note</label>*/}
                                {/*    <p style={{fontWeight: 300, fontSize: "1rem"}}>{patient ? patient.patientNote:""}</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={editDetails} className={styles.button_up}>Edit details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SampleDetails;
