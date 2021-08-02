import styles from "../styles/addPatients.module.css"
import {useEffect, useState} from "react"
import {getUsableSamples} from "../function/samples";
import {createDisburement, quantiyOnHand, updateDisburement} from "../function/disbursment";
import Select from "react-select";
import {useRouter} from "next/router";
import {expiringFunction, formateIncomingDate} from "../function/dateFunction";

const AddPatients=({token, onClose, patient={patientNote:"", qoHand:0, patientName:"", medicationName:"", sampleId:0, disburementQuantity:0, patientMobileNo:""}, update=false})=>{
    const router = useRouter()
    const [patientsName, setpatientsName] = useState(patient.patientName||"")
    const [dosage, setdosage] = useState({label:patient.medicationName === "" ?"":patient.medicationName+" | Lot: "+patient.lot+" | Expiry: "+formateIncomingDate(patient.expiryDate) + " | Quantity: " + (patient.qoHand)||"", value:patient.sampleId||0})
    const [quantity, setQuantity] = useState(patient.disburementQuantity||0)
    const [contact, setcontact] = useState(patient.patientMobileNo||"")
    const [addNote, setaddNote] = useState(patient.patientNote||"");
    const [load, setload] = useState(false)
    const [error, setError] = useState("")

    const [samples, setSamples] = useState([])
    useEffect(async () => {
        const data = await getUsableSamples({token});
        if (data){
            const LData = (data||[]).map(d => {
                return {
                    name:d.medicationName, label:d.medicationName+" | Lot: "+d.lot+" | Expiry: "+formateIncomingDate(d.expiryDate)+" | Quantity: "+d.quantityOnHand,
                    value:d.ID, quantityOnHand: d.quantityOnHand
                }
            })
            setSamples(LData)
        }
    }, [token]);

    function getDosageMaxQ(){
        if (!samples || samples.length === 0){
            return 0
        }
        for (let i = 0; i < samples.length; i++){
            console.log("FAIL", i, samples[i])
            if (dosage.value === samples[i].value){
                console.log(samples[i])
                return samples[i].quantityOnHand;
            }
        }
        return  0
    }

    async function addDetails() {
        setload(true)
        if (patientsName.length < 3) {
            setError("Identifier of patient not valid. Had to be more than 3 letter long.")
        } else if (!dosage) {
            setError("Medication name not valid.")
        } else if (!/^[0-9]+$/.test(quantity)&&parseInt(quantity) <= 0) {
            setError("Quantity of medication not valid")
        } else if (update && (parseInt(quantity) > parseInt(patient.qoHand))){
            // } else if (!/^[0-9]{10}$/.test(contact)) {
            setError("Quantity dispensed can not be greater than quantity on hand.")
        } else if (!update && (parseInt(quantity) > parseInt(getDosageMaxQ()))){
            setError("Quantity dispensed can not be greater than quantity on hand.")
        } else {
            setError("");
            if (update){
                const {data, error} = await updateDisburement({
                    token, sample: {
                        ...patient,
                        patientNote:addNote, patientName:patientsName, medicationName: dosage.label.split(" | ")[0], sampleId: dosage.value,
                        disburementQuantity:parseInt(quantity), patientMobileNo:contact
                    }
                })
                if (error){
                    if (error===true){
                        setError("Not able to store the disbursement. Please check all the parameter are in format.")
                    } else {
                        setError(error)
                    }
                } else {
                    onClose()
                    await router.reload()
                }
            } else {
                const {data, error} = await createDisburement({
                    token, sample: {
                        patientNote:addNote, patientName:patientsName, medicationName: dosage.label.split(" | ")[0], sampleId: dosage.value,
                        disburementQuantity:parseInt(quantity), patientMobileNo:contact
                    }
                })
                if (error){
                    if (error===true){
                        setError("Not able to store the disbursement. Please check all the parameter are in format.")
                    } else {
                        setError(error)
                    }
                } else {
                    onClose()
                    await router.push("/dispense")
                }
            }
        }
        setload(false)
    }

    return(
    <div className={styles.add_samples_main}>
        <div className={styles.add_sample_top}>
            <div className={styles.add_samples_title}>
                {update?"Update dispense details":"Dispense Medication"}
                <hr/>
            </div>
            <p onClick={onClose} className={styles.close}>⤫</p>
        </div>
        <span className={styles.add_samples_label}>Sample to be dispensed</span>
        <div style={{width: "100%"}}>
            <Select style={{width: "100%"}} value={dosage} options={samples} isSearchable onChange={e => setdosage(e)}/>
        </div>
        <span className={styles.add_samples_label}>Quantity dispensed {dosage !== null && dosage !== undefined && dosage.label !== "" && dosage.label !== null  && "(Max Available "+quantiyOnHand(dosage.label)+")"}</span>
        <input placeholder="Quantity" className={styles.add_samples_input} value={quantity} onChange={(e)=> setQuantity(e.target.value)}/>
        <span className={styles.add_samples_label}>Patients identifier</span>
        <input placeholder="Ex. Name of patient" className={styles.add_samples_input} value={patientsName} onChange={(e)=> setpatientsName(e.target.value)}/>
        {/* <span  className={styles.add_samples_label}>Contact</span>
        <input placeholder="(480) 555-0103" className={styles.add_samples_input} value={contact} onChange={(e)=> setcontact(e.target.value)}/> */}
        {/*<span className={styles.add_samples_label}>Add note</span>*/}
        {/*<input className={styles.add_samples_input_add} value={addNote} onChange={(e)=> setaddNote(e.target.value)}/>*/}
            {
                error && <p className={styles.error}>{error}</p>
            }
        <button disabled={load} onClick={addDetails} className={styles.add_samples_button}>{update?"Update info":"Dispense from cabinet"}</button>
    </div>

    )
}
export default AddPatients;
