import styles from "../styles/LeftNav.module.css"
import Image from "next/image"
import {useRouter} from "next/router";
import {signOut} from "../function/checkAuth";
import AddSamples from "./AddSamples";
import AddPatients from "./AddPatients"
import {useState} from "react";
import {Modal} from "@material-ui/core";

export default function LeftNav({setmenu, menu, token}){
    const router = useRouter();
    const [addSampleModalVisible, setAddSampleModalVisible] = useState(false)
    const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false)
    async function redirect(route){
        setmenu(false)
        await router.push(route)
    }
    return (
        <div className={styles.header} style={{display:menu?"":"none"}}>
            <Modal open={addSampleModalVisible} onClose={()=>{setAddSampleModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddSamples onClose={() => setAddSampleModalVisible(false)} token={token}/>
            </Modal>
            <Modal open={addPatientsModalVisible} onClose={()=>{setAddPatientsModalVisible(false)}} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <AddPatients onClose={() => setAddPatientsModalVisible(false)} token={token}/>
            </Modal>
            <div className={styles.navbar}>
                <div onClick={() => redirect("/dashboard")} className={styles.items} style={{backgroundColor:router.pathname.includes("/dashboard")?"#ECFEFC":""}}>
                    {
                        router.pathname.includes("/dashboard") ?
                            <Image src="/dashboard_green.svg" width={20} height={20}/>
                            :
                            <Image src="/dashboard.svg" width={20} height={20}/>
                    }
                    <p style={{color:router.pathname.includes("/dashboard")?"#0DB1A1":""}}>Dashboard</p>
                </div>
                <div onClick={() => redirect("/samples")} className={styles.items} style={{backgroundColor:router.pathname.includes("/samples")?"#ECFEFC":""}}>
                    {
                        router.pathname.includes("/samples") ?
                            <Image src="/sample_green.svg" width={20} height={20}/>
                            :
                            <Image src="/sample.svg" width={20} height={20}/>
                    }
                    <p style={{color:router.pathname.includes("/samples")?"#0DB1A1":""}}>Samples</p>
                </div>
                <div onClick={() => redirect("/dispense")} className={styles.items} style={{backgroundColor:router.pathname.includes("/dispense")?"#ECFEFC":""}}>
                    {
                        router.pathname.includes("/dispense") ?
                            <Image src="/patient_green.svg" width={20} height={20}/>
                            :
                            <Image src="/patient.svg" width={20} height={20}/>
                    }
                    <p style={{color:router.pathname.includes("/dispense")?"#0DB1A1":""}}>Disbursements</p>
                </div>
                {/*<div onClick={() => redirect("/alerts")} className={styles.items} style={{backgroundColor:router.pathname.includes("/alerts")?"#ECFEFC":""}}>*/}
                {/*    {*/}
                {/*        router.pathname.includes("/alerts") ?*/}
                {/*            <Image src="/bell_green.svg" width={20} height={20}/>*/}
                {/*            :*/}
                {/*            <Image src="/bell.svg" width={20} height={20}/>*/}
                {/*    }*/}
                {/*    <p style={{color:router.pathname.includes("/alerts")?"#0DB1A1":""}}>Alerts</p>*/}
                {/*</div>*/}
                <div className={styles.buttons}>
                    <button onClick={() => setAddSampleModalVisible(true)} className={styles.button_up}>
                        <Image src="/sampleadd.svg" width={22} height={22}/>
                        <p>Add sample</p>
                    </button>
                    <button onClick={() => setAddPatientsModalVisible(true)} className={styles.button_down}>
                        <Image src="/uservec.svg" width={18} height={18}/>
                        <p>Quick dispense</p>
                    </button>
                </div>
                <div className={styles.buttonsMobile}>
                    <button onClick={() =>
                    {
                        setAddSampleModalVisible(true)
                        // redirect("/samples/AddSamples")
                    }
                    } className={styles.button_up}>
                        <Image src="/sampleadd.svg" width={22} height={22}/>
                        <p>Add sample</p>
                    </button>
                    <button onClick={() => {
                        setAddPatientsModalVisible(true)
                        // redirect("/dispense/dispense")
                    }
                    } className={styles.button_down}>
                        <Image src="/uservec.svg" width={18} height={18}/>
                        Quick dispense
                    </button>
                </div>
            </div>

            <div onClick={signOut} className={styles.itemsLogout}>
                <Image src="/logout_red.svg" width={40} height={40}/>
                <p>Log out</p>
            </div>
        </div>
    )
}
