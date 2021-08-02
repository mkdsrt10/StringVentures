import {BASE_BACKEND} from "./constants";

export async function getDoctor({token}){
    // const {data, error} = useSWR(`/getDoctor?&Token=${token}`, fetchAuth)

    // if (error) return null
    // if (!data) return null
    const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/getDoctor", req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
}

export async function getReports({token}){
    const req = {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };
    try {
        const res = await fetch(BASE_BACKEND+"/getCount", req)
        return res.json()
    } catch (e) {
        console.log("Error:", e)
        return null
    }
}

export async function createDoctorProfile({token, doctor}){
    const req = {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(doctor)
    };
    const res = await fetch(BASE_BACKEND+"/createDoctor", req)
    return res.json()
}

export async function updateDoctorProfile({token, doctor}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(doctor)
    };
    const res = await fetch(BASE_BACKEND+"/updateDoctor", req)
    return res.json()
}

export async function deleteDoctorProfile({token, doctor}){
    const req = {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(doctor)
    };
    const res = await fetch(BASE_BACKEND+"/deleteDoctor", req)
    return res.json()
}
