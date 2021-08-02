import styles from "../../styles/sampleDetails.module.css"
import Image from "next/image"
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {getSamplesFromId} from "../../function/samples";
import {expiringFunction, formateIncomingDate} from "../../function/dateFunction";
import AddPatients from "../../components/AddPatients";
import DisposeSample from "../../components/DisposeSample";
import {Modal} from "@material-ui/core";
import {Storage} from "aws-amplify";
import AddSamples from "../../components/AddSamples";

const SampleDetails=({token})=>{
    const router = useRouter();
    const [showImge, setShowImg] = useState("");
    const [keysList, setKeysList] = useState([]);

    const { sid } = router.query;
    const [sample, setSample] = useState(null);

    useEffect(async () => {
        if (sample && sample.url){
            if (sample.url.includes(",")){
                setKeysList(sample.url.split(","))
            } else {
                setKeysList([sample.url])
            }
        }
    }, [sample])
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

    const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false)
    const [editSample, seteditSample] = useState(false)
    const [addDisposeModalVisible, setAddDisposeModalVisible] = useState(false)

    useEffect(async () => {
        const sampl = await getSamplesFromId({token, id:sid})
        if (sampl)
            setSample(sampl)
    }, [token, sid])
    // useEffect(async () => {
    //     if (sid && sample && sample.url){
    //         const res = await getImage(sample.url)
    //         setShowImg(res)
    //     }
    // }, [sid, sample])
    function editDetails(){
        seteditSample(true)
    }
    async function dispenseFunc() {
        setAddPatientsModalVisible(true)
    }
    async function disposeFunc(){
        setAddDisposeModalVisible(true)
    }

    return(
        <div className={styles.main}>
            <Modal open={addPatientsModalVisible} onClose={()=>{setAddPatientsModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddPatients update={false} onClose={()=>{setAddPatientsModalVisible(false)}}
                             patient={{patientNote:"", patientName:"", qoHand: sample && sample.quantityOnHand, medicationName:sample && sample.medicationName, sampleId:sample && sample.ID, lot:sample && sample.lot, expiryDate:sample && sample.expiryDate, disburementQuantity:0, patientMobileNo:""}} token={token}/>
            </Modal>
            <Modal open={editSample} onClose={()=>{seteditSample(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddSamples onClose={()=>{seteditSample(false)}}
                    update={true} sampleR={sample}
                    token={token}/>
            </Modal>
            <Modal open={addDisposeModalVisible} onClose={()=>{setAddDisposeModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <DisposeSample sample={sample} token={token} onClose={()=>{setAddDisposeModalVisible(false)}}/>
            </Modal>
            <div className={styles.left}>
                <div onClick={() => router.back()} className={styles.back}>
                    <Image src="/left.svg" width={18} height={18}/>
                    <p>Back</p>
                </div>
                <div className={styles.headBar}>
                    <div className={styles.span0}>
                        <span>Sample Details</span>
                        <span className={styles.semiBorderBottom}/>
                    </div>
                    {/*<div onClick={editDetails} className={styles.editButton}>*/}
                    {/*    Edit details*/}
                    {/*</div>*/}
                </div>
                <div className={styles.sampleBox}>
                    <div className={styles.sampleHead}>
                        <Image src="/Frame.svg" width={30} height={30}/>
                        <p>{sample ? sample.medicationName:""}</p>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <label>Lot#</label>
                            <p>{sample ? sample.lot:""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Received date</label>
                            <p>{sample ? formateIncomingDate(sample.CreatedAt):""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Unit of measure</label>
                            <p>{sample ? sample.unitOfM:""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Quantity per unit</label>
                            <p>{sample ? (sample.quantityPerU):""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Expiry date</label>
                            <p>{sample ? formateIncomingDate(sample.expiryDate):""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Dispensed quantity</label>
                            <p>{sample ? sample.dispensedQuantity:""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Received quantity</label>
                            <p>{sample ? sample.receivedQuantity:""}</p>
                        </div>
                        <div className={styles.detailItem}>
                            <label>Quantity left</label>
                            <p>{sample ? sample.quantityOnHand:""}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button disabled={sample && expiringFunction(sample.expiryDate) < 0} onClick={dispenseFunc} className={styles.button_up}>{sample ? expiringFunction(sample.expiryDate) < 0?"Expired":"Dispense":""}</button>
                    <button onClick={disposeFunc} className={styles.button_empty}>Dispose</button>
                </div>
            </div>
            <div className={styles.left} style={{alignItems:'center', margin:"auto 3rem"}}>
                {
                    sample && sample.url && showImge &&
                    <div className={styles.detailItem} style={{width:"100%"}}>
                        <label style={{marginBottom: "2rem"}}>Image uploaded</label>
                        {
                            showImge &&
                            showImge.map((img, i) => {
                                return (
                                    <div key={i} style={{marginBottom: 5}}>
                                        <Image src={img} width={400} height={400} />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SampleDetails;
