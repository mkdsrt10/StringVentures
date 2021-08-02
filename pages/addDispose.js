import styles from "../styles/addPatients.module.css"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Select from "react-select";
import {createDisburement} from "../function/disbursment";
import {getUsableSamples} from "../function/samples";
import {expiringFunction} from "../function/dateFunction";

const AddPatients=({token})=>{
    const router = useRouter()
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [mediactionname, setMedicationName] = useState("")
    const [phone, setPhone] = useState("")
    const [patientNote, setpatientNote] = useState("")
    const [quantity, setQuantity] = useState(0)

    const [samples, setSamples] = useState([])
    useEffect(async () => {
        const data = await getUsableSamples({token});
        if (data){
            const LData = (data||[]).map(d => {
                return {label:d.medicationName+" | Lot:"+d.lot+(expiringFunction(d.expiryDate)<0?" | expired already":(" | expiring in "+expiringFunction(d.expiryDate)+" days")), value:d.ID}
            })
            setSamples(LData)
        }
    }, [token])

    async function addDetails() {
        if (name.length < 3) {
            setError("Name of patient not valid. Had to be more than 3 letter long.")
        } else if (!mediactionname) {
            setError("Medication name not valid.")
        } else if (!/^[0-9]{10}$/.test(phone)) {
            setError("Phone of patient not valid. Had to be 10 character long.")
        } else if (!/^[0-9]+$/.test(quantity)&&parseInt(quantity) <= 0) {
            setError("Quantity of medication not valid")
        } else {
            setError("")
            const {data, error} = await createDisburement({
                token, sample: {
                    disposedTo:disposedTo, disposedMehtod:disposedMehtod, sampleId: mediactionname,
                    disposedQuantity:parseInt(quantity), patientMobileNo:phone
                }
            })
            if (error){
                if (error===true){
                    setError("Not able to store the disbursement. Please check all the parameter are in format.")
                } else {
                    setError(error)
                }
            } else {
                await router.push("/samples")
            }
        }
    }

    return(
        <div className={styles.main_container}>
            <div className={styles.top_divs}>
                <span className={styles.span2}>Dispose sample</span>
            </div>
            <div className={styles.input_fields}>
                <div className={styles.items}>
                    <label className={styles.label}>Patient name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                           className ={styles.input} />
                </div>
                <div className={styles.items}>
                    <label className={styles.label}>Medication sample</label>
                    <Select options={samples} isSearchable onChange={e => setMedicationName(e.value)}/>
                    {/*<input type="text" value={mediactionname} onChange={e => setMedicationName(e.target.value)}*/}
                    {/*       className ={styles.input} />*/}
                </div>
                <div className={styles.items}>
                    <label className={styles.label}>Dosage quantity</label>
                    <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)}
                           className ={styles.input} />
                </div>
                <div className={styles.items}>
                    <label className={styles.label}>Contact detail</label>
                    <input type="text" placeholder="(480) 555-0103"
                           value={phone} onChange={e => setPhone(e.target.value)}
                           className ={styles.input} />
                </div>
                <div className={styles.items}>
                    <label className={styles.label}> Add note</label>
                    <input type="text" value={patientNote} onChange={e => setpatientNote(e.target.value)}
                           className ={styles.input1} />
                </div>
                {
                    error && <p className={styles.error}>{error}</p>
                }
                <div className={styles.button1}>
                    <button onClick={addDetails} className={styles.button}>Dispense</button>
                </div>
            </div>
        </div>
    )
}

export default AddPatients;
