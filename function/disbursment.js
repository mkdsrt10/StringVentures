import {fetchAuth} from "./fetchAuth";
import {BASE_BACKEND, PAGE_SIZE} from "./constants";

export async function getDisburement({token, page=0, search=""}){
    const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+`/getDisburement?page=${page}&pageSize=${PAGE_SIZE}&filterParameter=dateCreatedDesc&keyword=${search}`, req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
}

export async function getPatientFromId({token, id}){
    const data = await fetchAuth(token, `/getDisburementById?disburementId=${id}`)
    return data
}

export async function createDisburement({token, sample}){
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    const res = await fetch(BASE_BACKEND+"/createDisburement", req)
    return res.json()
}

export async function updateDisburement({token, sample}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    const res = await fetch(BASE_BACKEND+"/updateDisburement", req)
    return res.json()
}


export function quantiyOnHand(quantity){
    const splitQ = quantity.split("|");
    return splitQ[3]
}
