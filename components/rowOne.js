import styles from "../styles/samples.module.css";
import {formateIncomingDate} from "../function/dateFunction";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Storage} from "aws-amplify";

export default function Row({setModalPendingSample, sample, setAddSampleModalVisible, addSampleModalVisible, setResync, resync, modalPendingSample, token}){
    const [showImg, setShowImg] = useState([]);
    const [keysList, setKeysList] = useState([]);
    async function getImage(keyIm) {
        const res = await Storage.get(keyIm, {
            level: "public", // defaults to `public`
        });
        return res
    }
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
            setShowImg(res)
        }
    }, [keysList])

    return (
        <tr onClick={() => {setModalPendingSample(sample); setAddSampleModalVisible(true)}} className={styles.content}>
            <td>{formateIncomingDate(sample.CreatedAt)}</td>
            <td>{sample.receivedQuantity}</td>
            <td>{sample.repName}</td>
            <td>{
                sample && sample.url && showImg &&
                    showImg.map(img => {
                        return (
                            <Image src={img} width={70} height={100}/>
                        )
                    })
            }</td>
        </tr>
    )
}
