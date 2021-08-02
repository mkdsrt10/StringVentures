import useSWR from "swr";
import {fetchAuth} from "./fetchAuth";
import {BASE_BACKEND, PAGE_SIZE} from "./constants";

export async function getDisposal({token, page=0, PAGE_SIZE=PAGE_SIZE}){
    const {data, error} = useSWR(`/getDisposal?page=${page}&pageSize=${PAGE_SIZE}`, fetchAuth(token))

    if (error) return []
    if (!data) return []

    return data
}

export async function createDisposal({token, sample}){
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    const res = await fetch(BASE_BACKEND+"/createDisposal", req)
    return res.json()
}

export async function updateDisposal({token, sample}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    const res = await fetch(BASE_BACKEND+"/updateDisposal", req)
    return res.json()
}

export async function deleteDisposal({token, id}){
    const req = {
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    const res = await fetch(BASE_BACKEND+"/deleteDisposal?disposalId="+id, req)
    return res.json()
}
