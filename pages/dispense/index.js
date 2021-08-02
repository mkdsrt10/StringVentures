import React, {useEffect, useState} from 'react'
import styles from "../../styles/samples.module.css"
import Link from "next/link";
import {getDisburement} from "../../function/disbursment";
import {formateIncomingDate} from "../../function/dateFunction";
import {PAGE_SIZE} from "../../function/constants";

export default function Patients({token}) {
    const [patients, setPatients] = useState([]);
    const [samplePage, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(async () => {
        const data = await getDisburement({token, page:samplePage, search});
        if (data){
            setPatients(data)
        }
    }, [token, samplePage, search])
    return (
        <div className={styles.main}>
            <div className={styles.topBar}>
                <div className={styles.span0}>
                    <span >Disbursement</span>
                    <span className={styles.semiBorderBottom}/>
                    <p className={styles.descrp}>Click on the row to edit the details.</p>
                </div>
                <div className={styles.search}>
                    <input type="text" placeholder="Search dispense..." onChange={(e) => {setSearch(e.target.value)}} className={styles.search_input}/>
                </div>
                <div></div>
            </div>
            <div className={styles.medical_cabinet}>
                <table className={styles.table_content}>
                    <tr className={styles.header}>
                        <th>Dosage provided</th>
                        <th>Dosage units</th>
                        <th>Dispensed date</th>
                        <th>Patient identifier</th>
                        {/*<th>Contact</th>*/}
                    </tr>
                    {
                        patients && patients.map(patient => {
                            return (
                                <Link href={"/dispense/"+patient.ID}>
                                    <a style={{width:"100%"}}>
                                        <tr className={styles.content}>
                                            <td>{patient.medicationName||patient.sampleId}</td>
                                            <td>{patient.disburementQuantity}</td>
                                            <td>{formateIncomingDate(patient.CreatedAt)}</td>
                                            <td>{patient.patientName}</td>
                                            {/*<td>{patient.patientMobileNo}</td>*/}
                                        </tr>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </table>
            </div>
            <div className={styles.pagination}>
                <button disabled={samplePage===1} onClick={() => {setPage(samplePage-1)}}>Previous</button>
                <button disabled={(!patients || patients.length < PAGE_SIZE)} onClick={() => {setPage(samplePage+1)}}>Next</button>
            </div>
        </div>
    )
}
