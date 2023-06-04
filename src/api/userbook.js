import {get} from "./index.js";


const baseUrl='userbook'

export const getstartdata = async () => {
    return await get(`${baseUrl}`)
}

export const getaprioridata = async () => {
    return await get(`apriori`)
}

export const getcurrentaprioridata = async (min_support) => {
    return await get(`apriori/`+min_support)
}