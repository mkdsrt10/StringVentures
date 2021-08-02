import styles from "../styles/listSample.module.css"
import Image from 'next/image'
const ListSample=()=>{
    return(
        <div className={styles.main_container}>
            <div className={styles.top_div}>
                <span className={styles.span}>List of samples</span>
                <div className={styles.buttons}>
                <button className={styles.button1}>Usable</button>
                <button className={styles.button2}>Expired</button>
                </div>
            </div>
            
            <div className={styles.box1}>
                <div className={styles.top}>
                <span className={styles.span1}><Image src="/Frame.svg" width={30} height={30}/>Duoresp Spiromax</span>
                <button className={styles.exp_button}>Expiring in 2 days</button>
                </div>
                <div className={styles.bottom}>
                    <label className={styles.label2}>Total Quantity</label>
                    <input className={styles.input1} ></input>
                    <label className={styles.label3}> Quantity left</label>
                    <input className={styles.input1} ></input>
                    <div className={styles.hr}>
                    <span className={styles.span4}> 2hr ago</span>
                    </div>
                </div>
            </div>
            <div className={styles.box1}>
                <div className={styles.top}>
                <span className={styles.span1}><Image src="/Frame.svg" width={30} height={30}/>Duoresp Spiromax</span>
                <button className={styles.exp_button}>Expiring in 2 days</button>
                </div>
                <div className={styles.bottom}>
                    <label className={styles.label2}>Total Quantity</label>
                    <input className={styles.input1} ></input>
                    <label className={styles.label3}> Quantity left</label>
                    <input className={styles.input1} ></input>
                    <div className={styles.hr}>
                    <span className={styles.span4}> 2hr ago</span>
                    </div>
                </div>
            </div>
            <div className={styles.box1}>
                <div className={styles.top}>
                <span className={styles.span1}><Image src="/Frame.svg" width={30} height={30}/>Duoresp Spiromax</span>
                <button className={styles.exp_button}>Expiring in 2 days</button>
                </div>
                <div className={styles.bottom}>
                    <label className={styles.label2}>Total Quantity</label>
                    <input className={styles.input1} ></input>
                    <label className={styles.label3}> Quantity left</label>
                    <input className={styles.input1} ></input>
                    <div className={styles.hr}>
                    <span className={styles.span4}> 2hr ago</span>
                    </div>
                </div>
            </div>
            <div className={styles.box1}>
                <div className={styles.top}>
                <span className={styles.span1}><Image src="/Frame.svg" width={30} height={30}/>Duoresp Spiromax</span>
                <button className={styles.exp_button}>Expiring in 2 days</button>
                </div>
                <div className={styles.bottom}>
                    <label className={styles.label2}>Total Quantity</label>
                    <input className={styles.input1} ></input>
                    <label className={styles.label3}> Quantity left</label>
                    <input className={styles.input1} ></input>
                    <div className={styles.hr}>
                    <span className={styles.span4}> 2hr ago</span>
                    </div>
                </div>
            </div>
               
        </div>
    )
}
export default ListSample;