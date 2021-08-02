import styles from "../styles/sample.module.css";
import {useEffect, useState} from "react";
import {createNewSample, getExpiredSamples, getUsableSamples, updateSample} from "../function/samples";
import Image from "next/image";
import {Auth, Storage} from "aws-amplify"
import LinearProgress from '@material-ui/core/LinearProgress'
import Select from "react-select";
import {formateIncomingDateMMLL, toAPIFormat} from "../function/dateFunction";
import AsyncCreatableSelect from 'react-select/async-creatable';

const unitM = [{label:"Bottle", value:"Bottle"}, {label:"Strip of tablets", value:"Strip of tablets"}]

const AddSamples=({token, onClose=async () => {}, sampleR=null, update=false})=>{
    const [receivedQuantity, setreceivedQuantity] = useState(sampleR && sampleR.receivedQuantity)
    const [repName, setrepName] = useState(sampleR && sampleR.repName)
    const [medicationName, setMedicationName] = useState(sampleR && sampleR.medicationName)
    const [unitOfM, setUnitOfM] = useState(sampleR ? {label:sampleR.unitOfM, value:sampleR.unitOfM}:{lable:"", value:""})
    const [quantityPerU, setQuantityPerU] = useState(sampleR && sampleR.quantityPerU)
    const [error, setError] = useState("")
    const [selectedImage, setSelectedImage] = useState(sampleR && sampleR.url);
    const [lot, setLot] = useState(sampleR && sampleR.lot)
    const [expiryDate, setExpiryDate] = useState(sampleR && formateIncomingDateMMLL(sampleR.expiryDate))
    const [loading, setLoading] = useState(false)
    const [selectedImageGet, setSelectedImageGet] = useState([]);
    const [arrayImage, setArrayImage] = useState([]);

    async function getOption(inputValue) {
        if (token) {
            const dataU = await getUsableSamples({token, page: 1, search:inputValue});
            const dataE = await getExpiredSamples({token, page: 1, search:inputValue});
            const finalList = dataU.concat(dataE);
            const uni = finalList.map((item) => {
                return item.medicationName;
            });
            return uni.filter((v, i, a) => a.indexOf(v) === i).map((item) => {
                return {
                    value: item,
                    label: item
                };
            });
        } else {
            return [];
        }
    }
    useEffect(() => {getOption("").then(r => {})}, [])

    useEffect(() => {
        if (selectedImage && selectedImage.includes(",")){
            setArrayImage(selectedImage.split(","))
            console.log("In COMA", selectedImage, selectedImage.split(","))
        } else if (selectedImage) {
            setArrayImage([selectedImage ])
            console.log("Not In COMA", selectedImage)
        }
    }, [selectedImage])
    useEffect(async () => {
        if (arrayImage && arrayImage.length > 0){
            let arr = []
            console.log("WithOutLoop", arrayImage)
            for (let i=0; i < arrayImage.length; i++){
                const res = await getImage(arrayImage[i])
                arr.push(res)
            }
            console.log("AfterLoop", arr)
            setSelectedImageGet(arr)
        }
    }, [arrayImage])

    const [uploadProgress, setuploadProgress] = useState("")

    async function addDetails() {
        setLoading(true)
        if (!selectedImage || selectedImage.length < 3) {
            setError("Image not uploaded.")
        } else if (!medicationName || medicationName.length <= 3) {
            setError("Name of medication not valid.")
        } else if (unitOfM.value === "") {
            setError("Please select a unit of measurement.")
        } else if (!quantityPerU || quantityPerU.length <= 0) {
            setError("Quantity per unit not valid.")
        } else if (!repName || repName.length < 3) {
            setError("Medical rep name for medication not valid. Had to be more than 3 letter long.")
        } else if (!/^[0-9]+$/.test(receivedQuantity)||parseInt(receivedQuantity) <= 0) {
            setError("Received quantity of medication not valid")
        } else if (expiryDate !== "" && expiryDate !== "01/01/01" && expiryDate !== null && !/^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/.test(expiryDate)) {
            setError("Expiry date of medication not valid (format is MM/DD/YY) Keep empty if not visible.")
        } else {
            setError("")
            const {data, error} = await createNewSample({
                token, sample: {
                    medicationName: medicationName, unitOfM:unitOfM.value, quantityPerU: quantityPerU,
                    receivedQuantity:parseInt(receivedQuantity), repName:repName,
                    lot:lot,
                    expiryDate: (expiryDate==="" || expiryDate === "01/01/01" || expiryDate===null) ? null : toAPIFormat(expiryDate),
                    receivedBy:"Meme", url:selectedImage, status:(lot !== "" && lot != null && expiryDate !== "" && expiryDate !== "01/01/01" && expiryDate !== null && /^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/.test(expiryDate))?"Approved":"Pending"}
            })
            if (error){
                if (error===true){
                    setError("Not able to store the sample. Please check all the parameter are in format.")
                } else {
                    console.log(error)
                    setError(error)
                }
            } else {
                await onClose()
            }
        }
        setLoading(false)
    }
    async function updateDetails() {
        setLoading(true)
        if (selectedImage.length < 3) {
            setError("Image not uploaded.")
        } else if (!medicationName || medicationName.length <= 3) {
            setError("Name of medication not valid.")
        } else if (unitOfM.value === "") {
            setError("Please select a unit of measurement.")
        } else if (!quantityPerU || quantityPerU.length <= 0) {
            setError("Quantity per unit not valid.")
        } else if (repName.length < 3) {
            setError("Medical rep name for medication not valid. Had to be more than 3 letter long.")
        } else if (!/^[0-9]+$/.test(receivedQuantity)&&parseInt(receivedQuantity) <= 0) {
            setError("Received quantity of medication not valid")
        } else if (expiryDate !== "" && !/^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/.test(expiryDate)) {
            setError("Expiry date of medication not valid (format is MM/DD/YY) Keep empty if not visible.")
        } else {
            setError("")
            const {data, error} = await updateSample({
                token, sample: {
                    ID: sampleR.ID,
                    medicationName: medicationName, unitOfM:unitOfM.value, quantityPerU: quantityPerU,
                    lot:sampleR.lot,
                    expiryDate:(expiryDate !== "" && expiryDate !== "01/01/01" && expiryDate !== null) ? toAPIFormat(expiryDate) : sampleR.expiryDate, status:(lot !== "" && lot != null && expiryDate !== "" && expiryDate !== null && expiryDate !== "01/01/01" && /^[0-9]{2}\/[0-9]{2}\/[0-9]{2}$/.test(expiryDate))?"Approved":"Pending",
                    receivedQuantity:parseInt(receivedQuantity), repName:repName,
                    receivedBy:"Meme", url:selectedImage}
            })
            if (error){
                if (error===true){
                    setError("Not able to store the sample. Please check all the parameter are in format.")
                } else {
                    console.log(error)
                    setError(error)
                }
            } else {
                await onClose()
            }
        }
        setLoading(false)
    }

    const onImagechange = async (event, index) => {
        await handleUpload(event.target.files[0], index)
    };
    async function StoreS3(image, key) {
        const now = new Date().valueOf();
        setuploadProgress(0);
        return Storage.put(key + now, image, {
            level: 'public',
            contentType: image.type,
            progressCallback(progress) {
                setuploadProgress(Math.floor(progress.loaded*100/progress.total));
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            }
        })
    }
    async function userAttribute(){
        const user = await Auth.currentAuthenticatedUser();
        const {attributes, username} = user;
        console.log("USER", user)
        return {email: attributes["email"], username}
    }
    const handleUpload = async (selectedImageF, index) => {
        const {email, username} = await userAttribute();
        const res = await StoreS3(selectedImageF,email+"___");
        if (selectedImage){
            let rr = selectedImage.split(",")
            console.log("DFF", rr)
            rr[index] = res.key
            console.log("DFF", selectedImage, rr)
            setSelectedImage(rr.join(","))
        } else {
            console.log("FDD", selectedImage)
            setSelectedImage(res.key)
        }
    }
    async function getImage(keyIm) {
        console.log("GAME-1", keyIm)
        const res = await Storage.get(keyIm, {
            level: "public", // defaults to `public`
        });
        console.log("GAME", res)
        return res
    }

    return(
        <div className={styles.add_samples_main}>
            <div className={styles.add_sample_top}>
                <div className={styles.add_samples_title}>
                    Add Sample Details
                    <hr/>
                </div>
                <p onClick={onClose} className={styles.close}>⤫</p>
            </div>
            <span className={styles.add_samples_label}>Medication name</span>
            <AsyncCreatableSelect
                className={styles.add_samples_input_name}
                classNamePrefix="select"
                defaultValue={{label:medicationName, value: medicationName}}
                // allowCreateWhileLoading
                isSearchable={true}
                isClearable={true}
                cacheOptions
                defaultOptions
                loadOptions={getOption}
                onChange={(e)=> setMedicationName(e?e.value:"")}
            />

            {/*<input className={styles.add_samples_input} value={medicationName} onChange={(e)=> setMedicationName(e.target.value)}/>*/}
            <span className={styles.add_samples_label}>Upload image of the sample for automatic detection of details</span>
            {
                    <div className={styles.images}>
                        {
                            (selectedImageGet.length>0) && selectedImageGet.map((image, i) => {
                                return (
                                    <div className={styles.image}>
                                        { image ? <Image placeholder={"blur"} src={(image)} width={150} height={150}/> : <Image placeholder={"blur"} src={("/empty.jpeg")} width={150} height={150}/> }
                                        <input className={styles.add_samples_file_input} type="file" onChange={e => onImagechange(e, i)} />
                                    </div>
                                )
                            })
                        }
                        {
                            selectedImageGet.length < 3 &&
                                <div onClick={() => {setSelectedImageGet([...selectedImageGet, ""])}}
                                     style={{alignItems:'center', display:"flex", flexDirection:"column", flex: 1}}>
                                    <div className={styles.plus}>
                                        +
                                    </div>
                                    <p style={{color:"#0DB1A1"}}>Add image</p>
                                </div>
                        }
                    </div>
            }
            {
                uploadProgress &&
                <div className={styles.add_samples_row}>
                    <span className={styles.add_samples_label}>{uploadProgress}% Uploaded</span>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                </div>
            }
            {
                // update &&
                <div className={styles.add_samples_sub_row}>
                    <div className={styles.add_samples_sub_row_left}>
                        <span className={styles.add_samples_label}>Lot#</span>
                        <input placeholder={"(Optional) Lot number of the sample"} className={styles.add_samples_input} value={lot} onChange={(e)=> setLot(e.target.value)}/>
                    </div>
                    <div className={styles.add_samples_sub_row_right}>
                        <span className={styles.add_samples_label}>Expiry date (MM/DD/YY)</span>
                        <input placeholder={"(Optional) Expiry date of the sample"} className={styles.add_samples_input} value={(expiryDate)} onChange={(e)=> setExpiryDate(e.target.value)}/>
                    </div>
                </div>
            }
            <div className={styles.add_samples_sub_row}>
                <div className={styles.add_samples_sub_row_left}>
                    <span className={styles.add_samples_label}>Unit of measure</span>
                    <Select style={{width: "100%"}} value={unitOfM} options={unitM} isSearchable onChange={e => setUnitOfM(e)}/>
                </div>
                <div className={styles.add_samples_sub_row_right}>
                    <span className={styles.add_samples_label}>Quantity per unit</span>
                    <input placeholder={"Ex. 10"} className={styles.add_samples_input} value={quantityPerU} onChange={(e)=> setQuantityPerU(e.target.value)}/>
                </div>
            </div>
            <div className={styles.add_samples_sub_row}>
                <div className={styles.add_samples_sub_row_left}>
                    <span className={styles.add_samples_label}>Received units</span>
                    <input placeholder={"Ex. 100"} className={styles.add_samples_input} value={receivedQuantity} onChange={(e)=> setreceivedQuantity(e.target.value)}/>
                </div>
                <div className={styles.add_samples_sub_row_right}>
                    <span className={styles.add_samples_label}>Rep name</span>
                    <input placeholder={"Name of representative"} className={styles.add_samples_input} value={repName} onChange={(e)=> setrepName(e.target.value)}/>
                </div>
            </div>
            {
                error && <p className={styles.error}>{error}</p>
            }
            <button disabled={loading} onClick={update?updateDetails:addDetails} className={styles.add_samples_button}>{update?"Update in cabinet":"Add to Cabinet"}</button>
        </div>
    )
}

export default AddSamples;
