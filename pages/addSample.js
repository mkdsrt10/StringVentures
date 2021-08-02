import styles from "../styles/addPatients.module.css";
import {useState} from "react";
import {createNewSample} from "../function/samples";
import {useRouter} from "next/router";
import {toAPIFormat} from "../function/dateFunction";

const AddSamples=({token})=>{
    const router = useRouter()
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [lot, setLot] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [repName, setRepName] = useState("")
    const [recievedQuantity, setRecievedQuantity] = useState(0)

    async function addDetails() {
        if (name.length < 3) {
            setError("Name of medication not valid. Had to be more than 3 letter long.")
        } else if (lot.length <= 0) {
            setError("Lot of medication not valid.")
        } else if (!/^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/.test(expiryDate)) {
            setError("Name of medication not valid")
        } else if (repName.length < 3) {
            setError("Medical rep name for medication not valid. Had to be more than 3 letter long.")
        } else if (!/^[0-9]+$/.test(recievedQuantity)&&parseInt(recievedQuantity) <= 0) {
            setError("Received quantity of medication not valid")
        } else {
            setError("")
            const {data, error} = await createNewSample({
                token, sample: {
                    lot:lot, expiryDate:toAPIFormat(expiryDate),
                    receivedQuantity:parseInt(recievedQuantity), repName:repName,
                    medicationName:name, receivedBy:"Meme"}
            })
            if (error){
                if (error===true){
                    setError("Not able to store the sample. Please check all the parameter are in format.")
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
                    <span className={styles.span2}>Add sample details</span>
                    {/*<CloseIcon/>*/}
                </div>
                <div className={styles.input_fields}>
                    <div className={styles.items}>
                        <label className={styles.label}>Medication</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                               className ={styles.input} />
                    </div>
                    <div className={styles.items}>
                        <label className={styles.label} >Lot</label>
                        <input type="text" value={lot} onChange={e => setLot(e.target.value)}
                               className ={styles.input} />
                    </div>
                    <div className={styles.items}>
                        <label className={styles.label}>Expiry Date (in MM/DD/YY format)</label>
                        <input type="text" value={expiryDate} onChange={e => setExpiryDate(e.target.value)}
                               placeholder="MM/DD/YY" className ={styles.input}/>
                    </div>
                    <div className={styles.items}>
                        <label className={styles.label}>Received Quantity</label>
                        <input type="text" value={recievedQuantity} onChange={e => setRecievedQuantity(e.target.value)}
                               className ={styles.input}  />
                    </div>
                    <div className={styles.items}>
                        <label className={styles.label}>Rep name</label>
                        <input type="text" value={repName} onChange={e => setRepName(e.target.value)}
                               className ={styles.input}  />
                    </div>
                    {
                        error && <p className={styles.error}>{error}</p>
                    }
                    <div className={styles.button1}>
                        <button onClick={addDetails} className={styles.button}>Add to Cabinet</button>
                    </div>
                </div>
        </div>
    )
}

export default AddSamples;
