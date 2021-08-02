import React, {useEffect, useState} from 'react'
import styles from "../../styles/samples.module.css"
import Link from "next/link"
import {getExpiredSamples, getExpiringSamples, getPendingSamples, getUsableSamples} from "../../function/samples";
import {expiringFunction, formateIncomingDate} from "../../function/dateFunction";
import AddSamples from "../../components/AddSamples";
import {Modal} from "@material-ui/core";
import Row from "../../components/rowOne";
import {PAGE_SIZE} from "../../function/constants";
import {useRouter} from "next/router";

export default function Samples({token}) {
    const router = useRouter();
    const {modeQ} = router.query
    const [mode, setMode] = useState(0);
    useEffect(() => {
        console.log("MODE", modeQ, router.query)
        if (modeQ === "1"){
            setMode(1)
        }
        if (modeQ === "2"){
            setMode(2)
        }
    }, [modeQ])
    // 0 -> usable
    // 1 -> expired
    // 2 -> pending
    const [samples, setSamples] = useState([]);
    const [resync, setResync] = useState(false);
    const [samplePage, setPage] = useState(1);
    const [pendingPage, setPendingPage] = useState(1);
    const [expiredPage, setExpiredPage] = useState(1);
    const [search, setSearch] = useState("");
    const [addSampleModalVisible, setAddSampleModalVisible] = useState(false);
    const [modalPendingSample, setModalPendingSample] = useState(null);

    useEffect(async () => {
        const data = await getExpiringSamples({token, pageSize: 15, page:samplePage});
        if (data && modeQ === "3"){
            setSamples(data)
        }
    }, [token, samplePage, search, resync, modeQ])

    useEffect(async () => {
        const data = await getUsableSamples({token, page:samplePage, search});
        if (data && modeQ !== "3"){
            setSamples(data)
        }
    }, [token, samplePage, search, resync]);

    const [expired, setExpired] = useState([]);
    useEffect(async () => {
        const data = await getExpiredSamples({token, page:expiredPage});
        if (data){
            setExpired(data)
        }
    }, [token, expiredPage, resync]);

    const [pending, setPending] = useState([]);
    useEffect(async () => {
        const data = await getPendingSamples({token, pendingPage});
        if (data){
            setPending(data)
        }
    }, [token, resync, pendingPage]);

    return (
        <div className={styles.main}>
            <div className={styles.topBar}>
                <div className={styles.span0}>
                    <span >Medical Cabinet</span>
                    <span className={styles.semiBorderBottom}/>
                    <p className={styles.descrp}>Click on the row to edit the details.</p>
                </div>
                <div className={styles.search}>
                    {
                        mode !== 2 && <input type="text" placeholder="Search sample..." onChange={(e) => {setSearch(e.target.value); setMode(0)}} className={styles.search_input}/>
                    }
                </div>
                <div className={styles.button}>
                    <button onClick={() => {setMode(0)}} className={mode===0?styles.button1:styles.button2}>Usable</button>
                    <button onClick={() => {setMode(1)}} className={mode===1?styles.button1:styles.button2}>Expired</button>
                    <button onClick={() => {setMode(2)}} className={mode===2?styles.button1:styles.button2}>Pending</button>
                </div>
            </div>
            <div className={styles.medical_cabinet}>
                <table className={styles.table_content}>
                    {
                        modeQ === "3" ?
                            <tr className={styles.header}>
                                <th>Medication name</th>
                                <th>Lot#</th>
                                <th>Units received</th>
                                <th>Units left</th>
                                <th>Days remaining</th>
                                <th>Date added</th>
                            </tr>
                            :
                            mode !== 2 ?
                                <tr className={styles.header}>
                                    <th>Medication name</th>
                                    <th>Lot#</th>
                                    <th>Units received</th>
                                    <th>Units left</th>
                                    <th>Expiry date</th>
                                    <th>Date added</th>
                                </tr>
                                :
                                <tr className={styles.header}>
                                    <th>Date added</th>
                                    <th>Quantity received</th>
                                    <th>Rep. name</th>
                                    <th>Image uploaded</th>
                                </tr>
                    }
                    {
                        mode===0 && samples && (samples||[]).map((sample) => {
                            return (
                                <Link href={"/samples/"+sample.ID}>
                                    <a style={{width:"100%"}}>
                                        <tr className={styles.content}>
                                            <td>{sample.medicationName}</td>
                                            <td>{sample.lot}</td>
                                            <td>{sample.receivedQuantity}</td>
                                            <td>{sample.quantityOnHand}</td>
                                            {
                                                modeQ === "3" ?
                                                    <td style={{color:"red"}}>{expiringFunction(sample.expiryDate)} days</td>
                                                    :
                                                    <td>{formateIncomingDate(sample.expiryDate)}</td>
                                            }
                                            <td>{formateIncomingDate(sample.CreatedAt)}</td>
                                        </tr>
                                    </a>
                                </Link>
                            )
                        })
                    }
                    {
                        mode===1 && expired && (expired||[]).map((sample) => {
                            return <Link href={"/samples/"+sample.ID}>
                                <a style={{width:"100%"}}>
                                    <tr className={styles.content}>
                                        <td>{sample.medicationName}</td>
                                        <td>{sample.lot}</td>
                                        <td>{sample.receivedQuantity}</td>
                                        <td>{sample.quantityOnHand}</td>
                                        <td>{formateIncomingDate(sample.expiryDate)}</td>
                                        <td>{formateIncomingDate(sample.CreatedAt)}</td>
                                    </tr>
                                </a>
                            </Link>
                        })
                    }
                    {
                        mode===2 && pending && (pending||[]).map((sample) => {
                            return (
                                <Row token={token} addSampleModalVisible={addSampleModalVisible} modalPendingSample={modalPendingSample}
                                sample={sample} resync={resync} setAddSampleModalVisible={setAddSampleModalVisible} setModalPendingSample={setModalPendingSample}
                                setResync={setResync} />
                            )
                        })
                    }

                </table>
            </div>
            <Modal open={addSampleModalVisible} onClose={()=>{setAddSampleModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddSamples onClose={() => (setResync(!resync), setAddSampleModalVisible(false))} update={true} sampleR={modalPendingSample} token={token}/>
            </Modal>
            <div className={styles.pagination}>
                <button disabled={(() => {return mode===0?samplePage===1:mode===1?expiredPage===1:pendingPage===1})()} onClick={() => {mode===0?setPage(samplePage-1):mode===1?setExpiredPage(expiredPage-1):setPendingPage(pendingPage-1)}}>Previous</button>
                <button disabled={(() => {return mode===0?(!samples || samples.length < PAGE_SIZE):mode===1?(!expired || expired.length < PAGE_SIZE):(!pending || pending.length < PAGE_SIZE)})()} onClick={() => {mode===0?setPage(samplePage+1):mode===1?setExpiredPage(expiredPage+1):setPendingPage(pendingPage+1)}}>Next</button>
            </div>
        </div>
    )
}
