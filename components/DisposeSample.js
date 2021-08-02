import React from 'react'
import Image from "next/image"
import styles from "../styles/disposeSample.module.css"
import {useState} from "react"
import {createDisposal} from "../function/disposal";
import {useRouter} from "next/router";
import Select from "react-select";

export default function disposeSample({sample, onClose, token}) {
    const router = useRouter()
    const [disposeTo, setdisposeTo] = useState("")
    const [disposalMethod, setdisposalMethod] = useState("")
    const [disposeQuantity, setdisposeQuantity] = useState("")
    const [error, setError] = useState("")
    const [load, setload] = useState(false)
    const dis_methods = [
        {
            label:"Local Police Station",
            value:"LocalPoliceStation"
        },
        {
            label:"Local Pharmacy",
            value:"LocalPharmacy"
        },
        {
            label:"State Recycling Facility",
            value:"StateRec.Facility"
        },
        {
            label:"Drain / Toilet",
            value:"Drain/Toilet"
        },
        {

            label: "Recycling Company",
            value: "RecyclingCompany"
        }
    ]

    async function disposeFunc() {
        setload(true)
        console.log(!/^[0-9]+$/.test(disposeQuantity)||parseInt(disposeQuantity) <= 0,(sample ? disposeQuantity>sample.quantityOnHand : false))
        if (!disposalMethod) {
            setError("Dispose method not valid.")
        } else if (!/^[0-9]+$/.test(disposeQuantity)||parseInt(disposeQuantity) <= 0 || (sample ? disposeQuantity>sample.quantityOnHand : false)) {
            setError("Quantity of medication not valid. Had to be more than 0 & less than quantity disposed.")
        } else {
            setError("");
            const {data, error} = await createDisposal({
                token, sample: {
                    sampleId: sample.ID, disposedTo:disposeTo, disposedMehtod:disposalMethod,
                    disposedQuantity:parseInt(disposeQuantity), disposedManId:"MANMAN", disposedBy:"MANMA"
                }
            })
            if (error){
                if (error===true){
                    setError("Not able to store the disposal. Please check all the parameter are in format.")
                } else {
                    setError(error)
                }
            } else {
                await router.reload()
            }
        }
        setload(false)
    }

    return (
        <div className={styles.add_samples_main}>
            <div className={styles.add_sample_top}>
                <div className={styles.add_samples_title}>
                    Dispose Sample
                    <hr/>
                </div>
                <p onClick={onClose} className={styles.close}>⤫</p>
            </div>
        <div className={styles.add_samples_input_add}>
            <Image src="/Frame.svg" width={20} height={20}/>
            <span>{sample && sample.medicationName}</span>
            <div className={styles.dispose_sample}>
                <div className={styles.content}>
                    <span className={styles.heading}>Lot#</span>
                    <span className={styles.value}>{sample && sample.lot}</span>
                </div>
                <div className={styles.contents}>
                    <span className={styles.heading}>Quantity left</span>
                    <span className={styles.value}>{sample && sample.quantityOnHand}</span>
                </div>
            </div>
        </div>
        <span className={styles.add_samples_label}>Disposing method</span>
        <div style={{width: "100%"}}>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue=""
                isSearchable={true}
                isClearable={true}
                options={dis_methods}
                onChange={(e)=> setdisposalMethod(e?e.value:"")}
            />
        </div>
            {/*<input placeholder="" className={styles.add_samples_input} value={disposalMethod} onChange={(e)=> setdisposalMethod(e.target.value)}/>*/}
        <span className={styles.add_samples_label}>Disposed units</span>
        <input placeholder={"Units to be disposed"} className={styles.add_samples_input} value={disposeQuantity} onChange={(e)=> setdisposeQuantity(e.target.value)}/>
        <span className={styles.add_samples_label}>Dispose to</span>
        <input placeholder={"Name of the representative"} className={styles.add_samples_input} value={disposeTo} onChange={(e)=> setdisposeTo(e.target.value)}/>
        {/*<div className={styles.add_samples_sub_row}>*/}
        {/*    <div className={styles.add_samples_sub_row_left}>*/}
        {/*        <span className={styles.add_samples_label}>Disposal method</span>*/}
        {/*        <input className={styles.add_samples_input} value={disposalMethod} onChange={(e)=> setdisposalMethod(e.target.value)}/>*/}
        {/*    </div>*/}
        {/*    <div className={styles.add_samples_sub_row_right}>*/}
        {/*        */}
        {/*    </div>*/}
        {/*</div>*/}
        {
            error && <p className={styles.error}>{error}</p>
        }
        <button disabled={load} onClick={disposeFunc} className={styles.add_samples_button}>Dispose from cabinet</button>
    </div>
    )
}
