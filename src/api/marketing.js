import {get} from "./index.js";


const baseUrl = 'marketing'

export const getstartdata = async () => {
    return await get(`${baseUrl}`)
}

export const getcurrentdata = async (merchantname) => {
    return await get(`${baseUrl}/` + merchantname)
}