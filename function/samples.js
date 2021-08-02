import {fetchAuth} from "./fetchAuth";
import {BASE_BACKEND, PAGE_SIZE} from "./constants";

export async function getSamples({token, page=0}){
    const data = await fetchAuth(token, `/getSampleOfDoctor?page=${page}&pageSize=${PAGE_SIZE}`)
    return data
}

export async function getSamplesFromId({token, id}){
    const data = await fetchAuth(token, `/getSampleById?sampleId=${id}`)
    return data
}

export async function getUsableSamples({token, page=0, search=""}){
    const data = await fetchAuth(token, `/getUsableSample?page=${page}&pageSize=${PAGE_SIZE}&keyword=${search}`)
    return data
}

export async function getExpiredSamples({token, page=0, search=""}){
    const data = await fetchAuth(token, `/getExpiredSample?page=${page}&pageSize=${PAGE_SIZE}&keyword=${search}`)
    return data
}

export async function getExpiringSamples({token, page=0, pageSize=5}){
    const data = await fetchAuth(token, `/getUsableSample?page=${page}&pageSize=${pageSize}&filterParameter=expiringSoon`)
    return data
}

export async function createNewSample({token, sample}){
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    try {
        const res = await fetch(BASE_BACKEND+"/createSample", req)
        return {data: res.json(), error: res.status === 400}
    } catch (e){
        return {data: null, error: e}
    }
}

export async function updateSample({token, sample}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    const res = await fetch(BASE_BACKEND+"/updateSample", req)
    return res.json()
}
export async function updateSampleAdmin({token, sample}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(sample)
    };
    const res = await fetch(BASE_BACKEND+"/updateSampleStatusAdmin", req)
    return res.json()
}

export async function getPendingSamplesAdmin({token, page=0}){
    const data = await fetchAuth(token, `/getPendingSampleAdmin?page=${page}&pageSize=${PAGE_SIZE}`)
    return data
}
export async function getPendingSamples({token, page=0}){
    const data = await fetchAuth(token, `/getPendingSampleDoctor?page=${page}&pageSize=${PAGE_SIZE}`)
    return data
}
export async function getRecentSamples({token, page=0}){
    const data = await fetchAuth(token, `/getApprovedSampleAdmin?page=${page}&pageSize=${PAGE_SIZE}`)
    return data !== null && data.reverse()
}
