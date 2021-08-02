import React, {useEffect, useState} from 'react'
import styles from "../../styles/admin_samples.module.css"
import {getRecentSamples, getPendingSamplesAdmin} from "../../function/samples";
import {formateIncomingDate} from "../../function/dateFunction";
import AddSamples from "../../components/AddAdminSamples";
import {Modal} from "@material-ui/core";
import {adminUsers, PAGE_SIZE} from "../../function/constants";
import {withSSRContext} from "aws-amplify";

export default function Samples({token, email}) {
    const [samples, setSamples] = useState([]);
    const [recent, setRecent] = useState([]);
    const [addSampleModalVisible, setAddSampleModalVisible] = useState(false);
    const [mode, setMode] = useState(true);
    const [samplePage, setPage] = useState(1);
    const [recentPage, setRecentPage] = useState(1);

    const [resync, setResync] = useState(false)

    const [selectedAdmin, setSelectedAdmin] = useState(null)

    useEffect(async () => {
        const data = await getPendingSamplesAdmin({token, page:samplePage});
        if (data){
            setSamples(data)
        }
    }, [token, samplePage, resync]);

    useEffect(async () => {
        const data = await getRecentSamples({token, page:recentPage});
        console.log(data)
        if (data){

            setRecent(data)
        }
    }, [token, recentPage, resync]);

    function openModal(sample){
        setSelectedAdmin(sample);
        setAddSampleModalVisible(true)
    }
    return (
        <div className={styles.main}>
            <Modal open={addSampleModalVisible} onClose={()=>{setAddSampleModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddSamples selectedAdmin={selectedAdmin} onClose={() => (setResync(!resync), setAddSampleModalVisible(false))} token={token}/>
            </Modal>
            <div className={styles.topBar}>
                <div className={styles.span0}>
                    <span >Medical Cabinet</span>
                    <span className={styles.semiBorderBottom}/>
                    <p className={styles.descrp}>Click to edit the details</p>
                </div>
                <div className={styles.button}>
                    <button onClick={() => {setMode(true)}} className={mode?styles.button1:styles.button2}>Pending</button>
                    <button onClick={() => {setMode(false)}} className={!mode?styles.button1:styles.button2}>Recent</button>
                </div>
            </div>
            <div className={styles.medical_cabinet}>
                <table className={styles.table_content}>
                    <tr className={styles.header}>
                        <th style={{maxWidth: 80}}>S. No.</th>
                        <th>Date added</th>
                        {!mode && <th>Medication name</th>}
                        {!mode && <th>Lot#</th>}
                        {!mode && <th>Expiry Date</th>}
                        <th>Quantity received</th>
                        {/*<th>Image</th>*/}
                        <th>Status</th>
                    </tr>
                    {
                        mode && samples && (samples||[]).map((sample, i) => {
                            return (
                                <tr onClick={() => openModal(sample)} className={styles.content}>
                                    <td style={{maxWidth: 80}}>{i+1}</td>
                                    <td>{formateIncomingDate(sample.CreatedAt)}</td>
                                    {/*<td>{sample.medicationName}</td>*/}
                                    {/*<td>{sample.lot}</td>*/}
                                    {/*<td>{formateIncomingDate(sample.expiryDate)}</td>*/}
                                    <td>{sample.receivedQuantity}</td>
                                    {/*<td>{sample.url}</td>*/}
                                    <td>{sample.status}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        !mode && recent && (recent||[]).map((sample, i) => {
                            if (!sample.url){
                                return null
                            }
                            return (
                                <tr onClick={() => openModal(sample)} className={styles.content}>
                                    <td style={{maxWidth: 80}}>{i+1}</td>
                                    <td>{formateIncomingDate(sample.CreatedAt)}</td>
                                    <td>{sample.medicationName}</td>
                                    <td>{sample.lot}</td>
                                    <td>{formateIncomingDate(sample.expiryDate)}</td>
                                    <td>{sample.receivedQuantity}</td>
                                    {/*<td>{sample.url}</td>*/}
                                    <td>{sample.status}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <div className={styles.pagination}>
                <button disabled={(() => {return mode?samplePage===1:recentPage===1})()} onClick={() => {mode?setPage(samplePage-1):setRecentPage(recentPage-1)}}>Previous</button>
                <button disabled={(() => {return mode?(!samples || samples.length === 0 || samples.length !== PAGE_SIZE):(!recent || recent.length === 0 || recent.length !== PAGE_SIZE)})()} onClick={() => {mode?setPage(samplePage+1):setRecentPage(recentPage+1)}}>Next</button>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { Auth } = withSSRContext(context);
    try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
        const {attributes} = user;
        const email = attributes["email"]

        if (adminUsers.includes(email)){
            console.log("User ios admin")
            return {
                props:{
                    email: email
                }
            }
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/dashboard",
                },
            };
        }
    } catch (error) {
        console.log(error);
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }
};
