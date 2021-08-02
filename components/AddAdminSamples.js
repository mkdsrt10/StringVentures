import styles from "../styles/sample.module.css";
import React, {useEffect, useState} from "react";
import {updateSampleAdmin} from "../function/samples";
import {formateIncomingDateMMLL, toAPIFormat} from "../function/dateFunction";
import Image from "next/image"
import {Storage} from "aws-amplify";

const AddAdminSamples=({selectedAdmin, token, onClose=() => {}})=>{
    const [showImge, setShowImg] = useState([]);
    const [loader, setLoad] = useState(false);
    const [error, setError] = useState("")
    const [medicationName, setmedicationName] = useState(selectedAdmin && selectedAdmin.medicationName)
    const [lot, setlot] = useState(selectedAdmin && selectedAdmin.lot)
    const [expiryDate, setexpiryDate] = useState(selectedAdmin && formateIncomingDateMMLL(selectedAdmin.expiryDate))
    const [keysList, setKeysList] = useState([]);

    useEffect(async () => {
        if (selectedAdmin && selectedAdmin.url){
            if (selectedAdmin.url.includes(",")){
                setKeysList(selectedAdmin.url.split(","))
            } else {
                setKeysList([selectedAdmin.url])
            }
        }
    }, [selectedAdmin])
    useEffect(async () => {
        if (keysList && keysList.length > 0){
            let res = []
            for (let i=0; i<keysList.length; i++){
                res.push(await getImage(keysList[i]))
            }
            console.log("JAI--", res)
            setShowImg(res)
        }
    }, [keysList])

    async function getImage(keyIm) {
        console.log("GAME-1", keyIm)
        const res = await Storage.get(keyIm, {
            level: "public", // defaults to `public`
        });
        console.log("GAME", res)
        return res
    }

    async function addDetails(status) {
        setLoad(true)
        if (medicationName.length < 3) {
            setError("Name of medication not valid. Had to be more than 3 letter long. Put NULL if not visible")
        } else if (lot.length <= 0) {
            setError("Lot of medication not valid. Put NULL if not visible")
        } else if (!/^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/.test(expiryDate)) {
            setError("Expiry date of medication not valid (format is MM/DD/YY) Put NULL if not visible")
        } else {
            setError("")
            const {data, error} = await updateSampleAdmin({
                token, sample: {
                    ...selectedAdmin,
                    lot:lot, expiryDate:toAPIFormat(expiryDate),
                    medicationName:medicationName, status:status?"Approved":"Pending"}
            })
            if (error){
                if (error===true){
                    setError("Not able to update the sample. Please check all the parameter are in format.")
                } else {
                    setError(error)
                }
            } else {
                onClose();
            }
        }
        setLoad(false)
    }

    return(
        <div className={styles.add_samples_main} style={{width: "90%"}}>
            <div className={styles.add_samples_title}>Add sample details</div>

            <div className={styles.rows}>
                <div className={styles.colum}>
                    {
                        selectedAdmin && selectedAdmin.url && showImge &&
                        showImge.map((img, i) => {
                            console.log("JAI", i)
                            return (
                                <div key={i} style={{marginBottom: 5, border:"2px solid black"}}>
                                    <Image src={img} width={600} height={800} />
                                </div>
                            )
                        })
                    }
                </div>

                <div className={styles.colum}>
                    <span className={styles.add_samples_label}>Medication name</span>
                    <input disabled={selectedAdmin.status === "Approved"} className={styles.add_samples_input}  value={medicationName} onChange={(e)=> setmedicationName(e.target.value)}/>
                    <span className={styles.add_samples_label}>Lot</span>
                    <input disabled={selectedAdmin.status === "Approved"} className={styles.add_samples_input} value={lot} onChange={(e)=> setlot(e.target.value)}/>
                    <div className={styles.add_samples_sub_row}>
                        <div className={styles.add_samples_sub_row_left}>
                            <span className={styles.add_samples_label}>Expiry date (MM/DD/YY)</span>
                            <input disabled={selectedAdmin.status === "Approved"} placeholder= "MM/DD/YY" className={styles.add_samples_input} value={expiryDate} onChange={(e)=> setexpiryDate(e.target.value)}/>
                        </div>
                    </div>
                    {
                        error && <p className={styles.error}>{error}</p>
                    }
                    {
                        selectedAdmin.status === "Pending" && <button disabled={loader} onClick={() => addDetails(true)} className={styles.add_samples_button}>Approve in cabinet</button>
                    }
                    {
                        selectedAdmin.status === "Pending" && <button disabled={loader} onClick={() => addDetails(false)} className={styles.add_samples_button_empty}>Save but not approve</button>
                    }
                    {
                        selectedAdmin.status === "Approved" && <button disabled={loader} onClick={() => addDetails(false)} className={styles.add_samples_button_empty}>Revert Status to Pending</button>
                    }
                </div>
            </div>

        </div>
    )
}

export default AddAdminSamples;
